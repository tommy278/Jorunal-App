import { Suspense, use } from "react";
import Link from "next/link";
import Loading from "@/components/Loading";
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
    <div className="flex flex-col items-center mt-10 h-screen">
      <h1 className="font-bold 
                      text-[clamp(3rem,5vw,4rem)]
                      border
                      rounded-lg
                      py-2
                      px-1
                      ">{entry.title}
                      </h1>
      <p className="text-gray-400 w-[clamp(17rem,40%,50rem)]
                                  text-[clamp(1rem,5vw,1.5rem)]
                                  border rounded-sm mt-5 p-5">{entry.content}</p>
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