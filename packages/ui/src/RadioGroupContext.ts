import React, { ChangeEvent } from 'react'

export const RadioGroupContext = React.createContext<{
  name: string
  errorId?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}>({ name: '' })
