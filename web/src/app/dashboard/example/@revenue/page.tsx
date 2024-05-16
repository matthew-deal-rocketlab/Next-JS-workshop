import RevenueChart from '@/components/examples/home/revenue-chart'
import { RevenueChartSkeleton } from '@/components/examples/skeletons'
import { Revenue } from '@/examples/types/types'

import { apiPost } from '@/utils/api-client'
import { Suspense } from 'react'

type fetchRevenue = {
  fetchRevenue: Revenue[]
  month: string
  revenue: number
}

export default async function Page() {
  const revenueData = await apiPost('/jsonql', { fetchRevenue: {} })

  const { fetchRevenue } = revenueData && (revenueData.result as fetchRevenue)

  return (
    <Suspense fallback={<RevenueChartSkeleton />}>
      <RevenueChart revenueData={fetchRevenue} />
    </Suspense>
  )
}
