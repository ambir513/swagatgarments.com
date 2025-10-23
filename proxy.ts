import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { auth } from "./lib/auth";

const protectedRoutes = [
  "/dashboard",
  "/dashboard/add-product",
  "/dashboard/product-detail",
  "/dashboard/product-list",
  "/dashboard/order-list",
];

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const session = await auth.api.getSession({ headers: request.headers });
  const isLoggedIn = Boolean(sessionCookie);
  const url = request.nextUrl.pathname;
  const protectedRoute = protectedRoutes.includes(url);

  if (isLoggedIn && (url === "/auth/login" || url === "/auth/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isLoggedIn) {
    if (protectedRoute) {
      if (session?.user?.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
    if (url === "/auth/error") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (!isLoggedIn) {
    if (protectedRoute) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  if (!isLoggedIn) {
    if (
      request.nextUrl.pathname.startsWith("/auth/login") ||
      request.nextUrl.pathname.startsWith("/auth/register")
    ) {
      return NextResponse.next();
    }
  }

  if (request.nextUrl.pathname.startsWith("api/auth/error")) {
    return NextResponse.redirect(
      new URL(
        `/auth/error?${request.nextUrl.searchParams.get("error")}`,
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
