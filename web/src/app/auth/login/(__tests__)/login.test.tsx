import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Login from '../page'
import { useRouter } from 'next/navigation'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('LoginForm Component', () => {
  beforeEach(() => {
    // Mock the router functions you use in the component
    ;(useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    })
  })

  it('accepts valid email and password input', () => {
    render(<Login />)
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText(/pass/i), { target: { value: 'validpassword' } })

    expect(screen.getByRole('button', { name: /log in/i })).toBeEnabled()
  })

  it('shows an error message for invalid email input', async () => {
    render(<Login />)

    // Simulate entering an invalid email address
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: '' } })
    fireEvent.change(screen.getByLabelText(/pass/i), { target: { value: 'validpassword' } })

    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: /log in/i }))

    // Use findByText to wait for and find the error message
    const emailErrorMessage = await screen.findByText(/Email can not be empty/i)
    expect(emailErrorMessage).toBeInTheDocument()
  })
})
it('shows an error message for invalid password input', async () => {
  render(<Login />)

  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@mail.com' } })
  fireEvent.change(screen.getByLabelText(/pass/i), { target: { value: '' } })

  fireEvent.click(screen.getByRole('button', { name: /log in/i }))

  const passwordErrorMessage = await screen.findByText(/Password can not be empty/i)
  expect(passwordErrorMessage).toBeInTheDocument()
})
