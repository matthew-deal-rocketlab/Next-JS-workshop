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
  clearTokens: () => void
  refreshToken: () => Promise<boolean | undefined>
}

/*
 * AuthContext is used to provide authentication status to the app.
 * It also provides methods to set and clear tokens.
 * It also checks the token validity on mount and refreshes it if needed.
 * It is used by the useAuth hook.
 */

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()
  const pathname = usePathname()

  const refreshToken = useCallback(refreshTokenHelper, [])

  useEffect(() => {
    const jwtToken = localStorage.getItem(KEY_JWT_TOKEN)
    const refreshTokenValue = localStorage.getItem(KEY_REFRESH_TOKEN)
    if (!jwtToken || !refreshTokenValue) {
      router.push('/auth/login')
    }
    const authStatus = !!jwtToken && !!refreshTokenValue
    setAuthenticated(authStatus)

    if (!authStatus && !pathname.startsWith('/auth')) {
      router.push('/auth/login')

      if (jwtToken && refreshTokenValue && !checkTokenStillValid(jwtToken)) {
        refreshToken().catch(err => {
          console.error('Error refreshing token: ', err)
        })
      }
    }
    setIsLoading(false)
  }, [router, pathname, refreshToken])

  const clearTokens = () => {
    localStorage.removeItem(KEY_JWT_TOKEN)
    localStorage.removeItem(KEY_REFRESH_TOKEN)
    setAuthenticated(false)
  }

  if (isLoading) {
    return null
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, clearTokens, refreshToken }}>
      {isAuthenticated && children}
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
