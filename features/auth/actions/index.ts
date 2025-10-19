"use server";
import z from "zod";
import { SignupSchema, LoginSchema } from "../index";
import { auth } from "@/lib/auth";
import { signOut } from "@/lib/auth-client";

export async function SignUp(data: z.infer<typeof SignupSchema>) {
  try {
    await auth.api.signUpEmail({
      body: {
        ...data,
        image: "https://example.com/image.png",
        callbackURL: "/",
      },
    });
    return { status: true, message: "Verification email sent successfully." };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}

export async function Login(data: z.infer<typeof LoginSchema>) {
  try {
    await auth.api.signInEmail({
      body: {
        ...data,
        rememberMe: true,
        callbackURL: "/",
      },
    });
    return { status: true, message: "Logged In successfully" };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}
