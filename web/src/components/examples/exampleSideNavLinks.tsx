'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Map of links to display in the side navigation.
const links = [
  { name: 'Home', href: '/example' },
  { name: 'Invoices', href: '/example/invoices' },
  { name: 'Custome 404 Page', href: '/example/customers' },
] as const

export default function ExampleSideNavLinks() {
  // Get the current pathname from the router, so we can highlight the current link
  const pathname = usePathname()
  return (
    <>
      {links.map(link => {
        // Conditional classes based on whether the link is active
        const linkClasses = `flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gray-100 md:flex-none md:justify-start md:p-2 md:px-3 ${
          pathname === link.href ? 'bg-gray-400 text-white hover:bg-gray-400' : ''
        }`

        return (
          <Link key={link.name} href={link.href} className={linkClasses}>
            <p className="hidden md:block">{link.name}</p>
          </Link>
        )
      })}
    </>
  )
}
