import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export function EditSheet({
  open,
  setOpen,
  data,
  children
}: {
  open: boolean;
  setOpen: () => void;
  children: React.Re
  data: any;
}) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {children}
      <SheetContent
        className="h-fit rounded-lg w-40 relative left-0"
        side="right"
      >
        <SheetHeader>
          <SheetTitle>Edit Product</SheetTitle>
          <SheetDescription>
            Change your product details here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-name">Name of product</Label>
            <Input id="sheet-name" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-Description">Description</Label>
            <Textarea id="sheet-Description" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
