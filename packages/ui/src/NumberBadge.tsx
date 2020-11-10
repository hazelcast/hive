import React, { FC } from 'react'

import styles from './NumberBadge.module.scss'

export type NumberBadgeProps = {
  number: number
}

export const NumberBadge: FC<NumberBadgeProps> = ({ number }) => {
  const formattedNumber: string = number <= 99 ? number.toString() : '+99'

  return (
    <div data-test="number-badge" className={styles.numberBadge}>
      {formattedNumber}
    </div>
  )
}
