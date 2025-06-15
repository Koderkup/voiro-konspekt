import { NextResponse } from "next/server";
import { User } from "../../types/user.dto";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const userInfoCookie = req.cookies.get("user-info");

  if (!userInfoCookie || !userInfoCookie.value) {
    return NextResponse.redirect("/auth");
  }

  const user: User = JSON.parse(userInfoCookie.value);

  if (user.role !== "admin") {
    return NextResponse.redirect("/");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/users-list"],
};
