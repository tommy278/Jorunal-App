import { NextRequest, NextResponse } from "next/server";
import { jwtVerify} from "jose";

export async function GET(req: NextRequest) {
    const accessToken = req.cookies.get("access_token")?.value;
    if (!accessToken) {
        return NextResponse.json({ user: null }, { status: 401 })
    }

    try {
        const { payload } = await jwtVerify(accessToken, new TextEncoder().encode(process.env.JWT_ACCESS_SECRET));
        return NextResponse.json({ user: {
                id: payload.id,
                email: payload.email,
            }
    });
    } catch {
        return NextResponse.json({ user: null}, { status: 401 })
    }
}