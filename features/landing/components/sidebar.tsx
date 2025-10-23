"use client";
import { Button } from "@/components/ui/button";
import {
  HelpCircle,
  icons,
  LogOut,
  Menu,
  ScrollText,
  Settings,
  ShieldUser,
  User,
} from "lucide-react";
import {
  SideSheet,
  SideSheetTrigger,
  SideSheetContent,
  SideSheetHeader,
  SideSheetTitle,
  SideSheetDescription,
  SideSheetFooter,
  SideSheetClose,
} from "@/components/ui/side-sheet";
import { BsCart } from "react-icons/bs";
import { MdWindow } from "react-icons/md";
import { useUser } from "@/store/user";
import Link from "next/link";
import { IoMdHeartEmpty } from "react-icons/io";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

const list = [
  {
    title: "All Categories",
    icons: MdWindow,
    href: "/",
  },
  {
    title: "Orders",
    icons: ScrollText,
    href: "/",
  },
  {
    title: "My Cart",
    icons: BsCart,
    href: "/",
  },
  {
    title: "My Wishlist",
    icons: IoMdHeartEmpty,
    href: "/",
  },
  {
    title: "Settings",
    icons: Settings,
    href: "/",
  },
  {
    title: "Help",
    icons: HelpCircle,
    href: "/",
  },
];

export function Sidebar() {
  const user = useUser((state) => state.user);
  const Route = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    setIsLoading(true);

    await signOut({
      fetchOptions: {
        onError: (error) => {
          setIsLoading(false);
          console.log("Error logging out:", error);
          toast.error(error.error.message || "Error logging out");
        },
        onSuccess: () => {
          setIsLoading(false);
          toast.success("Logged out successfully");
          Route.push("/auth/login");
        },
      },
    });
  };

  return (
    <SideSheet side="left" onOpenChange={setOpen} open={open}>
      <SideSheetTrigger asChild>
        <Button variant="ghost" size="icon" className="shrink-0">
          <Menu className="w-5 h-5" />
        </Button>
      </SideSheetTrigger>

      <SideSheetContent className="flex flex-col h-full max-w-[85vw] sm:max-w-[60vw] md:max-w-[400px] overflow-hidden">
        <SideSheetHeader className="">
          {user?.name ? (
            <Link href={"/"}>
              <Button
                variant={"outline"}
                className="text-muted-foreground w-full flex justify-start items-center gap-x-2"
                onClick={() => setOpen(false)}
              >
                <User size={20} />
                <span>{user?.name}</span>
              </Button>
            </Link>
          ) : (
            <Link href={"/auth/login"}>
              <Button
                variant={"outline"}
                className="text-muted-foreground text-md flex justify-start w-full items-center gap-x-2"
                onClick={() => setOpen(false)}
              >
                <User size={20} />
                <span>Login & Register</span>
              </Button>
            </Link>
          )}
        </SideSheetHeader>

        <div className="flex flex-col gap-y-2">
          {user?.role === "ADMIN" && (
            <Link href={"/dashboard"}>
              <Button
                variant={"ghost"}
                className="text-md ml-1 text-muted-foreground flex justify-start w-full items-center gap-x-2"
                onClick={() => setOpen(false)}
              >
                <ShieldUser />
                Admin Panel
              </Button>
            </Link>
          )}
          {list.map((item, index) => (
            <Link href={item.href} key={index}>
              <Button
                variant={"ghost"}
                className="text-md text-muted-foreground flex justify-start w-full items-center gap-x-2"
                onClick={() => setOpen(false)}
              >
                {item.title === "My Cart" ? (
                  <p className="flex justify-between items-center w-full">
                    <span className="flex justify-center items-center gap-x-2">
                      <item.icons />
                      <span>{item.title}</span>
                    </span>

                    <Badge className="text-white ">1</Badge>
                  </p>
                ) : (
                  <>
                    <item.icons />
                    <span>{item.title}</span>
                  </>
                )}
              </Button>
            </Link>
          ))}
        </div>
        {user?.name && (
          <SideSheetFooter>
            <Button
              variant={"destructive"}
              className="relative"
              onClick={handleLogout}
            >
              <p
                className={cn(
                  "flex justify-center items-center gap-x-2",
                  isLoading && "opacity-10"
                )}
              >
                <LogOut />
                Log out
              </p>
              {isLoading && (
                <p className="absolute inset-x">
                  <Spinner />
                </p>
              )}
            </Button>
          </SideSheetFooter>
        )}
      </SideSheetContent>
    </SideSheet>
  );
}
