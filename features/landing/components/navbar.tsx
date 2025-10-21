import * as React from "react";
import { cn } from "@/lib/utils";

interface NavbarProps extends React.ComponentProps<"nav"> {}
interface NavbarSlotProps extends React.HTMLAttributes<HTMLDivElement> {}

function Navbar({ className, ...props }: NavbarProps) {
  return (
    <nav
      data-slot="navbar"
      className={cn(
        "flex items-center justify-between py-2 px-4 w-full",
        className
      )}
      {...props}
    />
  );
}

function NavbarLeft({ className, ...props }: NavbarSlotProps) {
  return (
    <div
      data-slot="navbar-left"
      className={cn("flex items-center justify-start gap-4", className)}
      {...props}
    />
  );
}

function NavbarRight({ className, ...props }: NavbarSlotProps) {
  return (
    <div
      data-slot="navbar-right"
      className={cn("flex items-center justify-end gap-4", className)}
      {...props}
    />
  );
}

function NavbarCenter({ className, ...props }: NavbarSlotProps) {
  return (
    <div
      data-slot="navbar-center"
      className={cn("flex items-center justify-center gap-4", className)}
      {...props}
    />
  );
}

export { Navbar, NavbarCenter, NavbarLeft, NavbarRight };
