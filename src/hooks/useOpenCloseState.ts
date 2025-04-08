import { useState, useCallback } from 'react'

export const useOpenCloseState = (isOpenByDefault = false) => {
  const [isOpen, setIsOpen] = useState(isOpenByDefault)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((currentState) => !currentState), [])

  return {
    isOpen,
    open,
    close,
    toggle,
  }
}
