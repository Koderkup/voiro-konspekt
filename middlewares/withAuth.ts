import { NextRequest, NextResponse, NextFetchEvent } from "next/server";
import { MiddlewareFactory } from "./stackHandler";
import { AdminOnlyMiddleware } from "./adminOnlyMiddleware";

export const withAuth: MiddlewareFactory = (next) => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
console.log(pathname);
    if (pathname.startsWith("/users-list")) {

      const response = await AdminOnlyMiddleware(request);
      if (response) {
        return response; 
      }
    }

    return next(request, event); 
  };
};
