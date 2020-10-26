import React, { FC } from 'react'

import styles from './Body.module.scss'

export const Body: FC = (props) => (
  <tbody className={styles.tbody} {...props} />
)
