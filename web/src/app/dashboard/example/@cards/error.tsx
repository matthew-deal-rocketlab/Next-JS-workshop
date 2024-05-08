'use client' // Error components must be Client Components

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex w-full flex-col gap-5">
      {' '}
      {/* Adjusted class to create a grid with 4 columns */}
      <div className="rounded-xl bg-red-400 p-2 shadow-sm">
        <div className="flex p-4">
          <h3 className="ml-2 text-lg font-medium text-red-50">Error!</h3>
        </div>
        <p className="truncate rounded-xl bg-red-50 py-2 text-center text-2xl"> {error.message}</p>
        <button
          className="text-balck mt-5 w-[200px] rounded-xl bg-red-200 px-4 py-2"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }>
          Reload data
        </button>
      </div>
    </div>
  )
}
