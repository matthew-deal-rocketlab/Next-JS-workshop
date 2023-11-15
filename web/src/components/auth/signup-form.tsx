'use client'

import React, { useState } from 'react'
import { type SubmitResult, SubmitResultType } from '@/types.d'
import { useRouter } from 'next/navigation'
import { apiPost } from '@/utils/api-client'
import { ApiStatus } from '@/services/apiclient'
import { isEmail } from '@/utils/validators'
import { Button } from '@/components/button'
import Input from '../input'
import Link from 'next/link'

interface FormFields {
  email: string
  pass: string
  firstname: string
  lastname: string
  confirmPass: string
}

const initialFormFields: FormFields = {
  email: '',
  pass: '',
  firstname: '',
  lastname: '',
  confirmPass: '',
}

interface ColoredSpanProps {
  type: SubmitResultType
  children: string
}

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
  // check username
  if (!inputs.firstname) {
    hasErrors = true
    result.firstname = 'Firstname can not be empty'
  }

  // Check password
  if (!inputs.pass) {
    hasErrors = true
    result.pass = 'Password can not be empty'
  } else if (inputs.pass.length < 8) {
    console.log('Password', result.pass.length)
    hasErrors = true
    result.pass = 'Password must be at least 8 characters'
  }
  // Check confirm password
  if (!inputs.confirmPass) {
    hasErrors = true
    result.confirmPass = 'Confirm password can not be empty'
  } else if (inputs.confirmPass.length < 8) {
    hasErrors = true
    result.confirmPass = 'Confirm password must be at least 8 characters'
  } else if (inputs.confirmPass !== inputs.pass) {
    hasErrors = true
    result.confirmPass = 'Confirm password must match password'
  }

  return hasErrors ? result : null
}

const submitFormData = async (data: FormFields): Promise<SubmitResult> => {
  const payload = { authSignup: { ...data, confirmPass: undefined } }
  const loginResult = await apiPost('/jsonql', payload)

  if (loginResult.status !== ApiStatus.OK) {
    return { text: 'Error logging in', type: SubmitResultType.error }
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const authRefreshResult = loginResult.result.authSignup

  if (!(authRefreshResult.result && authRefreshResult.result.length === 36)) {
    return { text: authRefreshResult, type: SubmitResultType.error }
  }

  return {
    text: 'Welcome! Check your email to continue',
    type: SubmitResultType.ok,
  }
}

export default function LoginForm() {
  const { push } = useRouter()

  const [showContinue, setShowContinue] = useState(false)
  const [submitResult, setSubmitResult] = useState<SubmitResult>({
    text: '',
    type: SubmitResultType.ok,
  })
  const [formErrors, setFormErrors] = useState<FormFields>(initialFormFields)

  const onClickCancel = (event: React.FormEvent<HTMLFormElement>) => {
    push('/login')
  }

  const onClickContinue = (event: React.FormEvent<HTMLFormElement>) => {
    // prevent default form submission
    event.preventDefault()

    push('/login')
  }

  const onClickSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // clear errors when re-submitting
    setFormErrors(initialFormFields)
    setSubmitResult({ text: '', type: SubmitResultType.ok })

    const formData = Object.fromEntries(new FormData(event.currentTarget)) as unknown as FormFields

    const formErrorMessages = validateInputs(formData)
    if (formErrorMessages !== null) {
      setFormErrors(formErrorMessages)
      return
    }
    setFormErrors(initialFormFields)
    try {
      const result = await submitFormData(formData)
      setSubmitResult(result)
      setShowContinue(result.type === SubmitResultType.ok)
    } catch (error) {
      // Handle error
      console.error(error)
    }
  }
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={showContinue ? onClickContinue : onClickSignUp} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">Sign up.</h1>
        <div className="w-full">
          <div className="relative">
            <Input
              id="firstname"
              type="text"
              name="firstname"
              label="First name *"
              placeholder="Enter your first name"
              formErrors={formErrors.firstname}
            />
          </div>
          <div className="mt-4">
            <Input
              id="lastname"
              type="text"
              name="lastname"
              label="Last name"
              placeholder="Enter you last name"
            />
          </div>
          <div className="mt-4">
            <Input
              id="email"
              type="email"
              name="email"
              label="Email"
              placeholder="Enter your email address"
              formErrors={formErrors.email}
            />
          </div>
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
          <div className="mt-4">
            <Input
              id="confirmPass"
              type="password"
              name="confirmPass"
              label="Confirm password *"
              placeholder="Passwords must match"
              formErrors={formErrors.confirmPass}
            />
          </div>
        </div>
        <SignupButton />
        <div className="flex h-4 items-end space-x-1">
          {/* Add form errors here */}
          {submitResult.text && (
            <>
              <p aria-live="polite" className="text-sm text-red-500">
                {submitResult.text}
              </p>
            </>
          )}
        </div>
        <p className="mb-1 text-center text-xs">
          Aleady have an account?{' '}
          <Link className="text-blue-500" href="/auth/login">
            login
          </Link>
        </p>
      </div>
    </form>
  )
}

function SignupButton() {
  return <Button className="mt-4 w-full">Sign up</Button>
}
