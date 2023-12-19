'use client'

import { Profile } from '@/examples/types/types'

import { useEffect, useState } from 'react'
import { apiPost } from '@/utils/api-client'
import { ApiStatus } from '@/services/apiclient'
import { z } from 'zod'
import PasswordForm from './password'
import Details from './details'

export type ProfileState = {
  errors?: {
    firstname?: string[]
    lastname?: string[]
    email?: string[]
    oldPassword?: string[]
    password?: string[]
    passwordConfirm?: string[]
  }
  message?: string | null
}

type ResponseMessageType = 'success' | 'error'

export type ResponseMessage = {
  type: ResponseMessageType
  content: string
}

const detailsSchema = z.object({
  firstname: z.string().min(1, 'First name is required'),
  lastname: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email'),
})

export const passwordSchema = z
  .object({
    oldPassword: z.string(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    passwordConfirm: z.string(),
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ['passwordConfirm'],
  })
type PasswordFormFields = z.infer<typeof passwordSchema> & { uid: string }

export default function EditProfileForm({ user }: { user: Profile }) {
  const [formErrors, setFormErrors] = useState<ProfileState>({})
  const [detailsResponseMessage, setDetailsResponseMessage] = useState<ResponseMessage | null>(null)
  const [passwordResponseMessage, setPasswordResponseMessage] = useState<ResponseMessage | null>(
    null,
  )
  const [localFormData, setLocalFormData] = useState({
    password: '',
    passwordConfirm: '',
  })
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false)

  const handleSubmitUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.currentTarget))
    formData.uid = user.uid

    const validationResults = detailsSchema.safeParse(formData)

    if (!validationResults.success) {
      setFormErrors({ errors: validationResults.error.flatten().fieldErrors })
      return
    }

    const response = await apiPost('/jsonql', { updateUser: formData })
    if (response.status === ApiStatus.OK) {
      setDetailsResponseMessage({ type: 'success', content: 'Profile updated successfully' })
    } else {
      setDetailsResponseMessage({ type: 'error', content: 'Error updating profile' })
    }
  }

  const handleSubmitPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.currentTarget)) as PasswordFormFields
    formData.uid = user.uid

    const validationResults = passwordSchema.safeParse(formData)

    if (!validationResults.success) {
      setFormErrors({ errors: validationResults.error.flatten().fieldErrors })
      return
    }

    const response = await apiPost('/jsonql', { updatePassword: formData })
    if (response.status !== ApiStatus.OK) return
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { updatePassword } = response.result
    const type = updatePassword === 'invalid credentials' ? 'error' : 'success'
    const message =
      updatePassword === 'invalid credentials'
        ? 'Old password is incorrect'
        : 'Password updated successfully'
    setPasswordResponseMessage({
      type: type,
      content: message,
    })
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasAttemptedSubmit) return
    const { name, value } = event.target
    setLocalFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setHasAttemptedSubmit(true)
    handleSubmitPassword(event)
  }

  const validateField = (fieldName: string, value: string) => {
    // Validation for a single field
    const result = detailsSchema.pick({ [fieldName]: true }).safeParse({ [fieldName]: value })

    if (result.success) {
      // If the field is valid, remove its error from formErrors
      setFormErrors(prev => ({
        ...prev,
        errors: { ...prev.errors, [fieldName]: undefined },
      }))
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Call validateField for the changed field
    validateField(event.target.name, event.target.value)
  }

  // Use useEffect to clear errors when user data changes
  useEffect(() => {
    setFormErrors({})
  }, [user])

  useEffect(() => {
    if (hasAttemptedSubmit) {
      // Validate only if the user has interacted with the form
      const validationResults = passwordSchema.safeParse(localFormData)
      if (!validationResults.success) {
        setFormErrors({ errors: validationResults.error.flatten().fieldErrors })
      } else {
        // Clear the password errors if the validation is successful
        setFormErrors(prev => ({
          ...prev,
          errors: { ...prev.errors, password: undefined, passwordConfirm: undefined },
        }))
      }
    }
  }, [localFormData, passwordSchema, setFormErrors, hasAttemptedSubmit])

  return (
    <div className="flex flex-col ">
      <Details
        formErrors={formErrors}
        handleSubmitUser={handleSubmitUser}
        user={user}
        detailsResponseMessage={detailsResponseMessage}
        handleChange={handleChange}
      />
      <PasswordForm
        formErrors={formErrors}
        handleFormSubmit={handleFormSubmit}
        passwordResponseMessage={passwordResponseMessage}
        handlePasswordChange={handlePasswordChange}
      />
    </div>
  )
}
