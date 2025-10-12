import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
    const {username, email, password} = await req.json()
    const hashedPassword = await bcrypt.hash(password, 12)
    await prisma.user.create({
        data: { username, email, password: hashedPassword }
    })
    return NextResponse.json({ message: "Successfully registered"})
}