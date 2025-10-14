"use client";

import { useState, useCallback } from "react";
import Button from "@mui/material/Button";
import SearchModal from "./SearchModal";
import { useAuth } from "@/context/AuthContext";
import { useDebouncedSearch } from "@/lib/search/debounce";
import { renderSearchResults } from "./render";

export default function Search() {
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
            <Button onClick={() => setOpen(true)}>Search</Button>
            <SearchModal isOpen={open} onClose={() => setOpen(false)}>
                <h2>Search Entries</h2>
                <input
                    type="text"
                    placeholder="Type to search..."
                    value={query}
                    onChange = {(e) =>setQuery(e.target.value)}
                />
                 <div style={{ marginTop: "1rem" }}>
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