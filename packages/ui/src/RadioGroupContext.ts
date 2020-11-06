import React, { ChangeEvent } from 'react'

export const RadioGroupContext = React.createContext<{
  name: string
  error?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}>({ name: '' })
