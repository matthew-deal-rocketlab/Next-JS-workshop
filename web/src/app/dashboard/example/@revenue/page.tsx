import RevenueChart from '@/components/examples/home/revenue-chart'
import { RevenueChartSkeleton } from '@/components/examples/skeletons'
import { Suspense } from 'react'

export default async function Page() {
  return (
    <Suspense fallback={<RevenueChartSkeleton />}>
      <RevenueChart />
    </Suspense>
  )
}
