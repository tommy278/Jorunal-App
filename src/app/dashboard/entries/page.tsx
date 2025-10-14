"use client"

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Card from "@/components/ThemeElements/Card";

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
        <div>
            {entries.length === 0 ? (
                <p>No entries found</p>
            ): (
                <>
                    {entries.map((entry) => (
                        <Card key={ entry.id }>
                            <Link 
                                href={ `/dashboard/view_entry/${entry.id}-${slugify(entry.title)}` }
                            >{entry.title}{ entry.content }: { entry.mood }
                            </Link>
                        </Card>
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
