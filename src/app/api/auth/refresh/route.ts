import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";

export async function POST(req: NextRequest) {
    const refreshToken = req.cookies.get("refresh_token")?.value;
    if (!refreshToken) return NextResponse.json({ error: "No refresh token found"}, {status: 401});

    try {
        const { payload } = await jwtVerify(refreshToken, new TextEncoder().encode(process.env.JWT_REFRESH_SECRET));

        const newAccess = await new SignJWT({ id: payload.id, email:payload.email,  })
        .setProtectedHeader({ alg: "HS256"})
        .setExpirationTime("15m")
        .sign(new TextEncoder().encode(process.env.JWT_ACCESS_SECRET));

        const res = NextResponse.json({ message: "Refreshed succesfully "});
        res.cookies.set("access_token", newAccess, {
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 15
        });
        return res;
    } catch{
        return NextResponse.json({ error: "Invalid refresh token:"}, { status: 403 })
    }
}

