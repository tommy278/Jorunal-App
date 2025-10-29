"use client"

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

interface Entry {
    title: string,
    id: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    content: string;
    mood: number;
}

export default function Entries() {
    const { user, loading } = useAuth();
    const [entries, setEntries] = useState<Entry[]>([]);

    useEffect(() => {
        async function getEntries() {
            try {
                const res = await fetch(`/api/users/entries?id=${user?.id}`)
                if (!res.ok) throw new Error("Failed to fetch entries")

                const data = await res.json();
                if (Array.isArray(data.entries)) {
                    setEntries(data.entries)
                } else {
                    setEntries([]);
                }

            } catch (err) {
                console.error("Could not get entries", err)
            }
        }
        getEntries();
    },[user])

    if (loading) return<div>This is the loading screen</div>;
    if (!user) return <div>Please log in</div>;

    return(
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 mx-10">
            {entries.length === 0 ? (
                <h1>No Entries Yet</h1>
            ): (
                <>
                    {entries.map((entry) => (
                        <Link
                            key = {entry.id} 
                            href={ `/dashboard/view_entry/${entry.id}-${slugify(entry.title)}` }
                            className="block bg-blue-500 rounded-lg"
                        >
                            <div className="p-8">
                                <p className="flex justify-end text-sm text-gray-300 mb-1">
                                    {convertTimestamp(entry.createdAt)}
                                </p>
                                <h4 className="flex justify-center font-bold m-2 md:text-lg">{entry.title}</h4>
                                <p className="flex justify-center mb-2">
                                    { entry.content.length >= 100 ?
                                    entry.content.slice(0, 100) + "...":
                                    entry.content } </p> 
                                <p className="flex justify-center">{ entry.mood }</p>
                            </div>
                        </Link>
                    ))}
                </>
            )}
        </div>
    )
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');  
}

function convertTimestamp(timestamp: string): string{
    const readable = new Date(timestamp).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
    })
    return readable
}
