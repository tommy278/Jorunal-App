// app/lib/entries.ts
import { prisma } from "../prisma";

export async function getEntry(id: string) {
  const entry = await prisma.entry.findUnique({
    where: { id }
  });

  if (!entry) throw new Error("Entry not found");

  return entry;
}