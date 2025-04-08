import React, { ReactNode } from 'react'
import cn from 'classnames'

import styles from './AppSidebarMenuItemCounter.module.scss'

export interface AppSidebarMenuItemCounterProps {
  children: ReactNode
  className?: string
}

export const AppSidebarMenuItemCounter = ({ children, className }: AppSidebarMenuItemCounterProps) => (
  <span className={cn(styles.root, className)}>
    <span className={styles.content}>{children}</span>
  </span>
)
