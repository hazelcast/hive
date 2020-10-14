import React, { FC } from 'react'
import cn from 'classnames'

import styles from './Error.module.scss'

export const errorId = (inputId: string): string => `${inputId}-error`

interface ErrorProps {
  error?: string
  className?: string
  inputId: string
}

/* https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_alert_role */
export const Error: FC<ErrorProps> = ({ error, className, inputId }) => (
  <div className={cn(styles.container, error && styles.hasError, className)} role="alert" id={errorId(inputId)}>
    {error}
  </div>
)
