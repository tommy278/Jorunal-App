import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET (req: NextRequest) {
    const url = new URL(req.url)
    const id = url.searchParams.get("id")

    if (!id) return NextResponse.json({ message: "No entry id provided" })
    
    try {
        const entry = await prisma.entry.findFirst({
            where: { id }
        })

        if (!entry) {
            return NextResponse.json({ message: "Entry does not exist" })
        }

        return NextResponse.json({
            message: "Here is the entry",
            entry: entry
        })

    } catch (err) {
        console.error('Could not find entry', err)
    }
}

export async function DELETE(req: NextRequest) {
    const url = new URL(req.url)
    const id = url.searchParams.get("id")

    if (!id) return NextResponse.json({ message: "No entry ID provided"}, {status: 400})
    
    try {
        await prisma.entry.delete({ where: {id} });
        return NextResponse.json({ message: "Entry successfully deleted"})
    } catch (err) {
        console.error("Delete failed", err)
        return NextResponse.json({ message: "Failed to delete entry"}, {status: 500})
    }
}