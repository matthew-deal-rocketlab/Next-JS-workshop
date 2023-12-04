'use server'

import { redirect } from 'next/navigation'
import React from 'react'
import { isTokenValid } from './check-token'
import { KEY_REFRESH_TOKEN } from '@/constants'

interface ComponentProps {
  // Add specific prop types here
}

// Define the type for the Component parameter.
export const requireAuth = <P extends ComponentProps>(Component: React.ComponentType<P>) => {
  return async function RequireAuthHOC(props: P) {
    // Get authenticated user
    const accessToken = await isTokenValid(KEY_REFRESH_TOKEN)

    // Redirect if not signed in
    if (!accessToken) {
      redirect('/auth/login')
    }

    // Render component now that we have user
    return <Component {...props} />
  }
}
