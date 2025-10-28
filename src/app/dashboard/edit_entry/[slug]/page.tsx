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
    const [saving, setSaving] = useState(false);

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
        setSaving(true);

        const data: Data = { id }
        if (title) data.title = title;
        if (content) data.content = content;
        if (mood !== undefined) data.mood = mood;

        try {
            const res = await fetch("/api/users/entries", {
                method: "PATCH",
                credentials: "include",
                body: JSON.stringify(data)
            })
            if (!res.ok) throw new Error("Error patching data")
            router.push(`/dashboard/view_entry/${id}-${slugify(title)}`)
        } catch (err) {
            console.error("Error processing the patch request", err)
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete() {
        setSaving(true);
        try {
            const res = await fetch(`/api/users/get_entry?id=${id}`, {
                method: "DELETE",
                credentials: "include",
            })
            if (!res.ok) throw new Error("Error deleting data")
            router.push("/dashboard/entries")
        } catch(err) {
            console.error("Error executing the delete request", err)
        } finally {
            setSaving(false);
        }
    }

    if (loading) return <div>Loading...</div>
    if (!id) return <div>Something went wrong, try again</div>

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input value={title} onChange={(e) => setTitle(e.target.value)}/>
                <input value={content} onChange={(e) => setContent(e.target.value)} />
                <input value={mood} type="number" min="1" max="10" onChange={(e) => setMood(Number(e.target.value))}/>
                <button type="submit" disabled={saving} >
                    {saving ? "Saving...": "Edit Entry"}
                </button>
            </form>
            <button onClick={handleDelete}>
                Delete
            </button>
        </div>
    )
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');  
}