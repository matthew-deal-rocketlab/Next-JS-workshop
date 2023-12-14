'use client'

import { useRouter } from 'next/navigation'
import { type FormEvent } from 'react'
import { cookieStoreRemove } from '@/services/cookie-store'
import { type Collapsed } from './dashboard/sideNav/sidenav'
import SvgIcon from './svg-icon/svgIcon'
import { KEY_JWT_TOKEN, KEY_REFRESH_TOKEN } from '@/constants'

export default function SignOut({ isCollapsed }: Collapsed) {
  const router = useRouter()

  const signOutIcon =
    'M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z'

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    cookieStoreRemove(KEY_REFRESH_TOKEN)
    cookieStoreRemove(KEY_JWT_TOKEN)
    router.push('/')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gray-100
    ">
      <button
        className={`relative flex h-[30px] w-full items-center  ${
          isCollapsed ? 'justify-center' : ''
        } overflow-hidden`}>
        <div className="absolute left-1">
          <SvgIcon pathData={signOutIcon} className="h-4 w-4" alt="signout" />
        </div>

        <span
          className={`absolute bottom-0 left-10 top-0 flex items-center text-xs transition-opacity duration-300 ease-in-out ${
            isCollapsed ? 'opacity-0' : 'opacity-100'
          } whitespace-nowrap`}>
          Sign Out
        </span>
      </button>
    </form>
  )
}
