import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "@/db";
import { nextCookies } from "better-auth/next-js";
import bcrypt from "bcrypt";
import { sendEmail } from "@/utils/sendEmail";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { UserRole } from "@prisma/client";
import { admin } from "better-auth/plugins";
import { ac, roles } from "./permission";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    autoSignIn: false,
    password: {
      hash: async (password: string) => {
        const hashPassword = await bcrypt.hash(password, 10);
        return hashPassword;
      },
      verify: async (data: { password: string; hash: string }) => {
        const isValid = await bcrypt.compare(data.password, data.hash);
        return isValid;
      },
    },
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        displayName: "Swagat Garments",
        meta: {
          description: "Click the link below to reset your password",
          link: url,
        },
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    expiresIn: 60 * 60,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your email",
        displayName: "Swagat Garments",
        meta: {
          description: "Verify your email to complete your registration",
          link: String(url),
        },
      });
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        const email = String(ctx.body?.email).toLowerCase();
        const domain = email.split("@")[1];
        const allowedDomains = ["gmail.com", "swagatgarments.com"];

        if (!allowedDomains.includes(domain)) {
          throw new APIError("BAD_REQUEST", {
            message: "Invalid domain. Please use a valid email.",
          });
        }
        const name = ctx.body?.name
          .trim()
          .replace(/\s+/g, "")
          .replace(/[^a-zA-Z\s]/g, "")
          .replace(/\b\w/g, (char: string) => char.toUpperCase());
        return {
          context: {
            ...ctx,
            body: {
              ...ctx.body,
              name,
            },
          },
        };
      }
    }),
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const ADMIN_EMAILS =
            process.env.NEXT_PUBLIC_ADMIN_EMAIL?.split(";") ?? [];
          if (ADMIN_EMAILS.includes(user.email)) {
            return { data: { ...user, role: UserRole.ADMIN } };
          }
          return { data: user };
        },
      },
    },
  },
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 30,
  },
  accounts: {
    accountLinking: {
      enabled: true,
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: ["USER", "ADMIN"] as Array<UserRole>,
        input: false,
      },
    },
  },
  plugins: [
    nextCookies(),
    admin({
      defaultRole: UserRole.USER,
      adminRoles: [UserRole.ADMIN],
      ac,
      roles,
    }),
  ],
});
