import { NextResponse } from "next/server";

export function middleware(request) {
  const authToken = request.cookies.get("Token")?.value;

  // Logedin user not access urls
  const logedInUserNotAccessUrl =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/signup";

  // Logout user not access url
  const logoutUserNotAccessUrl = request.nextUrl.pathname === "/";

  // Logic for loged in user
  if (logedInUserNotAccessUrl) {
    if (authToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    }
    
  // Logic for logout in user
  if (logoutUserNotAccessUrl) {
    if (!authToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}


export const config = {
    matcher: ['/','/login','/signup']
}