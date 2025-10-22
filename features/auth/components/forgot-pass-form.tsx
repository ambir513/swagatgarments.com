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
import { Mail } from "lucide-react";
import toast from "react-hot-toast";
import { forgotPassSchema } from "..";
import { forgetPassword } from "@/lib/auth-client";
import MailDailog from "./mail-dailog";

export function ForgotPassForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof forgotPassSchema>>({
    resolver: zodResolver(forgotPassSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof forgotPassSchema>) {
    if (!values.email) return null;

    console.log(values);

    forgetPassword({
      email: values.email,
      redirectTo: "/auth/reset-password",
      fetchOptions: {
        onRequest: () => {
          setIsLoading(true);
        },
        onResponse: () => {
          setIsLoading(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("Verification email send successfully");
          setOpen(true);
          setIsLoading(false);
        },
      },
    });
  }

  return (
    <>
      <div className={cn(" flex-col gap-6", open ? "hidden" : "flex")}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Forgot Password</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email to get a reset link
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        className="bg-background pl-9"
                        id="email-input"
                        placeholder="you@gmail.com"
                        type="email"
                        {...field}
                      />
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
              <span>Send Email</span>
            </Button>
          </form>
        </Form>
      </div>
      <MailDailog
        title={"Check Your Email"}
        description={`We${"’"}ve sent a link to your inbox to reset your password.`}
        open={open}
        message="This link will expire in 1 hour. Our platform will never share your personal details with anyone, ensuring your privacy. "
      />
    </>
  );
}
