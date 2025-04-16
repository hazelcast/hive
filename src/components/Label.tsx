import React, { FC, ReactElement } from 'react'
import cn from 'classnames'
import { DataTestProp } from '../../src'

import styles from './Label.module.scss'

export type LabelProps = {
  id: string
  label: string | ReactElement
  className?: string
  variant?: 'primary' | 'secondary'
} & DataTestProp

export const Label: FC<LabelProps> = ({ id, label, className, variant = 'primary', 'data-test': dataTest = 'label' }) => (
  <label data-test={dataTest} htmlFor={id} className={cn(styles.label, styles[variant], className)}>
    {label}
  </label>
)
