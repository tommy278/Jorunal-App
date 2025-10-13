import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
    try {
        const {username, email, password} = await req.json()

        if (!username || !email || !password) {
            return NextResponse.json("Invalid Input")
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        await prisma.user.create({
            data: { username, email, password: hashedPassword }
        })
        return NextResponse.json({ message: "Successfully registered"})
    } catch (err) {
        console.error(err)
        return NextResponse.json({ message: "Failed to register account"})
    } 
}