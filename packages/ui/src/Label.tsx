import React, { FC, ReactElement } from 'react'
import cn from 'classnames'

import styles from './Label.module.scss'

export type LabelProps = {
  id: string
  label: string | ReactElement
  className?: string
  variant?: 'primary' | 'secondary'
}

export const Label: FC<LabelProps> = ({ id, label, className, variant = 'primary' }) => (
  <label htmlFor={id} className={cn(styles.label, styles[variant], className)}>
    {label}
  </label>
)
