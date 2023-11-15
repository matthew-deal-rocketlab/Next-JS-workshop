import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex items-center justify-center overflow-y-auto md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[600px] flex-col space-y-2.5 p-4">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">Your Logo Here</div>
        </div>
        {children}
      </div>
    </main>
  )
}
