import React from 'react'

function Layout({
  children,
  cards,
  invoices,
  revenue,
}: {
  children: React.ReactNode
  cards: React.ReactNode
  invoices: React.ReactNode
  revenue: React.ReactNode
}) {
  return (
    <main className="flex flex-col">
      <h1 className="mb-4 text-2xl">Example Dashboard</h1>
      <section>{cards}</section>
      <section className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {invoices}
        {revenue}
        {children}
      </section>
    </main>
  )
}

export default Layout
