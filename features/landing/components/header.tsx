"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Kbd } from "@/components/ui/kbd";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Navbar as NavbarComponent, NavbarLeft, NavbarRight } from "./navbar";
import Navigation from "./navigation";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/utils/theme-toggle";
import { SettingsProvider } from "@/components/contexts/settingsContext";
import { SearchDialog } from "@/components/utils/search-dialog";
import { useSearch } from "@/components/hooks/use-search";
import UserDropdown from "./user-dropdown";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sidebar } from "./sidebar";
import { Logo } from "@/components/utils/logo";
import { useUser } from "@/store/user";

interface NavbarLink {
  text: string;
  href: string;
}

interface NavbarActionProps {
  text: string;
  href: string;
  icon?: ReactNode;
  iconRight?: ReactNode;
  isButton?: boolean;
}

interface NavbarProps {
  logo?: ReactNode;
  name?: string;
  homeUrl?: string;
  mobileLinks?: NavbarLink[];
  actions?: NavbarActionProps[];
  showNavigation?: boolean;
  customNavigation?: ReactNode;
  className?: string;
}

export function Header({
  logo = <h1>Hii</h1>,
  name = "Launch UI",
  homeUrl = "/",
  showNavigation = true,
  customNavigation,
  className,
}: NavbarProps) {
  const addUser = useUser((state) => state.addUser);
  const { data } = useSession();
  const { open, setOpen } = useSearch();
  const { theme } = useTheme();

  useEffect(() => {
    if (data?.user) {
      const user = data.user;
      addUser({
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
      });
    }
  }, [data?.user]);

  return (
    <header
      className={cn(
        "2xl:container min-w-container mx-auto sticky top-0 z-50 bg-background",
        className
      )}
    >
      <div className="relative lg:px-32 px-4">
        <NavbarComponent className="flex items-center justify-between py-2">
          {/* Left Section */}
          <NavbarLeft className="flex items-center gap-3">
            <Link href={homeUrl} className="flex items-center gap-2">
              <button className="cursor-pointer overflow-hidden rounded-xl border ">
                <Logo theme={theme} />
              </button>
            </Link>

            {/* Desktop Navigation */}
            {showNavigation && (
              <nav className="hidden lg:flex">
                {customNavigation || <Navigation />}
              </nav>
            )}
          </NavbarLeft>

          {/* Right Section */}
          <NavbarRight className="flex items-center gap-3">
            {/* Desktop Search */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => setOpen(true)}
                className="transition active:scale-95"
              >
                <InputGroup className="max-w-xs">
                  <InputGroupInput placeholder="Search..." disabled />
                  <InputGroupAddon>
                    <SearchIcon />
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    <Kbd>Ctrl</Kbd>
                    <Kbd>K</Kbd>
                  </InputGroupAddon>
                </InputGroup>
              </button>

              {/* Theme + User */}
              <SettingsProvider>
                <ThemeToggle />
              </SettingsProvider>

              {data?.user ? (
                <UserDropdown />
              ) : (
                <Link href="/auth/login">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      alt="Guest User"
                      src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                    />
                    <AvatarFallback>GU</AvatarFallback>
                  </Avatar>
                </Link>
              )}
            </div>

            {/* Mobile Sidebar + Compact Actions */}
            <div className="flex md:hidden items-center gap-2">
              <SettingsProvider>
                <ThemeToggle />
              </SettingsProvider>
              <Sidebar />
            </div>
          </NavbarRight>
        </NavbarComponent>
      </div>
      <Separator />
      <SearchDialog open={open} setOpen={setOpen} />
    </header>
  );
}
