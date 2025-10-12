import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    const url = new URL(req.url)
    const userId = url.searchParams.get("id")
    if (!userId ) return NextResponse.json({ message: "No id provided" })

    const entries = await prisma.entry.findMany({ where: 
        { userId } 
    })
    
    if (!entries || entries.length === 0) {
        return NextResponse.json("You have no entries yet.")
    }

    return NextResponse.json({
        message: "Here are the entries",
        entries: entries,
    })
}

export async function POST(req: NextRequest) {
    
}