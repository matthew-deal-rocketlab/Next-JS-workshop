'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { type FormEvent } from 'react'
import { cookieStoreRemove } from '@/services/cookie-store'
import { KEY_REFRESH_TOKEN, KEY_JWT_TOKEN } from '@/utils/api-client'
import { type Collapsed } from './dashboard/sideNav/sidenav'
import Image from 'next/image'

export default function SignOut({ isCollapsed }: Collapsed) {
  const router = useRouter()

  const signOutIcon = '/arrow-right-from-bracket-solid.svg'

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    cookieStoreRemove(KEY_REFRESH_TOKEN)
    cookieStoreRemove(KEY_JWT_TOKEN)
    router.push('/')
  }

  return (
    <form
      onSubmit={e => {
        handleSubmit(e)
      }}
      className="mt-auto w-full">
      <button className="flex h-[48px] w-full items-center justify-center gap-2 rounded-md bg-gray-100 p-3 text-sm font-medium text-black hover:bg-gray-300 hover:text-gray-600">
        <span className="inline">
          {isCollapsed ? (
            <Image
              src={signOutIcon}
              className="h-6 w-6"
              alt="Sign Out icon"
              width={50}
              height={50}
            />
          ) : (
            'Sign Out'
          )}
        </span>
      </button>
    </form>
  )
}
