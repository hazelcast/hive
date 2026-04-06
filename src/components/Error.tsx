import React, { FC } from 'react'
import cn from 'classnames'

import { DataTestProp } from '../helpers/types'
import { TruncatedText } from './TruncatedText'
import { TooltipPlacement } from './Tooltip'

import styles from './Error.module.scss'

export const errorId = (inputId: string): string => `${inputId}-error`

interface ErrorProps extends DataTestProp {
  error?: string
  className?: string
  inputId: string
  truncated?: boolean
  tooltipPlacement?: TooltipPlacement
}

/* https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_alert_role */
export const Error: FC<ErrorProps> = ({ error, className, inputId, truncated, tooltipPlacement, 'data-test': dataTest = 'error' }) => (
  <div role="alert" id={errorId(inputId)} data-test={dataTest} className={cn(styles.container, error && styles.hasError, className)}>
    {truncated ? <TruncatedText text={error || ''} tooltipPlacement={tooltipPlacement} /> : error}
  </div>
)
