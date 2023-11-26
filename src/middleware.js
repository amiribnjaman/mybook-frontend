'use client'
// import { NextResponse } from "next/server";

export function middleware(request) {
    console.log('middleware')
//   let token;
//   if (typeof window !== "undefined") {
//     token = window.localStorage.getItem("Token");
// }
//     console.log(token)
//     if (token) {
//         return NextResponse.redirect(new URL("/", request.url));
//     } else {
//         return NextResponse.redirect(new URL("/login", request.url));
//      }
}


export const config = {
    matcher: ['/','/login','/signup']
}