import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { maintenancePage } from "@/lib/maintenance-page";

/**
 * Maintenance mode (Next.js 16 "proxy", formerly middleware).
 *
 * When `MAINTENANCE_MODE=true`, every request is served a branded 503
 * "coming soon" page instead of the app.
 *
 * Preview bypass: visit `/?preview=<MAINTENANCE_BYPASS_TOKEN>` once to set a
 * cookie and browse the real site (for the developer / client). Visit
 * `/?preview=exit` to leave preview mode.
 */

const BYPASS_COOKIE = "maint-bypass";

export function proxy(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE !== "true") {
    return NextResponse.next();
  }

  const token = process.env.MAINTENANCE_BYPASS_TOKEN;
  const { searchParams, pathname } = request.nextUrl;
  const preview = searchParams.get("preview");

  // Handle the preview query: set/clear the bypass cookie, then redirect to a
  // clean URL so the token never lingers in the address bar or referrer.
  if (preview !== null) {
    const cleanUrl = request.nextUrl.clone();
    cleanUrl.searchParams.delete("preview");
    const response = NextResponse.redirect(cleanUrl);

    if (preview === "exit") {
      response.cookies.delete(BYPASS_COOKIE);
    } else if (token && preview === token) {
      response.cookies.set(BYPASS_COOKIE, token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }
    return response;
  }

  // Already in preview mode → let the real site through.
  if (token && request.cookies.get(BYPASS_COOKIE)?.value === token) {
    return NextResponse.next();
  }

  // Everyone else gets the maintenance page (skip the favicon request).
  if (pathname === "/favicon.ico") {
    return NextResponse.next();
  }

  return new NextResponse(maintenancePage(), {
    status: 503,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "retry-after": "3600",
      "x-robots-tag": "noindex",
    },
  });
}

export const config = {
  // Run on all routes except Next.js internals and static asset files.
  matcher: ["/((?!_next/static|_next/image).*)"],
};
