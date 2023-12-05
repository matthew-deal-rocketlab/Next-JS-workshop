'use client'
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { API_BASE_URL, API_STATIC_KEY, KEY_JWT_TOKEN, KEY_REFRESH_TOKEN } from '@/constants'
import { ApiStatus, jsonPost } from '@/services/apiclient'

type AuthProviderProps = {
  children: ReactNode
}

type AuthContextType = {
  isAuthenticated: boolean | null
  setTokens: (jwtToken: string, refreshToken: string) => void
  clearTokens: () => void
  refreshToken: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()
  const pathname = usePathname()

  const refreshToken = async () => {
    const currentRefreshToken = localStorage.getItem(KEY_REFRESH_TOKEN)
    if (!currentRefreshToken) return

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-api-key': API_STATIC_KEY,
    }

    const payload = { authRefresh: { refreshToken: currentRefreshToken } }
    const apiResponse = await jsonPost(`${API_BASE_URL}/jsonql`, {
      headers,
      body: JSON.stringify(payload),
    })

    if (apiResponse.status !== ApiStatus.OK || apiResponse.result === null) return ''

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const authRefreshResult = apiResponse.result.authRefresh
    if (typeof authRefreshResult === 'object' && authRefreshResult.token) {
      localStorage.setItem(KEY_JWT_TOKEN, authRefreshResult.token)

      if (authRefreshResult.refreshToken !== currentRefreshToken) {
        localStorage.setItem(KEY_REFRESH_TOKEN, authRefreshResult.refreshToken)
      }

      return authRefreshResult.token
    }

    return ''
  }

  useEffect(() => {
    const jwtToken = localStorage.getItem(KEY_JWT_TOKEN)
    const refreshToken = localStorage.getItem(KEY_REFRESH_TOKEN)
    const authStatus = !!jwtToken && !!refreshToken
    setAuthenticated(authStatus)

    console.log('refreshToken', refreshToken)
    console.log('jwtToken', jwtToken)
    console.log('authStatus', authStatus)

    if (!authStatus && !pathname.startsWith('/auth')) {
      router.push('/auth/login')
    }
    setIsLoading(false)
  }, [router, pathname])

  const setTokens = (jwtToken: string, refreshToken: string) => {
    localStorage.setItem(KEY_JWT_TOKEN, jwtToken)
    localStorage.setItem(KEY_REFRESH_TOKEN, refreshToken)
    setAuthenticated(true)
  }

  const clearTokens = () => {
    localStorage.removeItem(KEY_JWT_TOKEN)
    localStorage.removeItem(KEY_REFRESH_TOKEN)
    setAuthenticated(false)
  }

  if (isLoading) {
    return null
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setTokens, clearTokens, refreshToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthProvider
