import React, { FC } from 'react'

import styles from './NumberBadge.module.scss'
import cn from 'classnames'

export type NumberBadgeProps = {
  number: number
  className?: string
}

export const NumberBadge: FC<NumberBadgeProps> = ({ number, className }) => {
  const formattedNumber: string = number <= 99 ? number.toString() : '+99'

  return (
    <div data-test="number-badge" className={cn(styles.numberBadge, className)}>
      {formattedNumber}
    </div>
  )
}
