import React, { ReactNode, useContext } from 'react'
import cn from 'classnames'
import { DataTestProp } from '../../../../src'

import { appSidebarContext } from '../appSidebarContext'
import { AppSidebarSectionExpandable, AppSidebarSectionExpandableProps } from './AppSidebarSectionExpandable'

import styles from './AppSidebarSection.module.scss'

export type AppSidebarSectionProps = {
  title: string
  children: ReactNode
} & DataTestProp &
  ({ id?: never; active?: never; icon?: never; ariaLabel?: never } | AppSidebarSectionExpandableProps)

export const AppSidebarSection = ({ id, icon, active, title, children, ariaLabel, 'data-test': dataTest }: AppSidebarSectionProps) => {
  const { isOpen } = useContext(appSidebarContext)

  if (id) {
    return (
      <AppSidebarSectionExpandable data-test={dataTest} id={id} icon={icon} title={title} active={active} ariaLabel={ariaLabel}>
        {children}
      </AppSidebarSectionExpandable>
    )
  }

  return (
    <section data-test={dataTest} className={cn(styles.root, { [styles.collapsed]: !isOpen })}>
      <h3>{title}</h3>
      {children}
    </section>
  )
}
