'use client'

import { useState, useCallback } from 'react'
import SearchModal from './SearchModal'
import { useAuth } from '@/context/AuthContext'
import { useDebouncedSearch } from '@/lib/search/debounce'
import { renderSearchResults } from './render'
import { GoXCircle } from 'react-icons/go'
import { SearchProp } from '@/lib/constants'

export default function Search({ icon }: SearchProp) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const { user } = useAuth()

  const fetchEntries = useCallback(
    async (q: string) => {
      if (!user) return []
      const res = await fetch(
        `/api/users/search_entries?userId=${user.id}&query=${encodeURIComponent(q)}`
      )
      const data = await res.json()
      return data.entries ?? []
    },
    [user]
  )

  const entries = useDebouncedSearch(query, fetchEntries)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex h-6 w-6 items-center justify-center p-0 text-gray-700 hover:text-blue-500 dark:text-white"
      >
        {icon}
      </button>
      <SearchModal isOpen={open} onClose={() => setOpen(false)}>
        <h2 className="text-gray text-10 mb-2 font-semibold">Search Entries</h2>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <input
            type="text"
            placeholder="Type to search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full rounded-sm border p-32"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{
                position: 'absolute',
                right: '0.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <GoXCircle />
            </button>
          )}
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
  )
}
