'use client'

import React from 'react'
import Input from '../input'
import { type SubmitResult, SubmitResultType, type IAlertMessage } from '@/types.d'
import { apiPost } from '@/utils/api-client'
import { ApiStatus } from '@/services/apiclient'
import { isEmail } from '@/utils/validators'
import { useRouter } from 'next/navigation'
import { Button } from '../button'
import Link from 'next/link'
import Alert from '../alert'

interface FormFields {
  email: string
}

const initialFormFields: FormFields = {
  email: '',
}

// Checks the form inputs.  Returns null for no errors or object with error messages for each field
const validateInputs = (inputs: FormFields): FormFields | null => {
  let hasErrors = false
  const result = { ...initialFormFields }
  // check email
  if (!inputs.email) {
    hasErrors = true
    result.email = 'Email can not be empty'
  } else if (!isEmail(inputs.email)) {
    hasErrors = true
    result.email = 'Invalid Email'
  }
  return hasErrors ? result : null
}

const submitFormData = async (data: FormFields): Promise<SubmitResult> => {
  const obscureMessage =
    'If your address exists in our system, an email will be sent with further instructions'
  const payload = { authForgotPassword: { ...data } }
  const forgotPasswordResult = await apiPost('/jsonql', payload)

  if (forgotPasswordResult.status !== ApiStatus.OK) {
    return { text: 'Error forgot password', type: SubmitResultType.error }
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const authForgotPassword = forgotPasswordResult.result.authForgotPassword

  if (!(authForgotPassword.result && authForgotPassword.result === 'ok')) {
    // This is when email does not exists or error, for security we always return a success type message
    return { text: `${obscureMessage}`, type: SubmitResultType.success }
  }

  return {
    text: obscureMessage,
    type: SubmitResultType.success,
  }
}

export default function ForgotPassword() {
  const { push } = useRouter()
  const [formErrors, setFormErrors] = React.useState(initialFormFields)
  const [alert, setAlert] = React.useState<IAlertMessage>({
    message: '',
    type: 'success',
  })

  const onClickReset = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormErrors(initialFormFields)
    setAlert({ message: '', type: 'success' })

    const formData = Object.fromEntries(new FormData(event.currentTarget)) as unknown as FormFields

    const formErrorMessages = validateInputs(formData)
    if (formErrorMessages !== null) {
      setFormErrors(formErrorMessages)
      return
    }

    try {
      const result = await submitFormData(formData)
      if (result.type === SubmitResultType.error) {
        setAlert({ message: result.text, type: 'error' })
        return
      }
      setAlert({ message: result.text, type: 'success' })
    } catch (error) {
      // Handle error
      console.error(error)
    }
  }
  const onAlertClose = () => {
    setAlert({ message: '', type: 'success' })
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={onClickReset} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">Reset your password</h1>
        <div className="w-full">
          <Input
            id="email"
            type="email"
            name="email"
            label="Email"
            placeholder="Enter your email address"
            formErrors={formErrors.email}
          />
        </div>
        <ResetButton />
        {alert.message && <Alert classes="mt-3" type={alert.type} message={alert.message} />}
        <p className="mb-1 mt-4 text-center text-xs">
          Remember your password?{' '}
          <Link className="text-blue-500" href="/auth/login">
            Login
          </Link>
        </p>
      </div>
    </form>
  )
}

function ResetButton() {
  return (
    <div className="flex justify-center">
      <Button className="mt-4 w-full max-w-[300px]">Reset Password</Button>
    </div>
  )
}
