import Link from 'next/link'
import { Entry } from '@/lib/constants'
import { convertTimestamp, slugify } from '@/lib/helper'

export default function EntriesList({ entries }: { entries: Entry[] }) {
  return (
    <div className="mx-10 mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
      {entries.length === 0 ? (
        <h1>No Entries Yet</h1>
      ) : (
        <>
          {entries.map((entry) => (
            <Link
              key={entry.id}
              href={`/dashboard/view_entry/${entry.id}-${slugify(entry.title)}`}
              className="block transform rounded-lg bg-blue-400 shadow-md transition-transform duration-200 hover:scale-105 dark:bg-blue-500"
            >
              <div className="p-8">
                <p className="mb-1 flex justify-end text-sm text-gray-100 dark:text-gray-300">
                  {convertTimestamp(entry.createdAt)}
                </p>
                <h4 className="m-2 flex justify-center font-bold md:text-lg">
                  {entry.title}
                </h4>
                <p className="mb-2 flex justify-center">
                  {entry.content.length >= 100
                    ? entry.content.slice(0, 100) + '...'
                    : entry.content}{' '}
                </p>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  )
}
