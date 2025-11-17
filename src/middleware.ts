import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("fitraatJwt")?.value;
  const { pathname } = request.nextUrl;


  if (!currentUser) {
    if (
      pathname.startsWith("/profile") ||
      pathname.startsWith("/authBlog") ||
      pathname.startsWith("/proMember") ||
      pathname.startsWith("/payment")
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next(); // Allow access to other routes
  }

  // Handle authenticated user access
  if (currentUser) {
    if (pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/programs", request.url));
    }
    if (pathname.startsWith("/register")) {
      return NextResponse.redirect(new URL("/programs", request.url));
    }

    return NextResponse.next(); // Allow access to other routes
  }

  // Default response
  return NextResponse.next();
}
``;