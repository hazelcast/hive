import React, { FC } from 'react'
import { TableBodyProps } from 'react-table'

import styles from './Body.module.scss'

export const Body: FC<TableBodyProps> = (props) => (
  <tbody className={styles.tbody} {...props} />
)
