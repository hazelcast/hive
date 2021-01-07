import { KeyboardEvent as ReactKeyboardEvent } from 'react'

// 'Esc' -> IE/Edge specific value
export const escKeyFilterPredicate = (event: KeyboardEvent) => event.key === 'Escape' || event.key === 'Esc'

export const enterOrSpaceFilterPredicate = <T>(event: ReactKeyboardEvent<T>) => event.key === 'Enter' || event.key === ' '
