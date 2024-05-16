'use client' // Error components must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <section className="w-full md:col-span-4 ">
      <h2 className="mb-4 text-2xl">Recent Revenue</h2>

      <div className="h-[600px] rounded-xl bg-red-300 p-4">
        <p className="mt-0 items-end gap-2 rounded-md bg-red-100 p-4 text-red-500">
          {error.message}
        </p>

        <h3 className="py-20 text-center text-4xl font-bold text-red-500">ERROR</h3>

        <button className="mt-28 rounded-xl bg-red-500 p-3 text-red-50" onClick={reset}>
          Reload data
        </button>
      </div>
    </section>
  )
}
