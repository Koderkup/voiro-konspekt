import { NextRequest, NextResponse } from "next/server";

export async function AuthUsersOnlyMiddleware(req: NextRequest) {
  const userInfoCookie = req.cookies.get("user-info");
    const url = req.nextUrl.clone();
  if (!userInfoCookie) {
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
