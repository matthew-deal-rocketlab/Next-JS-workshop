'use client'

import { Button } from '@/components/button'
import { isEmail } from '@/utils/validators'
import { type SubmitResult, SubmitResultType, type IAlertMessage } from '@/types.d'
import { KEY_JWT_TOKEN, KEY_REFRESH_TOKEN, apiPost } from '@/utils/api-client'
import { ApiStatus } from '@/services/apiclient'
import { localStringSet } from '@/utils/local-store'
import { sleep } from '@/utils/sleep'
import { useRouter } from 'next/navigation'
import React from 'react'
import Link from 'next/link'

interface FormFields {
  email: string
  pass: string
}

const initialFormFields: FormFields = {
  email: '',
  pass: '',
}

// Checks the form inputs.  Returns null for no errors or object with error messages for each field
const validateInputs = (inputs: FormFields): FormFields | null => {
  let hasErrors = false
  const result = { ...initialFormFields }
  console.log('inputs', inputs)
  // check email
  if (!inputs.email) {
    hasErrors = true
    result.email = 'Email can not be empty'
  } else if (!isEmail(inputs.email)) {
    hasErrors = true
    result.email = 'Invalid Email'
  }

  // Check password
  if (!inputs.pass) {
    hasErrors = true
    result.pass = 'Password can not be empty'
  } else if (inputs.pass.length < 6) {
    hasErrors = true
    result.pass = 'Password must be at least 6 characters'
  }

  return hasErrors ? result : null
}

const submitLoginFormData = async (data: FormFields): Promise<SubmitResult> => {
  // Clear login tokens
  await localStringSet(KEY_REFRESH_TOKEN, '')
  await localStringSet(KEY_JWT_TOKEN, '')

  const payload = { authLogin: { ...data } }
  const loginResult = await apiPost('/jsonql', payload)
  if (loginResult.status !== ApiStatus.OK) {
    return { text: 'Error logging in', type: SubmitResultType.error }
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const authLogin = loginResult.result.authLogin

  if (!(authLogin.token && authLogin.token.length > 20)) {
    return { text: `${authLogin}`, type: SubmitResultType.error }
  }

  // Save login token
  await localStringSet(KEY_REFRESH_TOKEN, authLogin.refreshToken)
  await localStringSet(KEY_JWT_TOKEN, authLogin.token)

  return {
    text: 'Welcome! You will be redirected to the dashboard shortly',
    type: SubmitResultType.ok,
  }
}

export default function LoginForm() {
  const { push } = useRouter()
  const [formErrors, setFormErrors] = React.useState(initialFormFields)
  const [alert, setAlert] = React.useState<IAlertMessage>({
    message: '',
    type: 'success',
  })

  const onClickLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormErrors(initialFormFields)
    setAlert({ message: '', type: 'success' })
    const formData = Object.fromEntries(new FormData(event.currentTarget)) as unknown as FormFields

    const formErrorMessages = validateInputs(formData)
    if (formErrorMessages !== null) {
      setFormErrors(formErrorMessages)
      return
    }

    const result = await submitLoginFormData(formData)
    if (result.type === SubmitResultType.error) {
      setAlert({ message: result.text, type: 'error' })
      return
    }
    setAlert({ message: result.text, type: 'success' })
    await sleep(2000)
    push('/dashboard')
  }

  const onAlertClose = () => {
    setAlert({ message: '', type: 'success' })
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={onClickLogin} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">Please log in to continue.</h1>
        <div className="w-full">
          <div>
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
              />
              {formErrors.email && <p className="mt-1 text-xs text-red-500">{formErrors.email}</p>}
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="pass"
                placeholder="Enter password"
                minLength={6}
              />
              {formErrors.pass && <p className="mt-1 text-xs text-red-500">{formErrors.pass}</p>}
            </div>
          </div>
        </div>
        <LoginButton />
        <div className="flex h-4 items-end space-x-1">
          {/* Add form errors here */}
          {alert.message && (
            <>
              <p aria-live="polite" className="text-sm text-red-500">
                {alert.message}
              </p>
            </>
          )}
        </div>
        <p className="mb-1 text-center text-xs">
          Don't have an account?{' '}
          <Link className="text-blue-500" href="/auth/signup">
            Signup
          </Link>
        </p>
        <p className="mb-1 mt-3 text-center text-xs">
          Forgot your password?{' '}
          <Link className="text-blue-500" href="/auth/forgot-password">
            Reset Password
          </Link>
        </p>
      </div>
    </form>
  )
}

function LoginButton() {
  return (
    <div className="flex justify-center">
      <Button className="mt-4 w-full max-w-[300px]">Log in</Button>
    </div>
  )
}
