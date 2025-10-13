"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";

interface PageProps {
    params: Promise<{ slug: string }> 
}

interface Entry {
    title: string,
    id: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    content: string;
    mood: number;
}

export default function Page ({ params }: PageProps) {
    const [entry, setEntry] = useState<Entry | null>(null);
    const [loading, setLoading ] = useState(true);
    
    const { slug } = use(params)
    const id = slug.split("-")[0]
    
    useEffect(() => {
        
        async function fetchEntry() {
            try {
                const res = await fetch(`/api/users/get_entry?id=${id}`)
                if (!res.ok) throw new Error("Failed to fetch entry")

                const data = await res.json()
                setEntry(data.entry)
            } catch (err) {
                console.error("Error fetching entry", 401)
            } finally {
                setLoading(false);
            }
        }
        fetchEntry();
    }, [id])

    if (loading) return <p>Loading...</p>
    if (!entry) return <p>Entry not found</p>

    return (
        <div>
            {entry.title} {entry.content} {entry.mood}
            <Link href={`/dashboard/edit_entry/${entry.id}-${slugify(entry.title)}`}>
                <button>
                    Edit
                </button>
            </Link>
        </div>
    )
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');  
}