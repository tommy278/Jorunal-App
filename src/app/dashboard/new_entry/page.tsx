"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading/NewEntryLoading"

interface Data {
            userId: string,
            content: string,
            mood: number
            title?: string,
        }

export default function NewEntry(){
    const { user, loading } = useAuth(); // remember to use user.id, user is an object
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [mood, setMood] = useState(0);
    const [hovered, setHovered] = useState(0);
    const router = useRouter();
    

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (!user) {
            console.error("Something went wrong", 401)
            return
        }

        const data: Data = {
            userId: user.id,
            title: title,
            content: content,
            mood: mood
        }

        if (data.mood < 0) {
            console.error("Invalid Input")
            return
        } 

        try {
           const res = await fetch("/api/users/entries", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(data)
            })
            if (!res.ok) throw new Error("Error occurred during entry creating")
            const result = await res.json()
            router.push(`/dashboard/view_entry/${result.entry.id}-${slugify(title)}`)
            } catch (err) {
            console.error("Something went wrong")
        } finally{
            setContent("");
            setMood(0);
        }
    }

    if (loading) return <Loading />

    return(
        <form 
            className="flex flex-col items-center gap-y-5 mt-10"
            onSubmit={handleSubmit}>
            <h1 className="font-bold text-blue-500 text-[clamp(3rem,5vw,4rem)]">New Entry</h1>
            <input 
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                placeholder="Title"
                value = {title}
                type = "text"
                autoFocus
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
                className="border w-30 rounded-lg bg-white/10 backdrop-blur-xs cursor-pointer"
                type="submit">Add Entry</button>
        </form>
    )
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');  
}