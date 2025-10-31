import Link from 'next/link'
import CenterContainer from '@/components/CenterContainer'

export default function Home() {
  return (
    <CenterContainer>
      <div className="text-center">
        <h1 className="mb-4 text-[clamp(3rem,5vw,4rem)] font-bold">
          Reflect, Grow. Understand yourself.
        </h1>
        <p className="mx-5 mb-6 text-[clamp(.875rem,2.5vw,1.125rem)]">
          Keep your thoughts private, track your moods, and see growth over
          time.
        </p>
        <Link
          className="rounded bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
          href="/register"
        >
          Get Started
        </Link>
      </div>
    </CenterContainer>
  )
}
