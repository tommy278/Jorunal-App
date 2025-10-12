import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
    const {username, password} = await req.json()

    const user = await prisma.user.findFirst(
        { where: 
            {OR: [
                {username: username},
                {email: username}
            ]} 
        });

    if (!user?.password) return NextResponse.json({ error: "Invalid credentials"}, {status: 401})
    
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return NextResponse.json({ error: "Invalid credentials"}, {status: 401})

    const accessToken = signToken({ id: user.id, email: user.email }, "access")
    const refreshToken = signToken({ id: user.id }, "refresh")
    
    const res = NextResponse.json({ message: "Logged in successfully",
        user: { id: user.id, email: user.email}
     })

    res.cookies.set("access_token", accessToken, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 15
    })

    res.cookies.set("refresh_token", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7
    })

    return res;
}
