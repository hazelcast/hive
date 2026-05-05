import React, { forwardRef, HTMLAttributes, ReactNode } from 'react'
import cn from 'classnames'

import { DataTestProp } from '../helpers/types'

import styles from './ButtonGroup.module.css'

export type ButtonGroupProps = {
  children: ReactNode
  ariaLabel?: string
} & DataTestProp &
  Omit<HTMLAttributes<HTMLDivElement>, 'aria-label'>

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ children, className, ariaLabel, 'data-test': dataTest = 'button-group', ...rest }, ref) => (
    <div ref={ref} role="group" aria-label={ariaLabel} data-test={dataTest} className={cn(styles.group, className)} {...rest}>
      {children}
    </div>
  ),
)

ButtonGroup.displayName = 'ButtonGroup'
