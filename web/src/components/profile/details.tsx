import Link from 'next/link'
import { Button } from '@/components/button/button'
import Input from '@/components/input/input'
import Alert from '@/components/alert/alert'
import { ProfileState, ResponseMessage } from './profile-form'

import { Profile } from '@/examples/types/types'

type DetailsProps = {
  handleSubmitUser: (event: React.FormEvent<HTMLFormElement>) => void
  formErrors: ProfileState
  user: Profile
  detailsResponseMessage: ResponseMessage | null
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Details({
  handleSubmitUser,
  formErrors,
  user,
  detailsResponseMessage,
  handleChange,
}: DetailsProps) {
  const alertTitle = detailsResponseMessage?.type === 'success' ? 'Success' : 'Error'

  return (
    <form onSubmit={handleSubmitUser} method="POST">
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <Input
            id="firstname"
            label="First name"
            name="firstname"
            type="text"
            value={user.firstname}
            onChange={handleChange}
            placeholder="First name"
            required
            formErrors={formErrors.errors?.firstname?.[0]}
          />
        </div>
        <div className="mb-4">
          <Input
            id="lastname"
            label="Last Name"
            name="lastname"
            type="text"
            value={user.lastname}
            onChange={handleChange}
            placeholder="Last name"
            required
            formErrors={formErrors.errors?.lastname?.[0]}
          />
        </div>
        <div className="mb-4">
          <Input
            id="email"
            label="Email"
            name="email"
            type="text"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
            required
            formErrors={formErrors.errors?.email?.[0]}
          />
        </div>
      </div>
      {detailsResponseMessage && (
        <div className="py-5">
          <Alert
            message={detailsResponseMessage.content}
            type={detailsResponseMessage.type}
            title={alertTitle}
          />
        </div>
      )}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
          Cancel
        </Link>
        <Button type="submit">Update User Details</Button>
      </div>
    </form>
  )
}
