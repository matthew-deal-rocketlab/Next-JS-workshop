'use server'

import { cookies } from 'next/headers'

export const cookieStoreGet = async (key: string) => {
  // return localStorage.getItem(key)
  const cookieStore = cookies()
  const token = cookieStore.get(key)
  return token?.value === '' ? undefined : token?.value
}

export const cookieStoreSet = (key: string, value: string) => {
  // localStorage.setItem(key, value)
  cookies().set(key, value, {
    httpOnly: true, // Secure the cookie from client-side scripts
    sameSite: 'lax', // CSRF protection
    path: '/', // Cookie will be accessible on all pages
    // Add other options like 'secure' or 'expires' as needed
  })
}

export const cookieStoreRemove = (key: string) => {
  // localStorage.removeItem(key)
  cookies().delete(key)
}

export const cookieStoreClear = async () => {
  // localStorage.clear()
}
