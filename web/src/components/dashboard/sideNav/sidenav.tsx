'use client'

import React, { useEffect, useState } from 'react'
import SideNavLinks from './side-nav-links'
import SignOut from '@/components/signout'

export type Collapsed = {
  isCollapsed: boolean
}

export default function SideNav() {
  const [isUserCollapsed, setIsUserCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if the window size is mobile or not
  function handleResize() {
    setIsMobile(window.innerWidth < 768)
  }

  useEffect(() => {
    // Initialize the check on mount
    handleResize()
    // Add event listener for window resize
    window.addEventListener('resize', handleResize)
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Set the initial collapse state based on whether it's mobile
  useEffect(() => {
    setIsUserCollapsed(isMobile)
  }, [isMobile])

  // Function to toggle the collapsed state
  const toggleCollapse = () => {
    setIsUserCollapsed(!isUserCollapsed)
  }

  // The actual collapsed state
  const isCollapsed = isMobile ? isUserCollapsed : isUserCollapsed

  return (
    <div
      className={`group transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-64'
      } flex-none`}>
      <div className="flex h-full flex-col overflow-y-auto px-1 py-4 transition-all duration-300 ease-in-out">
        <div className="flex grow flex-col justify-between space-y-2 rounded-lg bg-gray-200 p-2 transition-all duration-300 ease-in-out ">
          <div className="space-y-2 ">
            <div onClick={toggleCollapse} className="flex cursor-pointer p-2 text-2xl">
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
