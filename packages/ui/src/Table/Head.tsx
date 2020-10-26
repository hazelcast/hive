import React, { FC } from 'react'

import styles from './Head.module.scss'

export const Head: FC = (props) => (
  <thead className={styles.thead} {...props} />
)
