import Link from "next/link";
import { slugify } from "@/lib/utils";

export function renderSearchResults(entries: any[], closeModal: () => void) {
  return entries.map((e) => (
    <Link
      key={e.id}
      href={`/dashboard/view_entry/${e.id}-${slugify(e.title)}`}
      onClick={closeModal}
    >
      <strong>{e.title}</strong> - {e.content.slice(0, 50)}...
    </Link>
  ));
}