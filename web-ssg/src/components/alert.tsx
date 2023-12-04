import { type ColorType } from '@/types'
import React, { type FC } from 'react'

const Alert: FC<{
  type: ColorType
  message: string
  classes?: string
}> = ({ type, message, classes }) => {
  const alertClasses = `border-l-4 px-4 py-3 ${
    type === 'success'
      ? 'border-green-500 bg-green-100 text-green-700'
      : type === 'warning'
      ? 'border-yellow-500 bg-yellow-100 text-yellow-700'
      : type === 'info'
      ? 'border-blue-500 bg-blue-100 text-blue-700'
      : 'border-red-500 bg-red-100 text-red-700'
  }`

  return (
    <div className={`${alertClasses} ${classes}`} role="alert">
      <p className="font-bold">{type}</p>
      <p className="text-xs">{message}</p>
    </div>
  )
}

export default Alert
