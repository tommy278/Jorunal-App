import { Suspense, use } from 'react'
import Loading from '@/components/Loading/ViewLoading'
import { getEntry } from '@/lib/ServerFetching/entry'
import { PageProps } from '@/lib/constants'
import { ViewEntry } from '@/components/ViewEntry'

function Page({ params }: PageProps) {
  const resolvedParams = use(params) as { slug: string }
  const { slug } = resolvedParams

  const id = slug.split('-')[0]
  const entry = use(getEntry(id))

  return <ViewEntry entry={entry} />
}

export default function PageWrapper(props: PageProps) {
  return (
    <Suspense fallback={<Loading />}>
      <Page {...props} />
    </Suspense>
  )
}
