import z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .toLowerCase()
    .max(50, { message: "email must be in 50 character only" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password must be less than 100 characters" })
    .regex(/[a-z]/, { message: "Password must include a lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must include an uppercase letter" })
    .regex(/[0-9]/, { message: "Password must include a number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must include a special character",
    })
    .max(16, { message: "email must be in 16 character only" }),
});

export const SignupSchema = z.object({
  name: z
    .string()
    .min(1, { message: "full name is required" })
    .max(25, { message: "lastname must be in 25 character only" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .toLowerCase()
    .max(50, { message: "email must be in 50 character only" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password must be less than 100 characters" })
    .regex(/[a-z]/, { message: "Password must include a lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must include an uppercase letter" })
    .regex(/[0-9]/, { message: "Password must include a number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must include a special character",
    })
    .max(16, { message: "email must be in 16 character only" }),
});

export const forgotPassSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .toLowerCase()
    .max(50, { message: "email must be in 50 character only" }),
});

export const resetPassSchema = z.object({
  token: z.string().optional(),
  newPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password must be less than 100 characters" })
    .regex(/[a-z]/, { message: "Password must include a lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must include an uppercase letter" })
    .regex(/[0-9]/, { message: "Password must include a number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must include a special character",
    })
    .max(16, { message: "email must be in 16 character only" }),

  confirmPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password must be less than 100 characters" })
    .regex(/[a-z]/, { message: "Password must include a lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must include an uppercase letter" })
    .regex(/[0-9]/, { message: "Password must include a number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must include a special character",
    })
    .max(16, { message: "email must be in 16 character only" })
    .optional(),
});
