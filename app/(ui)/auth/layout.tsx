import { LoginForm } from "@/features/auth/components/login-form";
import { GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Toaster } from "react-hot-toast";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex rounded-full  items-center justify-center overflow-hidden">
              <Image
                src={"/logo.jpg"}
                width={55}
                height={55}
                alt="Swagat Garments"
              />
            </div>
            Swagat Garments.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/authWallpaper.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover "
        />
      </div>
    </div>
  );
}
