import { Suspense, use } from 'react'
import Link from 'next/link'
import Loading from '@/components/Loading/ViewLoading'
import { getEntry } from '@/lib/ServerFetching/entry'
import { FaStar } from 'react-icons/fa'
import { CiStar } from 'react-icons/ci'

interface PageProps {
  params: Promise<{ slug: string }>
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function Page({ params }: PageProps) {
  const resolvedParams = use(params) as { slug: string }
  const { slug } = resolvedParams

  const id = slug.split('-')[0]
  const entry = use(getEntry(id))

  return (
    <div className="mt-10 flex flex-col items-center">
      <h1 className="rounded-lg border px-1 py-2 text-center text-[clamp(1.5rem,5vw,3rem)] font-bold break-words text-blue-400 shadow-lg">
        {entry.title}
      </h1>
      <p className="mt-5 w-[clamp(17rem,40%,50rem)] rounded-sm border p-5 text-[clamp(1rem,5vw,1.5rem)] text-gray-400 shadow-md">
        {entry.content}
      </p>
      <div className="mt-2 flex flex-col items-start space-y-1 text-xs text-gray-400 lg:w-[40%] lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
        <span>Created: {convertTimestamp(entry.createdAt)}</span>
        {new Date(entry.createdAt).getTime() !==
          new Date(entry.updatedAt).getTime() && (
          <span>Updated: {convertTimestamp(entry.updatedAt)}</span>
        )}
      </div>

      <StarRating rating={entry.mood} />
      <Link href={`/dashboard/edit_entry/${entry.id}-${slugify(entry.title)}`}>
        <button className="mt-5 w-30 cursor-pointer rounded-lg border bg-white/10 backdrop-blur-xs">
          Edit
        </button>
      </Link>
    </div>
  )
}

export default function PageWrapper(props: PageProps) {
  return (
    <Suspense fallback={<Loading />}>
      <Page {...props} />
    </Suspense>
  )
}

function StarRating({ rating }: { rating: number }) {
  const totalStars = 5
  return (
    <div className="mt-5 flex text-xl text-yellow-400">
      {[...Array(totalStars)].map((__, i) => (
        <span key={i}>{i < rating ? <FaStar /> : <CiStar />}</span>
      ))}
    </div>
  )
}
function convertTimestamp(timestamp: Date): string {
  const readable = new Date(timestamp).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
  return readable
}
