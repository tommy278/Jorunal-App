import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    const url = new URL(req.url)
    const userId = url.searchParams.get("userId")
    const query = url.searchParams.get("query")?.trim() ?? "";

    if (!userId) return NextResponse.json({ message: "Missing userid"}, {status: 400})
    
    if (query.length < 3) return NextResponse.json({ entries: [] })

    try {
        const entries = await prisma.entry.findMany({
            where: {
                userId,
                OR: [
                    { title: {contains: query, mode: "insensitive"} },
                    { content: {contains: query, mode:"insensitive"} }
                ],
            },
            orderBy: {createdAt: "desc"},
            take: 20
        })
        return NextResponse.json({ entries })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ message: "Failed to search entries"}, {status: 500})
    }
}