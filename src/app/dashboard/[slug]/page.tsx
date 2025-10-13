"use client"

import { useEffect, useState, use } from "react";

interface PostParams {
    params: {slug: string;}
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

export default function Page({ params: paramsPromise}: { params: Promise<PostParams["params"]> }) {
    const params = use(paramsPromise)
    const [entries, setEntries] = useState<Entry[]>([]);

    useEffect(() => {
        async function getEntries() {
            try {
                const res = await fetch(`/api/users/entries?id=${params.slug}`)
                if (!res.ok) throw new Error("Failed to fetch entries")

                const data = await res.json();
                if (Array.isArray(data.entries)) {
                    setEntries(data.entries)
                } else {
                    setEntries([]);
                }
                
                console.log(data.entries);
            } catch (err) {
                console.error("Could not get entries", err)
            }
        }
        getEntries();
    },[params])

    return(
        <div>
            <ul>
            {entries.length === 0 ? (
                <p>No entries found</p>
            ): (
                <ul>
                    {entries.map((entry) => (
                        <li key={ entry.id }>{entry.title}{ entry.content }: { entry.mood }</li>
                    ))}
                </ul>
            )}
            </ul>
        </div>
    )
}