import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { betterFetch } from "@better-fetch/fetch";
import { auth } from "@/lib/auth"; // สมมติว่ามี

const locales = ["en", "th"];
type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ข้าม static file, API
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // 1. เช็ก locale
  const localeFromCookie = request.cookies.get("NEXT_LOCALE")?.value || "th";

  if (!locales.some((locale) => pathname.startsWith(`/${locale}`))) {
    // ถ้า path ยังไม่มี locale
    return NextResponse.redirect(
      new URL(`/${localeFromCookie}${pathname}`, request.url)
    );
  }

  // 2. เช็ก session เฉพาะหน้า dashboard
  if (pathname.startsWith(`/${localeFromCookie}/dashboard`)) {
    const { data: session } = await betterFetch<Session>(
      "/api/auth/get-session",
      {
        baseURL: request.nextUrl.origin,
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
      }
    );

    if (!session) {
      return NextResponse.redirect(new URL(`/${localeFromCookie}/login`, request.url));
    } else if (session.user.role === "user") {
      return NextResponse.redirect(new URL(`/${localeFromCookie}/`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
