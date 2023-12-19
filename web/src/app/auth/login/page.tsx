'use client'

import { Button } from '@/components/button/button'
import { isEmail } from '@/utils/validators'
import { type SubmitResult, SubmitResultType, type IAlertMessage } from '@/types.d'
import { apiPost } from '@/utils/api-client'
import { ApiStatus } from '@/services/apiclient'
import { sleep } from '@/utils/sleep'
import { useRouter } from 'next/navigation'
import React from 'react'
import Link from 'next/link'
import Alert from '@/components/alert/alert'
import Input from '@/components/input/input'
import { cookieStoreSet, cookieStoreRemove } from '@/services/cookie-store'
import { KEY_JWT_TOKEN, KEY_REFRESH_TOKEN } from '@/constants'

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
  cookieStoreRemove(KEY_REFRESH_TOKEN)
  cookieStoreRemove(KEY_JWT_TOKEN)

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
  await cookieStoreSet(KEY_REFRESH_TOKEN, authLogin.refreshToken)
  await cookieStoreSet(KEY_JWT_TOKEN, authLogin.token)

  return {
    text: 'Welcome! You will be redirected to the dashboard shortly',
    type: SubmitResultType.success,
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
          <Input
            id="email"
            type="email"
            name="email"
            label="Email"
            placeholder="Enter your email address"
            formErrors={formErrors.email}
          />
          <div className="mt-4">
            <Input
              id="password"
              type="password"
              name="pass"
              label="Password *"
              placeholder="Enter password"
              formErrors={formErrors.pass}
            />
          </div>
        </div>
        <LoginButton />
        {alert.message && (
          <Alert
            classes="my-3"
            type={alert.type}
            title={alert.type === 'success' ? 'Success' : 'Error'}
            message={alert.message}
          />
        )}
        <p className="mb-1 mt-4 text-center text-xs">
          Don't have an account?{' '}
          <Link className="text-blue-500" href="/auth/signup" role="link">
            Signup
          </Link>
        </p>
        <p className="mb-1 mt-3 text-center text-xs">
          Forgot your password?{' '}
          <Link className="text-blue-500" href="/auth/forgot-password" role="link">
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
