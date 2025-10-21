"use client";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
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

export function Sidebar() {
  return (
    <SideSheet side="left" >
      {/* Trigger Button */}
      <SideSheetTrigger asChild>
        <Button variant="ghost" size="icon" className="shrink-0">
          <Menu className="w-5 h-5" />
        </Button>
      </SideSheetTrigger>

      {/* SideSheet Content */}
      <SideSheetContent className="flex flex-col h-full max-w-[85vw] sm:max-w-[60vw] md:max-w-[400px] overflow-hidden">
        {/* Header */}
        <SideSheetHeader className="flex-shrink-0 px-6 pt-6">
          <SideSheetTitle>Drink Water</SideSheetTitle>
          <SideSheetDescription>
            Track and maintain your daily water intake.
          </SideSheetDescription>
        </SideSheetHeader>

        {/* Footer */}
        <SideSheetFooter className="flex-shrink-0 px-6 pb-6 mt-auto">
          <SideSheetClose asChild>
            <Button size="sm">Close</Button>
          </SideSheetClose>
        </SideSheetFooter>
      </SideSheetContent>
    </SideSheet>
  );
}
