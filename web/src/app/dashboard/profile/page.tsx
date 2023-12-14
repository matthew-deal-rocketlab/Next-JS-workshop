import EditProfileForm from '@/components/profile/profile-form'
import { ApiStatus } from '@/services/apiclient'
import { SubmitResultType } from '@/types.d'
import { apiPost } from '@/utils/api-client'
import React from 'react'

const fetchUserPagesData = async () => {
  const userData = await apiPost('/jsonql', {
    userRead: {},
  })

  if (userData.status !== ApiStatus.OK) {
    return { text: 'Error logging in', type: SubmitResultType.error }
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { userRead } = userData.result

  return userRead
}

export default async function Page() {
  const user = await fetchUserPagesData()

  return (
    <div className="w-full">
      <h1 className="mb-4 text-2xl">Profile</h1>
      <EditProfileForm user={user} />
    </div>
  )
}
