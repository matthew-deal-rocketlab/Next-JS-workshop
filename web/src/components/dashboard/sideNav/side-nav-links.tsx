'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type Collapsed } from './sidenav'

// Map of links to display in the side navigation.
const links = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Settings', href: '/dashboard/settings' },
  { name: 'Custom 404 example', href: '/example' },
] as const

function getLinkClassName(pathname: string, href: string): string {
  const baseClassName =
    'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gray-100'
  if (pathname === href) {
    return `flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium bg-gray-400 text-white hover:bg-gray-400`
  }
  return baseClassName
}

export default function SideNavLinks({ isCollapsed }: Collapsed) {
  const pathname = usePathname()

  return (
    <>
      {links.map(link => (
        <Link
          key={link.name}
          href={link.href}
          className={`${getLinkClassName(pathname, link.href)}`}>
          {/* The container for the link */}
          <div
            className={` flex h-[48px] ${
              isCollapsed ? 'justify-center' : 'justify-start'
            } items-center`}>
            {/* Show only the first letter when collapsed or in mobile view */}
            <span className="hidden md:inline">
              {isCollapsed ? link.name.charAt(0) : link.name}
            </span>
            <span className="md:hidden">{link.name.charAt(0)}</span>
          </div>
        </Link>
      ))}
    </>
  )
}
