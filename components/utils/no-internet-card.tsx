"use client";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { MonitorCog } from "lucide-react";

const NoInternetCard = () => {
  return (
    <div className="w-full sm:mx-auto my-20 flex justify-center items-center">
      <Card className="sm:w-md w-[300px]">
        <CardHeader className="flex justify-center items-center">
          <MonitorCog size={50} className="text-primary" />
        </CardHeader>
        <CardContent className="flex flex-col justify-center items-center gap-y-2">
          <p className="text-lg font-bold">
            OOP! <span>No Internet</span>
          </p>

          <p className="tracking-tight text-md text-center text-muted-foreground">
            Please check your network connection
          </p>
        </CardContent>
        <CardFooter className="w-full ">
          <Link href={"/"} className="w-full">
            <Button variant={"outline"} className="w-full">
              Try again
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NoInternetCard;
