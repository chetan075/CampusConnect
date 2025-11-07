import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware runs on the Edge. We only check presence of the httpOnly
// cookie set by the backend (`token`). This is a lightweight guard to
// redirect logged-in users away from auth pages and to protect certain
// client routes when the cookie is absent.

const PUBLIC_AUTH_PAGES = ["/login", "/register"];
const PROTECTED_PATH_PREFIXES = ["/dashboard", "/profile", "/messages", "/posts", "/events"];

export function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req;
  const { pathname } = nextUrl;

  // Skip next internals and static files
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.startsWith("/static") || pathname === "/favicon.ico") {
    return NextResponse.next();
  }

  const token = cookies.get("token")?.value;

  // If user is authenticated and trying to access login/register, redirect to dashboard
  if (token && PUBLIC_AUTH_PAGES.includes(pathname)) {
    const url = nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // If user is NOT authenticated and tries to access a protected route, redirect to login
  if (!token) {
    for (const p of PROTECTED_PATH_PREFIXES) {
      if (pathname === p || pathname.startsWith(p + "/")) {
        const url = nextUrl.clone();
        // optionally attach original path so the app can redirect back after login
        url.pathname = "/login";
        url.searchParams.set("from", pathname);
        return NextResponse.redirect(url);
      }
    }
  }

  return NextResponse.next();
}

// Limit middleware execution to frontend pages (skip api/_next/static etc.)
export const config = {
  matcher: ["/:path*"],
};
