import EntriesList from '@/components/EntriesList'
import { getUserFromServer } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function Page() {
  const user = await getUserFromServer()
  if (!user) {
    console.error('Please sign in')
    return
  }
  const entries = await prisma.entry.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  })
  return <EntriesList entries={entries} />
}
