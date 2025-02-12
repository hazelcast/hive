import React, { FC } from 'react'
import cn from 'classnames'
import { DataTestProp } from '@hazelcast/helpers'

import { TruncatedText } from './TruncatedText'
import { TooltipProps } from './Tooltip'

import styles from './Error.module.scss'

export const errorId = (inputId: string): string => `${inputId}-error`

interface ErrorProps extends DataTestProp {
  error?: string
  className?: string
  inputId: string
  truncated?: boolean
  tooltipPlacement?: TooltipProps['placement']
}

/* https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_alert_role */
export const Error: FC<ErrorProps> = ({ error, className, inputId, truncated, tooltipPlacement, 'data-test': dataTest = 'error' }) => (
  <div role="alert" id={errorId(inputId)} data-test={dataTest} className={cn(styles.container, error && styles.hasError, className)}>
    {truncated ? <TruncatedText text={error || ''} tooltipPlacement={tooltipPlacement} hoverAbleTooltip={false} /> : error}
  </div>
)
