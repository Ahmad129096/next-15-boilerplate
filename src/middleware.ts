import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get session using NextAuth
  const session = await auth();

  // Protected routes that require authentication
  const protectedRoutes = ["/profile"];

  // Private routes (only accessible when NOT authenticated)
  const privateRoutes = ["/"];

  // If user is authenticated and tries to access private routes (like home), redirect to profile
  if (session && privateRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  // If user is authenticated and tries to access login page, redirect to profile
  if (session && pathname === "/login") {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  // If user is not authenticated and tries to access protected routes, redirect to login
  if (!session && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
