import Link from 'next/link'
import { Button } from '@/components/button/button'
import Input from '@/components/input/input'
import Alert from '@/components/alert/alert'
import { ProfileState, ResponseMessage } from './profile-form'

type PasswordFormFieldsProps = {
  formErrors: ProfileState
  passwordResponseMessage: ResponseMessage | null
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export default function PasswordForm({
  formErrors,
  handleFormSubmit,
  passwordResponseMessage,
  handlePasswordChange,
}: PasswordFormFieldsProps) {
  const alertTitle = passwordResponseMessage?.type === 'success' ? 'Success' : 'Error'

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <Input
            id="password"
            label="Password"
            name="password"
            type="password"
            placeholder="Enter new password"
            onChange={handlePasswordChange}
            formErrors={formErrors.errors?.password?.[0]}
          />
        </div>
        <div className="mb-4">
          <Input
            id="passwordConfirm"
            label="Confirm Password"
            name="passwordConfirm"
            type="password"
            placeholder="Confirm new password"
            onChange={handlePasswordChange}
            formErrors={formErrors.errors?.passwordConfirm?.[0]}
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
          Cancel
        </Link>
        <Button type="submit">Update Password</Button>
      </div>

      <div className="py-5">
        {passwordResponseMessage && (
          <Alert
            message={passwordResponseMessage.content}
            type={passwordResponseMessage.type}
            title={alertTitle}
          />
        )}
      </div>
    </form>
  )
}
