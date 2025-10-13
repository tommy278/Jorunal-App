"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";

interface Data {
            userId: string,
            content: string,
            mood: number
            title?: string,
        }

export default function NewEntry(){
    const { user } = useAuth(); // remember to use user.id, user is an object
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [mood, setMood] = useState(0);
    

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

        try {
           const res = await fetch("/api/users/entries", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(data)
            })
            if (!res.ok) throw new Error("Error occurred during entry creating")
            } catch (err) {
            console.error("Something went wrong")
        } finally{
            setContent("");
            setMood(0);
        }
        
    }

    return(
        <form onSubmit={handleSubmit}>
            <input 
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                placeholder="Title"
                value = {title}
                type = "text"
            />
            <input 
                onChange={(e: ChangeEvent<HTMLInputElement>) => setContent(e.target.value)}
                placeholder="Content"
                value = {content}
                type = "text"
            />
            <input 
                onChange={(e: ChangeEvent<HTMLInputElement>) => setMood(Number(e.target.value)) }
                placeholder="Mood"
                value = {mood}
                type = "number"
            />
            <button type="submit">Add Entry</button>
        </form>
    )
}