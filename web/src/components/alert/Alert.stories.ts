import type { Meta, StoryObj } from '@storybook/react'
import { type ColorType } from '@/types'

import Alert from './alert'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'UI/Alert',
  component: Alert,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    type: { control: 'select', options: ['success', 'warning', 'info', 'error'] as ColorType[] },
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    type: 'success',
    title: 'Success',
    message: 'Success Alert',
  },
}

export const Error: Story = {
  args: {
    type: 'error',
    title: 'Error',
    message: 'Error Alert',
  },
}

export const Warning: Story = {
  args: {
    type: 'warning',
    title: 'Warning',
    message: 'Error Alert',
  },
}

export const Info: Story = {
  args: {
    type: 'info',
    title: 'Info',
    message: 'Error Alert',
  },
}
