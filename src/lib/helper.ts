export function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function convertTimestamp(timestamp: Date): string {
  const readable = timestamp.toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
  return readable
}
