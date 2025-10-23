"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import { ReactNode, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Kbd } from "@/components/ui/kbd";
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "../../landing/components/navbar";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/utils/theme-toggle";
import { SettingsProvider } from "@/components/contexts/settingsContext";
import { SearchDialog } from "@/components/utils/search-dialog";
import { useSearch } from "@/components/hooks/use-search";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sidebar } from "../../landing/components/sidebar";
import { Logo } from "@/components/utils/logo";
import UserDropdown from "@/features/landing/components/user-dropdown";
import { SidebarTrigger } from "@/components/ui/sidebar";
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

export function DashboardHeader({
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
    <div
      className={cn(
        "w-full mx-auto sticky top-0 z-50 bg-background",
        className
      )}
    >
      {" "}
      <div className="relative lg:px-32 px-4">
        <NavbarComponent className="flex items-center justify-between py-2">
          {/* Left Section */}
          <NavbarLeft className="flex items-center gap-3">Home</NavbarLeft>

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

              <SettingsProvider>
                <ThemeToggle />
              </SettingsProvider>

              <UserDropdown />
            </div>

            <div className="flex md:hidden items-center gap-2">
              <SettingsProvider>
                <ThemeToggle />
              </SettingsProvider>
              <SidebarTrigger />
            </div>
          </NavbarRight>
        </NavbarComponent>
      </div>
      <Separator />
      <SearchDialog open={open} setOpen={setOpen} />
    </div>
  );
}
