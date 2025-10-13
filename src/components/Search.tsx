"use client";

import { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import SearchModal from "./SearchModal";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Search() {
    const [open, setOpen] = useState(false);
    const [results, setResults] = useState<React.ReactNode[]>([]);
    const [query, setQuery] = useState("");
    const { user } = useAuth();
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        if (!user) return;

        // Clear previous timeout
        if (debounceRef.current) clearTimeout(debounceRef.current);

        // Set new debounce
        debounceRef.current = setTimeout(async () => {
            try {
                const res = await fetch(
                    `/api/users/search_entries?userId=${user.id}&query=${encodeURIComponent(query)}`
                );
                const data = await res.json();
                const entries = data.entries ?? data;

                setResults(
                    entries.map((e: any) => (
                        <Link
                            key={e.id}
                            href={`/dashboard/view_entry/${e.id}-${slugify(e.title)}`}
                        >
                            <strong>
                                {e.title} - {e.content.slice(0, 40)}...
                            </strong>
                        </Link>
                    ))
                );
            } catch (err) {
                console.error("Search failed", err);
            }
        }, 300); // 300ms debounce

        // Cleanup timeout on unmount or query change
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [query, user]);

    return (
        <>
            <Button onClick={() => setOpen(true)}>Search</Button>
            <SearchModal
                open={open}
                onClose={() => setOpen(false)}
                onSearch={setQuery} // just update query
                results={results}
                query={query}
                setQuery={setQuery}
            />
        </>
    );
}

function slugify(title: string) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}