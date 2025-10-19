import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const protectedRoutes = ["/dashboard", "/admin/dashboard"];

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const isLoggedIn = Boolean(sessionCookie);
  const url = request.nextUrl.pathname;

  if (isLoggedIn && (url === "/auth/login" || url === "/auth/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isLoggedIn) {
    if (url === "/auth/error") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (!isLoggedIn) {
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
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
  matcher: ["/dashboard", "/auth/:path*"],
};
