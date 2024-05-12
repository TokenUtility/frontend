import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from "@/middlewares/stackHandler";
const PUBLIC_FILE = /\.(.*)$/;

export const withComingSoon: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    if (
      pathname.startsWith("/_next") || // exclude Next.js internals
      pathname.startsWith("/api") || //  exclude all API routes
      pathname.startsWith("/static") || // exclude static files
      PUBLIC_FILE.test(pathname) // exclude all files in the public folder
    ) {
      return next(request, _next);
    }
    if (["/"]?.some((path) => pathname.startsWith(path))) {
      const isInMaintenanceMode =
        process.env.NEXT_PUBLIC_SHOW_COMING_SOON === "1";
      let response;
      // If in maintenance mode, point the url pathname to the maintenance page
      if (isInMaintenanceMode && request.nextUrl.pathname !== "/coming-soon") {
        request.nextUrl.pathname = `/coming-soon`;
        // redirect to the url
        response = NextResponse.redirect(request.nextUrl);
      }
      if (!isInMaintenanceMode && request.nextUrl.pathname === `/coming-soon`) {
        request.nextUrl.pathname = "/";
        response = NextResponse.redirect(request.nextUrl);
      }
      if (response) {
        response.headers.set("x-middleware-cache", "no-cache");
        return response;
      }
    }
    return next(request, _next);
  };
};
