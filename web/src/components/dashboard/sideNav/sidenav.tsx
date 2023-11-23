'use client'

import React, { useState } from 'react'
import SideNavLinks from './side-nav-links'
import SignOut from '@/components/signout'

export type Collapsed = {
  isCollapsed: boolean
}

export default function SideNav() {
  // State to toggle the collapsed state of the sidebar
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Function to toggle the collapsed state
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div
      className={`group ${
        isCollapsed ? 'w-16' : 'md:w-64'
      } flex-none transition-all duration-300 ease-in-out`}>
      <div className="flex h-full flex-col overflow-y-auto px-1 py-4 transition-all duration-300 ease-in-out">
        <div className="flex grow flex-col justify-between space-y-2 rounded-lg bg-gray-200 p-2 transition-all duration-300 ease-in-out ">
          <div className="space-y-2 ">
            <div onClick={toggleCollapse} className="hidden cursor-pointer text-2xl md:flex md:p-2">
              &#9776;
            </div>
            <SideNavLinks isCollapsed={isCollapsed} />
          </div>
          <SignOut isCollapsed={isCollapsed} />
        </div>
      </div>
    </div>
  )
}
