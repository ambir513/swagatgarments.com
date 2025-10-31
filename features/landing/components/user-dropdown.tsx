"use client";
import {
  HelpCircle,
  LogOut,
  ScrollText,
  Settings,
  ShieldUser,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BsCart } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/store/user";
import { signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { IoMdHeartEmpty } from "react-icons/io";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const UserDropdown = () => {
  const Route = useRouter();
  const user = useUser((state) => state.user);
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative h-10 w-10 rounded-full" variant="ghost">
          <Avatar>
            <AvatarImage
              alt="User Profile"
              src={
                user?.image ||
                "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
              }
            />
            <AvatarFallback>SG</AvatarFallback>
          </Avatar>
          <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full bg-primary ring-2 ring-background" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="font-medium text-sm leading-none">{user?.name}</p>
            <p className="text-muted-foreground text-xs leading-none">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User />
          Profile
        </DropdownMenuItem>

        {user?.role === "ADMIN" && (
          <Link href={"/dashboard"}>
            <DropdownMenuItem>
              <ShieldUser />
              Admin Panel
            </DropdownMenuItem>
          </Link>
        )}
        <DropdownMenuItem>
          <ScrollText />
          Order
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex justify-between w-full">
            <p className="flex justify-center items-center gap-x-2">
              <BsCart />
              <span> My Cart </span>
            </p>
            <Badge className="text-white ">1</Badge>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IoMdHeartEmpty />
          My Wishlist
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem>
          <HelpCircle />
          Help
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant={isLoading ? "default" : "destructive"}
          onClick={handleLogout}
          onSelect={(e) => e.preventDefault()}
        >
          <div className="relative">
            <p
              className={cn(
                "flex justify-center items-center gap-x-2",
                isLoading && "opacity-5"
              )}
            >
              <LogOut />
              Log out
            </p>
            {isLoading && (
              <p className="absolute top-0 left-6">
                <Spinner />
              </p>
            )}
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserDropdown;
