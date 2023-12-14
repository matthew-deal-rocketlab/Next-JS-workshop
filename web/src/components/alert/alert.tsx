import React, { type FC } from 'react'

const AlertTypes = {
  success: 'border-green-500 bg-green-100 text-green-700',
  warning: 'border-yellow-500 bg-yellow-100 text-yellow-700',
  info: 'border-blue-500 bg-blue-100 text-blue-700',
  error: 'border-red-500 bg-red-100 text-red-700',
} as const

type AlertType = keyof typeof AlertTypes

const Alert: FC<{
  type: AlertType
  message: string
  classes?: string
  title: string
}> = ({ type, message, classes, title }) => {
  const alertClasses = `border-l-4 px-4 py-3 ${AlertTypes[type]} ${classes || ''}`

  return (
    <div className={alertClasses} role="alert">
      <p className="font-bold">{title}</p>
      <p className="text-xs">{message}</p>
    </div>
  )
}

export default Alert
