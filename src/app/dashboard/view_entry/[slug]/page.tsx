import { Suspense, use } from "react";
import Link from "next/link";
import Loading from "@/components/Loading/ViewLoading";
import { getEntry } from "@/lib/ServerFetching/entry"

import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function Page({ params }: PageProps) {
    const resolvedParams = use(params) as {slug: string};
    const { slug } = resolvedParams;
    
    const id = slug.split("-")[0];
    const entry = use(getEntry(id)); 

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="font-bold 
                      text-[clamp(3rem,5vw,4rem)]
                      py-2
                      px-1
                      text-blue-400
                      border rounded-lg
                      ">{entry.title}
                      </h1>
      <p className="text-gray-400 w-[clamp(17rem,40%,50rem)]
                                  text-[clamp(1rem,5vw,1.5rem)]
                                  border rounded-sm mt-5 p-5">{entry.content}</p>
     <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center text-gray-400 text-xs space-y-1 lg:space-y-0 lg:space-x-4 lg:w-[40%] mt-2">
      <span>Created: {convertTimestamp(entry.createdAt)}</span>
      { new Date(entry.createdAt).getTime() !== new Date(entry.updatedAt).getTime() && (
        <span>Updated: {convertTimestamp(entry.updatedAt)}</span>
      )}
    </div>
      
      <StarRating rating={entry.mood} />
      <Link 
        href={`/dashboard/edit_entry/${entry.id}-${slugify(entry.title)}`}
        >
        <button className="border w-30 rounded-lg bg-white/10 backdrop-blur-xs cursor-pointer mt-5">Edit</button>
      </Link>
    </div>
  );
}

export default function PageWrapper(props: PageProps) {
  return (
    <Suspense fallback={<Loading />}>
      <Page {...props} />
    </Suspense>
  ); 
}

function StarRating({ rating }: {rating: number }) {
  const totalStars = 5;
  return (
    <div className="flex text-yellow-400 text-xl mt-5">
      {[...Array(totalStars)].map((__, i) => (
        <span key={i}>{i < rating ? <FaStar /> : <CiStar />}</span>
      ))}
    </div>
  )
}
function convertTimestamp(timestamp: Date): string{
    const readable = new Date(timestamp).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
    })
    return readable
}