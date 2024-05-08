import Cards from '@/components/examples/home/cards'
import { CardsSkeleton } from '@/components/examples/skeletons'
import { Suspense } from 'react'

export default async function Page() {
  return (
    <Suspense fallback={<CardsSkeleton />}>
      <Cards />
    </Suspense>
  )
}
