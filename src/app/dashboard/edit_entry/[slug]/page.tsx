"use client"

import { use, useState, useEffect, ChangeEvent } from "react";
import { useRouter }  from "next/navigation";
import Loading from "@/components/Loading/EditLoading";

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
    const [hovered, setHovered] = useState(0);

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

    if (loading) return <Loading />
    if (!id) return <div>Something went wrong, try again</div>

    return (
        <div>
            <form 
                className="flex flex-col items-center gap-y-5 mt-10"
                onSubmit={handleSubmit}>
                <h1 className="font-bold text-blue-500 text-[clamp(3rem,5vw,4rem)]">Edit Entry</h1>
                <input 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                    placeholder="Title"
                    value = {title}
                    autoFocus
                    type = "text"
                    className="border rounded-lg 
                    w-[clamp(17rem,40%,50rem)]
                    text-center
                    center
                    "
                />
                <textarea 
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                    value = {content}
                    className="border rounded-lg
                            w-[clamp(17rem,40%,50rem)]
                            p-2
                            "
                    rows={10}
                    placeholder="Enter content here..."
                />
                <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                    key={star}
                        className={`
                            w-6 h-6 
                            md:w-9 h-12
                            cursor-pointer transition-colors duration-200 ${
                            (hovered || mood) >= star ? "text-yellow-400": "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        onClick={() => setMood(star)}
                        onMouseEnter={() => setHovered(star)}
                        onMouseLeave={() => setHovered(0)}
                        >
                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.157c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.068 9.385c-.783-.57-.38-1.81.588-1.81h4.157a1 1 0 00.95-.69l1.286-3.958z" />
                    </svg>
                ))}
            </div>
                <button
                    type="submit" disabled={saving}
                    className="border w-30 rounded-lg bg-white/10 backdrop-blur-xs cursor-pointer"
                    >{saving ? "Saving...": "Edit Entry"}</button>
                <button 
                    onClick={handleDelete}
                    className="flex justify-center bg-red-900 p-1 w-30 rounded-lg cursor-pointer"
                >
                    Delete
                </button>
            </form>
        </div>
    )
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');  
}