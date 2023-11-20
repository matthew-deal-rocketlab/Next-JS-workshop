// SideNav component
import React from 'react'
import SideNavLinks from './sideNavLinks'
import SignOut from '@/components/signout'

export default function SideNav() {
  return (
    <div className="w-full flex-none md:w-64">
      <div className="flex h-full flex-col overflow-y-auto px-3 py-4 md:px-2">
        <div className="flex grow flex-col justify-between space-y-2 rounded-lg bg-gray-200 p-4">
          <div className="space-y-2">
            <SideNavLinks />
          </div>
          <SignOut />
        </div>
      </div>
    </div>
  )
}
