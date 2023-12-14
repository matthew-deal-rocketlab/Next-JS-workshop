'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type Collapsed } from './sidenav'

import SvgIcon from '@/components/svg-icon/svgIcon'
import { cog, fileInvoice, gauge, tableColumns, alert } from '@/components/svg-paths'

// Map of links to display in the side navigation.
const links = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    iconPath: tableColumns,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    iconPath: cog,
  },
  {
    name: 'Examples',
    href: '/example',
    iconPath: gauge,
  },
  {
    name: 'Invoices',
    href: '/example/invoices',
    iconPath: fileInvoice,
  },
  {
    name: 'Custome 404 Page',
    href: '/example/customers',
    iconPath: alert,
  },
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
        <Link key={link.name} href={link.href} className={getLinkClassName(pathname, link.href)}>
          <div
            className={`relative flex h-[48px] w-full items-center ${
              isCollapsed ? 'justify-center' : ''
            } overflow-hidden`}>
            <div className="absolute left-1">
              <SvgIcon pathData={link.iconPath} className="h-4 w-4" alt={link.name} />
            </div>

            <span
              className={`absolute bottom-0 left-10 top-0 flex items-center text-xs transition-opacity duration-300 ease-in-out ${
                isCollapsed ? 'opacity-0' : 'opacity-100'
              } whitespace-nowrap`}>
              {link.name}
            </span>
          </div>
        </Link>
      ))}
    </>
  )
}
