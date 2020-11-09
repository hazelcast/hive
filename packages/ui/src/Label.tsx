import React, { FC, ReactElement } from 'react'
import cn from 'classnames'

import styles from './Label.module.scss'

export type LabelProps = {
  id: string
  label: string | ReactElement
  className?: string
}

export const Label: FC<LabelProps> = ({ id, label, className }) => (
  <label htmlFor={id} className={cn(styles.label, className)}>
    {label}
  </label>
)
