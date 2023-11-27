'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type Collapsed } from './sidenav'

import Image from 'next/image'

// Map of links to display in the side navigation.
const links = [
  { name: 'Dashboard', href: '/dashboard', iconSrc: '/table-columns-solid.svg' },
  { name: 'Settings', href: '/dashboard/settings', iconSrc: '/gear-solid.svg' },
  { name: 'Custom 404 example', href: '/example', iconSrc: '/triangle-exclamation-solid.svg' },
]

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
        <Link key={link.name} href={link.href} className={getLinkClassName(pathname, link.href)}>
          <div
            className={`flex h-[48px] items-center ${
              isCollapsed ? 'justify-center' : 'justify-start'
            }`}>
            {/* Render the icon only if the sidebar is not collapsed */}
            {!isCollapsed && link.iconSrc && null}
            <span className="inline">
              {isCollapsed ? (
                <Image
                  src={link.iconSrc}
                  className="white h-6"
                  alt={`${link.name} icon`}
                  width={50}
                  height={50}
                />
              ) : (
                link.name
              )}
            </span>
          </div>
        </Link>
      ))}
    </>
  )
}
