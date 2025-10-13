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

interface PatchEntry{
    title?: string,
    content?: string,
    mood?: number
}

export async function PATCH (req: NextRequest) {
    const { id, title, content, mood } = await req.json()
    const EntryToUpdate:PatchEntry = {}

    if (!id) return NextResponse.json({ message: "Missing entry ID" }, { status: 400 })

    if (title !== undefined) EntryToUpdate.title = title
    if (content !== undefined ) EntryToUpdate.content = content
    if (mood !== undefined ) EntryToUpdate.mood = mood

    if (!title && mood !== undefined && !content) {
        return NextResponse.json({ message: "Nothing to patch" },  { status: 401 })
    }

    try {
        const PatchedEntry = await prisma.entry.update({
            where: { id },
            data: EntryToUpdate 
        })
        return NextResponse.json({ 
            message: "Successfully updated the entry",
            data: PatchedEntry
        })
    } catch (err) {
        return NextResponse.json({ message: "Failed to update entry", error: err }, { status: 401 })
    }
}