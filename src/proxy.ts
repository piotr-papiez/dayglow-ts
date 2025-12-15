// Utilities
import { NextResponse } from "next/server";

// Types
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest): NextResponse {
    const accessToken = req.cookies.get("accessToken")?.value;
    const refreshToken = req.cookies.get("refreshToken")?.value;
    const { pathname } = req.nextUrl;

    const isAuthRoute = pathname.startsWith("/auth");
    const isAppRoute = pathname.startsWith("/tasks");

    if (isAuthRoute && (accessToken || refreshToken)) return NextResponse.redirect(new URL("/tasks", req.url));
    if (isAppRoute && (!accessToken && !refreshToken)) return NextResponse.redirect(new URL("/auth/login", req.url));

    // if (isAuthRoute && accessToken) return NextResponse.redirect(new URL("/tasks", req.url));
    // if (isAppRoute && !accessToken) return NextResponse.redirect(new URL("/auth/login", req.url));

    return NextResponse.next();
}

export const config = {
    matcher: ["/auth/:path*", "/tasks/:path*"]
};