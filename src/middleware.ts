import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define paths that are considered public (accessible without a token)
  const isPublicPath =
    path === "/login" || path === "/signup" || path.startsWith("/verifyemail");
  const isPrivatePath = path === "/" || path === "/profile";

  //Get tokens of from the cookies
  const token = request.cookies.get("token")?.value || "";

  if (path === "/api/users/logout") {
    return NextResponse.next();
  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (isPublicPath && token && path !== "/verifyemail") {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (isPrivatePath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}

// It specifies the paths for which this middleware should be executed.
export const config = {
  matcher: ["/", "/profile", "/login", "/signup", "/verifyemail/:path*"],
};
