import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    const url = new URL(req.url)
    const userId = url.searchParams.get("id")
    if (!userId ) return NextResponse.json({ message: "No id provided" })

    const entries = await prisma.entry.findMany({
        where: 
        { userId },
        orderBy: {createdAt: 'desc'} 
    })
    
    if (!entries || entries.length === 0) {
        return NextResponse.json("You have no entries yet.")
    }

    return NextResponse.json({
        message: "Here are the entries",
        entries: entries,
    })
}

interface Post{
    userId: string,
    content: string,
    mood: number,
    title?: string
}

export async function POST(req: NextRequest) {
    try {
        const { userId, title, content, mood }: Post = await req.json()

        if (!userId || !content || typeof mood !== "number") {
            return NextResponse.json({ message: "Invalid input"}, {status: 400})
        }

        const newEntry = await prisma.entry.create({ data: { userId, content, mood, title } })
        return NextResponse.json({ message: "Entry successfully created", entry: newEntry })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ message: "Failed to create entry" })
    }
}