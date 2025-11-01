export async function getEntries(userId: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  const res = await fetch(`${baseUrl}/api/users/entries?id=${userId}`, {
    cache: 'no-store',
  })

  if (!res.ok) throw new Error('Failed to fetch entries')

  const data = await res.json()
  return data.entries
}
