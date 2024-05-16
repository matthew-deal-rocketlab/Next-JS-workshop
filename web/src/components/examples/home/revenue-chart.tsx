import React from 'react'
import { generateYAxis } from '@/examples/utils/helpers'
import { Revenue } from '@/examples/types/types'

export default async function RevenueChart({ revenueData }: { revenueData: Revenue[] }) {
  const { yAxisLabels, topLabel } = generateYAxis(revenueData)
  const revenue = revenueData
  const chartHeight = 400

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

          {revenue?.map(month => (
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
