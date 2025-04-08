import React from 'react'
import { Box } from 'react-feather'

import { Icon } from '../../Icon'

import styles from './EnvironmentBadge.module.scss'

export interface EnvironmentBadgeProps {
  environment: string
}

export const EnvironmentBadge = ({ environment }: EnvironmentBadgeProps) => {
  return (
    <span className={styles.root} data-test="environment-badge">
      <Icon icon={Box} />
      {environment}
    </span>
  )
}
