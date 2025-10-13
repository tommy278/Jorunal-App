import { useState, useEffect, useRef } from "react";

export function useDebouncedSearch<T>(
  query: string,
  fetcher: (query: string) => Promise<T>,
  delay: number = 300
) {
  const [results, setResults] = useState<T | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults(null);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        const data = await fetcher(query);
        setResults(data);
      } catch (err) {
        console.error("Search failed", err);
      }
    }, delay);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, fetcher, delay]);

  return results;
}