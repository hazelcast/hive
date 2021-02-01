import { KeyboardEvent as ReactKeyboardEvent } from 'react'

// 'Esc' -> IE/Edge specific value
export const escKeyFilterPredicate = (event: KeyboardEvent) => event.key === 'Escape' || event.key === 'Esc'

export const keyIsOneOf = <T>(event: ReactKeyboardEvent<T>, ...keys: string[]): boolean => keys.includes(event.key)
