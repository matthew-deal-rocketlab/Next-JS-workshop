'use client'

import { AuthProvider } from '@/context/auth'

export default function AuthenticationProvider({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}
