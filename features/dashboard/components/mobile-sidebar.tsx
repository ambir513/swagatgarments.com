"use client";
import { Button } from "@/components/ui/button";
import {
  ChartNoAxesCombined,
  HelpCircle,
  icons,
  LayoutList,
  LogOut,
  Menu,
  PackagePlus,
  PackageSearch,
  ScrollText,
  Settings,
  ShieldUser,
  ShoppingBag,
  ShoppingCart,
  Undo2,
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

export function MobileSidebar() {
  const user = useUser((state) => state.user);
  const Route = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <SideSheet side="left" onOpenChange={setOpen} open={open}>
      <SideSheetTrigger asChild>
        <Button variant="ghost" size="icon" className="shrink-0">
          <Menu className="w-5 h-5" />
        </Button>
      </SideSheetTrigger>

      <SideSheetContent className="flex flex-col h-full max-w-[85vw] sm:max-w-[60vw] md:max-w-[400px] overflow-hidden">
        <SideSheetHeader className="">
          <Link href={"/"}>
            <Button
              variant={"outline"}
              className="text-muted-foreground text-md flex justify-start w-full items-center gap-x-2"
              onClick={() => setOpen(false)}
            >
              <Undo2 />
              <span>Home</span>
            </Button>
          </Link>
        </SideSheetHeader>

        <div className="flex flex-col gap-y-2">
          {list.map((item, index) => (
            <Link href={item.url} key={index}>
              <Button
                variant={"ghost"}
                className="text-md text-muted-foreground flex justify-start w-full items-center gap-x-2"
                onClick={() => setOpen(false)}
              >
                {item.title === "My Cart" ? (
                  <p className="flex justify-between items-center w-full">
                    <span className="flex justify-center items-center gap-x-2">
                      <item.icon />
                      <span>{item.title}</span>
                    </span>

                    <Badge className="text-white ">1</Badge>
                  </p>
                ) : (
                  <>
                    <item.icon />
                    <span>{item.title}</span>
                  </>
                )}
              </Button>
            </Link>
          ))}
        </div>
      </SideSheetContent>
    </SideSheet>
  );
}
