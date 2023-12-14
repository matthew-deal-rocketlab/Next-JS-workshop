import React from 'react'
import Link from 'next/link'
import SvgIcon from '@/components/svg-icon/svgIcon'
import { user } from '@/components/svg-paths'

export default function TopNav() {
  return (
    <nav>
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-5 py-5">
        <div className="flex items-center space-x-4">
          <Link className="flex-shrink-0" href="/dashboard">
            Your Logo
          </Link>
        </div>
        <Link className="block rounded p-2" href="/dashboard/profile">
          <SvgIcon pathData={user} className="h-6 w-6" alt={'profile'} />
        </Link>
      </div>
    </nav>
  )
}
