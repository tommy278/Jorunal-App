import { NextResponse } from "next/server";

export async function POST() {
    const res = NextResponse.json({ message: "Logged out" })
    res.cookies.set("access_token", "", { path: "/", maxAge: 0 });
    res.cookies.set("refresh_token", "", { path: "/", maxAge: 0 });
    return res;
}