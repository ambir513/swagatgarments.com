"use client";

import {
  ArrowDown,
  ArrowUp,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";

export const StatsCard = () => {
  return (
    <div
      className="flex sm:justify-baseline justify-center  gap-6 mt-5
    "
    >
      <HoverCard>
        <HoverCardTrigger asChild>
          <button className="flex items-center gap-2 rounded-lg border bg-card p-4 text-left hover:bg-accent">
            <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
            <div>
              <div className="font-bold text-2xl">₹00.00</div>
              <div className="text-muted-foreground text-sm">
                Total Revenue&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </div>
            </div>
          </button>
        </HoverCardTrigger>
        <HoverCardContent className="sm:ml-0 sm:mt-0 ml-5 mt-1">
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">View Statistics</h4>
            <div className="space-y-1 text-muted-foreground text-sm">
              <div className="flex justify-between">
                <span>Today:</span>
                <span className="font-medium text-foreground">342</span>
              </div>
              <div className="flex justify-between">
                <span>This Week:</span>
                <span className="font-medium text-foreground">2,156</span>
              </div>
              <div className="flex justify-between">
                <span>This Month:</span>
                <span className="font-medium text-foreground">8,932</span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
      <HoverCard>
        <HoverCardTrigger asChild>
          <button className="flex items-center gap-2 rounded-lg border bg-card p-4 text-left hover:bg-accent">
            <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <div>
              <div className="font-bold text-2xl">₹00.00</div>
              <div className="text-muted-foreground text-sm">
                Monthly Revenue
              </div>
            </div>
          </button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 sm:mr-0 mr-5 sm:mt-0 mt-1">
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Revenue Breakdown</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between rounded-md bg-muted p-2">
                <div className="flex items-center gap-2">
                  <ArrowUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span className="text-muted-foreground">Income</span>
                </div>
                <span className="font-medium">₹ 00.00</span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-muted p-2">
                <div className="flex items-center gap-2">
                  <ArrowDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                  <span className="text-muted-foreground">Expenses</span>
                </div>
                <span className="font-medium">₹ 00.00</span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-muted-foreground">Net Profit</span>
                <span className="font-bold text-green-600 text-lg dark:text-green-400">
                  $45.2k
                </span>
              </div>
            </div>
            <p className="text-muted-foreground text-xs">
              +18.2% vs. last month
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};
