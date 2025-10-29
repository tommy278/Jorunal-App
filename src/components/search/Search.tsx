"use client";

import { useState, useCallback } from "react";
import SearchModal from "./SearchModal";
import { useAuth } from "@/context/AuthContext";
import { useDebouncedSearch } from "@/lib/search/debounce";
import { renderSearchResults } from "./render";

import { GoXCircle } from "react-icons/go";

interface SearchProp{
    icon: React.ReactNode;
}

export default function Search({ icon }: SearchProp) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const { user } = useAuth();

    if (!user) return

    const fetchEntries = useCallback(async (q: string) => {
        const res = await fetch(`/api/users/search_entries?userId=${user.id}&query=${encodeURIComponent(q)}`);
        const data = await res.json();
        return data.entries ?? [];
    }, [user?.id]); 

    const entries = useDebouncedSearch(query, fetchEntries);

    return (
        <>
            <button 
            onClick={() => setOpen(true)}
            className="p-0 w-6 h-6 flex items-center justify-center text-gray-700 dark:text-white hover:text-blue-500"
            >
                {icon}
            </button>
            <SearchModal isOpen={open} onClose={() => setOpen(false)}>
                <h2 className="text-gray font-semibold mb-2 text-10">Search Entries</h2>
                <div style={{ position: "relative", display:"inline-block" }}>
                   <input
                    type="text"
                    placeholder="Type to search..."
                    value={query}
                    onChange = {(e) =>setQuery(e.target.value)}
                    autoFocus
                    className="p-32 border rounded-sm w-full"
                />
                {query && (
                    <button
                        onClick={() => setQuery("")}
                        style={{
                            position: "absolute",
                            right: "0.5rem",
                            top: "50%",
                            transform: "translateY(-50%)",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        <GoXCircle />
                    </button>
                )
                } 
                </div>
                 <div className="my-5 space-y-3">
                    {entries && entries.length > 0 ? (
                        renderSearchResults(entries, () => setOpen(false))
                    ) : (
                        <p>No results found</p>
                    )}
                </div>
            </SearchModal>
        </>
    );
}