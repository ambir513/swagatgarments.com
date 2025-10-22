"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { HelpCircle, MailCheck } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface MailDailogProps {
  title: string;
  description: string;
  open: boolean;
  message: string;
}
const MailDailog = ({ title, description, open, message }: MailDailogProps) => {
  return (
    <Card className={cn("", open ? "flex" : "hidden")}>
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <MailCheck size={60} className="text-primary" />
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm">Important note </span>
          <HoverCard>
            <HoverCardTrigger>
              <HelpCircle className="h-4 w-4 text-muted-foreground" />
            </HoverCardTrigger>
            <HoverCardContent>
              <p className="text-sm">{message}</p>
            </HoverCardContent>
          </HoverCard>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MailDailog;
