import React, { FC } from 'react'
import cn from 'classnames'

import styles from './Error.module.scss'
import { TruncatedText } from './TruncatedText'

export const errorId = (inputId: string): string => `${inputId}-error`

interface ErrorProps {
  error?: string
  className?: string
  inputId: string
  truncated?: boolean
}

/* https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_alert_role */
export const Error: FC<ErrorProps> = ({ error, className, inputId, truncated }) => (
  <div className={cn(styles.container, error && styles.hasError, className)} role="alert" id={errorId(inputId)}>
    {truncated ? <TruncatedText text={error || ''} /> : error}
  </div>
)
