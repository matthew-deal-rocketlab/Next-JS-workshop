'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type Collapsed } from './sidenav'

import SvgIcon from '@/components/svgIcon'

// Map of links to display in the side navigation.
const links = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    iconPath:
      'M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm64 64V416H224V160H64zm384 0H288V416H448V160z',
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    iconPath:
      'M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z',
  },
  {
    name: 'Custom 404 example',
    href: '/example',
    iconPath:
      'M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z',
  },
] as const

// svg icon paths

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
            {/* Position the icon absolutely to the left */}
            <div className="absolute left-1">
              <SvgIcon pathData={link.iconPath} className="h-5 w-5" alt={link.name} />
            </div>
            {/* The text will slide in and out as the sidebar width changes */}
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
