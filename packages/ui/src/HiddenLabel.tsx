import React, { FC, ReactElement } from 'react'

import styles from './HiddenLabel.module.scss'

export type LabelProps = {
  id: string
  label: string | ReactElement
}

export const HiddenLabel: FC<LabelProps> = ({ id, label }) => (
  <label htmlFor={id} className={styles.label}>
    {label}
  </label>
)
