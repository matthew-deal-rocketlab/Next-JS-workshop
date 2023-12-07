'use client'
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { KEY_JWT_TOKEN, KEY_REFRESH_TOKEN } from '@/constants'
import { checkTokenStillValid } from '@/utils/check-token'
import { refreshTokenHelper } from '@/utils/refreshToken'

type AuthProviderProps = {
  children: ReactNode
}

type AuthContextType = {
  isAuthenticated: boolean | null
  setTokens: (jwtToken: string, refreshToken: string) => void
  clearTokens: () => void
  refreshToken: () => Promise<void>
}

/*
 * AuthContext is used to provide authentication status to the app.
 * It also provides methods to set and clear tokens.
 * It also checks the token validity on mount and refreshes it if needed.
 * It is used by the useAuth hook.
 */

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  const refreshToken = useCallback(refreshTokenHelper, [])

  useEffect(() => {
    const jwtToken = localStorage.getItem(KEY_JWT_TOKEN)
    const refreshTokenValue = localStorage.getItem(KEY_REFRESH_TOKEN)

    const authStatus = !!jwtToken && !!refreshTokenValue
    setAuthenticated(authStatus)

    if (!authStatus && !pathname.startsWith('/auth')) {
      router.push('/auth/login')

      if (!jwtToken || !refreshTokenValue) {
        router.push('/auth/login')
      }

      if (jwtToken && refreshTokenValue && !checkTokenStillValid(jwtToken)) {
        refreshToken().catch(err => {
          console.error('Error refreshing token: ', err)
        })
      }
    }
    setIsLoading(false)
  }, [router, pathname, refreshToken])

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
