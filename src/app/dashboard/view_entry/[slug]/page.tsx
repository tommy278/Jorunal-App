import { Suspense, use } from "react";
import Link from "next/link";
import Loading from "@/components/Loading";
import { getEntry } from "@/lib/ServerFetching/entry"

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
    <div>
      <h1>{entry.title}</h1>
      <p>{entry.content}</p>
      <p>Mood: {entry.mood}</p>
      <Link href={`/dashboard/edit_entry/${entry.id}-${slugify(entry.title)}`}>
        <button>Edit</button>
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