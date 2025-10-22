"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { Eye, EyeOff, Mail } from "lucide-react";
import { resetPass } from "../actions";
import toast from "react-hot-toast";
import { resetPassSchema } from "..";
import { useRouter } from "next/navigation";

export function ResetPassForm({
  className,
  token,
}: {
  className?: string;
  token: string;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const Route = useRouter();
  const form = useForm<z.infer<typeof resetPassSchema>>({
    resolver: zodResolver(resetPassSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof resetPassSchema>) {
    const newPassword = values.newPassword;
    const confirmPassword = values.confirmPassword;

    if (!newPassword) return null;
    if (newPassword !== confirmPassword) {
      toast.error("Password do not match.");
      return null;
    }

    setIsLoading(true);

    const response = await resetPass({
      newPassword,
      token,
    });
    setIsLoading(false);

    if (response.status) {
      toast.success(response.message);
      Route.push("/auth/login");
    } else {
      toast.error(response.message);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Set New Password</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter a new password to access your account
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="bg-background"
                      placeholder="Enter your password"
                      type={showPassword1 ? "text" : "password"}
                      {...field}
                    />
                    <Button
                      className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword1(!showPassword1)}
                      size="icon"
                      type="button"
                      variant="ghost"
                    >
                      {showPassword1 ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="bg-background"
                      placeholder="Enter your password"
                      type={showPassword2 ? "text" : "password"}
                      {...field}
                    />
                    <Button
                      className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword2(!showPassword2)}
                      size="icon"
                      type="button"
                      variant="ghost"
                    >
                      {showPassword2 ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full text-white"
            disabled={isLoading}
          >
            {isLoading && <Spinner />}
            <span>Change Password</span>
          </Button>
        </form>
      </Form>
    </div>
  );
}
