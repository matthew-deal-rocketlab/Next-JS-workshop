import React from 'react'
import Link from 'next/link'

// Custom 404 page, this will be displayed when a user tries to access a page that does not exist

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h2>Custom 404 Page</h2>
      <p>Could not find requested resource</p>

      <Link
        href="/dashboard"
        className={[
          'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-500 p-3 text-sm font-medium text-white',
          'hover:bg-gray-400 md:flex-none md:justify-start md:p-2 md:px-3',
        ].join(' ')}>
        <p className="hidden md:block">Return to Dashboard</p>
      </Link>
    </div>
  )
}
