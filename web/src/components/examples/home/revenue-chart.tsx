'use client'

import React, { useEffect, useState } from 'react'
import { generateYAxis } from '@/examples/utils/helpers'
// import { fetchRevenue } from '@/examples/lib/data'
import { ApiStatus } from '@/services/apiclient'
import { SubmitResultType } from '@/types.d'
import { apiPost } from '@/utils/api-client'
import { type Revenue } from '@/examples/types/types'

export default function RevenueChart() {
  const [revenue, setRevenue] = useState<Revenue[]>([])
  const [yAxisLabels, setYAxisLabels] = useState<string[]>([])
  const [topLabel, setTopLabel] = useState<number>(0)

  useEffect(() => {
    const fetchRevenueData = async () => {
      const revenueData = await apiPost('/jsonql', { fetchRevenue: {} })

      if (revenueData.status !== ApiStatus.OK) {
        return { text: 'Error logging in', type: SubmitResultType.error }
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const { fetchRevenue } = revenueData?.result

      console.log('fetchRevenue', revenueData)

      setRevenue(fetchRevenue)
      const { yAxisLabels, topLabel } = generateYAxis(fetchRevenue)
      setYAxisLabels(yAxisLabels)
      setTopLabel(topLabel)
    }

    void fetchRevenueData()
  }, [])

  const chartHeight = 350

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className="mb-4 text-xl md:text-2xl">Recent Revenue</h2>

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 sm:grid sm:grid-cols-13 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}>
            {yAxisLabels.map(label => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {revenue.map(month => (
            <div key={month.month} className="col-span-1 flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-blue-300"
                style={{
                  height: `${(chartHeight / topLabel) * month.revenue}px`,
                }}
              />
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">{month.month}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
        </div>
      </div>
    </div>
  )
}
