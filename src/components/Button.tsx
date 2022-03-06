import { FC } from 'react'

interface Props {
  onClick: () => void
  disabled?: boolean
}

export const Button: FC<Props> = ({ children, disabled, onClick }) => {
  return (
    <button
      className="border border-blue-700 rounded px-4 py-2 bg-blue-500 text-white hover:bg-blue-400 focus:ring focus:ring-blue-200 disabled:bg-blue-200"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
