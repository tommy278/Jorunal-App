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

    const padding = { padding: "2rem", background: "rgba(255,0,0,0.2)" }

    return(
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-10"
        style={{ marginTop: "2rem"}}>
            {entries.length === 0 ? (
                <h1>No Entries Yet</h1>
            ): (
                <>
                    {entries.map((entry) => (
                            <Link
                                key = {entry.id} 
                                href={ `/dashboard/view_entry/${entry.id}-${slugify(entry.title)}` }
                                className="block bg-blue-500 border border-green-500 rounded-lg"
                            >
                                <div style= {padding}>
                                    <h4 className="font-bold mb-2">{entry.title}</h4>
                                    <p className="mb-2">{ entry.content }</p> 
                                    <p>{ entry.mood }</p> 
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
