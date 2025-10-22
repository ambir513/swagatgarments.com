"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginSchema } from "..";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from "@/components/ui/field";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Login, SignUp } from "../actions";
import toast from "react-hot-toast";
import { createAuthClient } from "better-auth/client";
import { Eye, EyeOff, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
const authClient = createAuthClient();

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [showPassword, setShowPassword] = useState(false);
  const Route = useRouter();

  const [isLoading, setIsLoading] = useState<{
    event: string;
    status: boolean;
  }>({ event: "", status: false });

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSignInWithGoogle() {
    setIsLoading({ event: "Google", status: true });

    try {
      const response = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      setIsLoading({ event: "", status: false });
      console.log(response);

      return { status: true, message: "Logged In successfully" };
    } catch (error) {
      setIsLoading({ event: "", status: false });
      console.log(error);

      return {
        status: false,
        message:
          error instanceof Error ? error.message : "Something went wrong",
      };
    }
  }

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    setIsLoading({ event: "Login", status: true });

    console.log(values);
    const response = await Login(values);

    setIsLoading({ event: "", status: false });

    if (response.status) {
      toast.success(response.message);
      Route.push("/");
    } else {  
      toast.error(response.message);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between">
                  <FormLabel>Password</FormLabel>
                  <Link href={"/auth/forgot-password"}>
                    <p className="text-sm text-muted-foreground hover:text-primary active:text-primary">
                      Forgot password
                    </p>
                  </Link>
                </div>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="bg-background"
                      id="password-toggle"
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                    <Button
                      className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      size="icon"
                      type="button"
                      variant="ghost"
                    >
                      {showPassword ? (
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
            disabled={isLoading?.status}
          >
            {isLoading?.event == "Login" && <Spinner />}
            <span>Login</span>
          </Button>
        </form>
      </Form>
      <FieldGroup>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <Button
            variant="outline"
            type="button"
            disabled={isLoading?.status}
            onClick={handleSignInWithGoogle}
          >
            {isLoading?.event == "Google" ? <Spinner /> : <GoogleSvg />}
            Sign up with Google
          </Button>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="underline underline-offset-4"
            >
              Register
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </div>
  );
}

function GoogleSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800px"
      height="800px"
      viewBox="-3 0 262 262"
      preserveAspectRatio="xMidYMid"
    >
      <path
        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
        fill="#4285F4"
      />
      <path
        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
        fill="#34A853"
      />
      <path
        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
        fill="#FBBC05"
      />
      <path
        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
        fill="#EB4335"
      />
    </svg>
  );
}
