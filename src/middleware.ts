import { jwtVerify } from 'jose';
import {NextResponse, NextRequest} from "next/server";

const secret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  let payload = null;

  if (token) {
    try {
      const { payload: verified } = await jwtVerify(token, secret);
      payload = verified;
    } catch (err) {
      console.log("JWT verify failed:", err);
    }
  }

  if (req.nextUrl.pathname.startsWith("/dashboard") && !payload) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard","/dashboard/:path*", "/api/:path*"],
};