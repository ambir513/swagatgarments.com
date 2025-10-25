"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import { MonitorCog, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const NotFound = () => {
  return (
    <div className="w-full sm:mx-auto my-20 flex justify-center items-center">
      <Card className="sm:w-md w-[300px]">
        <CardContent className="flex flex-col justify-center items-center gap-y-5">
          <Image src={"/404.webp"} alt="Not Found" width={500} height={500} />
          <p className="text-2xl font-bold">404 Not Found</p>
        </CardContent>
        <CardFooter className="">
          <Link href={"/"} className="w-full">
            <Button variant={"outline"} className="w-full">
              <Undo2 />
              Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
};

export default NotFound;
