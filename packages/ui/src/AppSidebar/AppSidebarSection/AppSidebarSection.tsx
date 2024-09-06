import React, { ReactNode, useContext } from 'react'
import cn from 'classnames'

import { appSidebarContext } from '../appSidebarContext'
import { AppSidebarSectionExpandable, AppSidebarSectionExpandableProps } from './AppSidebarSectionExpandable'

import styles from './AppSidebarSection.module.scss'

export type AppSidebarSectionProps = {
  title: string
  children: ReactNode
} & ({ id?: never; active?: never; icon?: never; ariaLabel?: never } | AppSidebarSectionExpandableProps)

export const AppSidebarSection = ({ id, icon, active, title, children, ariaLabel }: AppSidebarSectionProps) => {
  const { isOpen } = useContext(appSidebarContext)

  if (id) {
    return (
      <AppSidebarSectionExpandable id={id} icon={icon} title={title} active={active} ariaLabel={ariaLabel}>
        {children}
      </AppSidebarSectionExpandable>
    )
  }

  return (
    <section className={cn(styles.root, { [styles.collapsed]: !isOpen })}>
      <h3>{title}</h3>
      {children}
    </section>
  )
}
