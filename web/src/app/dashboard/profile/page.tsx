import EditProfileForm from '@/components/profile/profile-form'
import { Profile } from '@/examples/types/types'
import { ApiStatus } from '@/services/apiclient'
import { SubmitResultType } from '@/types.d'
import { apiPost } from '@/utils/api-client'
import React from 'react'

type userRead = {
  userRead: Profile
}

export default async function Page() {
  const userData = await apiPost('/jsonql', {
    userRead: {},
  })

  if (userData.status !== ApiStatus.OK) {
    return { text: 'Error logging in', type: SubmitResultType.error }
  }

  const { userRead } = userData.result as userRead

  const user = userRead

  return (
    <div className="w-full">
      <h1 className="mb-4 text-2xl">Profile</h1>
      <EditProfileForm user={user} />
    </div>
  )
}
