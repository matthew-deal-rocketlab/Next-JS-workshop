import React from 'react'

interface InputProps {
  id: string
  label?: string
  name: string
  type: string
  placeholder?: string
  value?: string
  formErrors?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = (props: InputProps) => {
  const { id, label, name, type, placeholder, formErrors, onChange } = props
  return (
    <div>
      {label && (
        <label className="mb-2 mt-5 block text-xs font-medium text-gray-900" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
        />
        {formErrors && <p className="mt-1 text-xs text-red-500">{formErrors}</p>}
      </div>
    </div>
  )
}

export default Input
