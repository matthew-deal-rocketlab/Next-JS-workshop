import React from 'react'
import LoginForm from '@/components/auth/login-form'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <>
      <LoginForm />
      <p>Email: user@nextmail.com</p>
      <p>Password: 123456</p>
    </>
  )
}
