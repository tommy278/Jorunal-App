"use client"

import { use, useState, useEffect } from "react";
import { useRouter }  from "next/navigation";

interface PageProps {
    params: Promise<{ slug: string }> 
}

interface Data {
    id: string
    title?: string,
    content?: string,
    mood?: number
}

export default function Page ({params}: PageProps) {
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [mood, setMood] = useState(0);

    const router = useRouter();

    const { slug } = use(params)
    const id = slug.split("-")[0]

    useEffect(() => {
        async function fetchEntryData() {
            try {
                const res = await fetch(`/api/users/get_entry?id=${id}`)
                if (!res.ok) throw new Error("Failed to fetch entry")

                const data = await res.json();
                setTitle(data.entry.title)
                setContent(data.entry.content)
                setMood(data.entry.mood)

            } catch(err) {
                console.error("Error fetching entry", 401)
            } finally {
                setLoading(false);
            }
        }
        fetchEntryData();
    }, [id])


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const data: Data = { id }
        if (title) data.title = title;
        if (content) data.mood = mood;
        if (mood !== undefined) data.mood = mood;

        try {
            const res = await fetch("/api/users/entries", {
                method: "PATCH",
                credentials: "include",
                body: JSON.stringify(data)
            })
            if (!res.ok) throw new Error("Error patching data")     
        } catch (err) {
            console.error("Error processing the patch request", err)
        } finally {
            router.push(`/dashboard/view_entry/${id}-${slugify(title)}`)
        }
    }

    if (loading) return <div>Loading...</div>
    if (!id) return <div>Something went wrong, try again</div>

    return (
        <form onSubmit={handleSubmit}>
            <input value={title} onChange={(e) => setTitle(e.target.value)}/>
            <input value={content} onChange={(e) => setContent(e.target.value)} />
            <input value={mood} type="number" min="1" max="10" onChange={(e) => setMood(Number(e.target.value))}/>
            <button type="submit" disabled={loading}>Edit Entry</button>
        </form>
    )
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');  
}