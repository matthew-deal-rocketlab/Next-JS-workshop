'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Map of links to display in the side navigation.
const links = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Settings', href: '/dashboard/settings' },
] as const

function getLinkClassName(pathname: string, href: string): string {
  const baseClassName =
    'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gray-100 md:flex-none md:justify-start md:p-2 md:px-3'
  if (pathname === href) {
    return `flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3 bg-gray-400 text-white hover:bg-gray-400`
  }
  return baseClassName
}

export default function SideNavLinks() {
  // Get the current pathname from the router, so we can highlight the current link
  const pathname = usePathname()
  return (
    <>
      {links.map(link => {
        return (
          <Link key={link.name} href={link.href} className={getLinkClassName(pathname, link.href)}>
            <p className="hidden md:block">{link.name}</p>
          </Link>
        )
      })}
    </>
  )
}
