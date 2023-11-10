'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { cn } from '@/examples/utils/cn';

// Map of links to display in the side navigation.
const links = [
  { name: 'Home', href: '/example' },
  { name: 'Invoices', href: '/example/invoices' },
  { name: 'Custome 404 Page', href: '/example/customers' },
] as const;

export default function ExampleSideNavLinks() {
  // Get the current pathname from the router, so we can highlight the current link
  const pathname = usePathname();
  return (
    <>
      {links.map(link => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gray-100 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-gray-400 text-white hover:bg-gray-400':
                  pathname === link.href,
              },
            )}>
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
