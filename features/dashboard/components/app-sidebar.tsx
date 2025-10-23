"use client";
import {
  ChartNoAxesCombined,
  ChevronUp,
  HelpCircle,
  LayoutList,
  LogOut,
  PackagePlus,
  PackageSearch,
  ScrollText,
  Settings,
  ShieldUser,
  ShoppingBag,
  ShoppingCart,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/store/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { IoMdHeartEmpty } from "react-icons/io";
import { Badge } from "@/components/ui/badge";
import { BsCart } from "react-icons/bs";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";

const items = [
  {
    title: "Analytics",
    url: "/dashboard",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Product List",
    url: "/dashboard/product-list",
    icon: LayoutList,
  },
  {
    title: "Product Detail",
    url: "/dashboard/product-detail",
    icon: PackageSearch,
  },
  {
    title: "Add Product",
    url: "/dashboard/add-product",
    icon: PackagePlus,
  },
  {
    title: "Order List",
    url: "/dashboard/order-list",
    icon: ShoppingBag,
  },
  {
    title: "Order Detail",
    url: "/dashboard/order-detail",
    icon: ShoppingCart,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const Route = useRouter();
  const user = useUser((state) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log(user);

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
    <Sidebar>
      <SidebarContent className="px-2 pt-2">
        <SidebarGroup>
          <SidebarGroupLabel>Dashboards</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Avatar className="size-7">
                    <AvatarImage
                      alt="User Profile"
                      src={
                        user?.image ||
                        "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                      }
                    />
                    <AvatarFallback>SG</AvatarFallback>
                  </Avatar>
                  <span>{user?.name}</span>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="font-medium text-sm leading-none">
                      {user?.name}
                    </p>
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
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
