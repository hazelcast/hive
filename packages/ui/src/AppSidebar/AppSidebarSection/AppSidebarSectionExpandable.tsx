import React, { ReactNode, useContext, useEffect } from 'react'
import cn from 'classnames'
import { ChevronDown, ChevronUp, Icon as FeatherIcon } from 'react-feather'
import createPersistedState from 'use-persisted-state'

import { useRefValue } from '../../hooks'
import { Icon, IconProps } from '../../Icon'
import { AppSidebarItem } from '../AppSidebarItem'
import { appSidebarContext } from '../appSidebarContext'
import { appSidebarSectionContext } from './appSidebarSectionContext'

import styles from './AppSidebarSection.module.scss'

export interface AppSidebarSectionExpandableProps {
  id: string
  title: string
  active: boolean
  icon: FeatherIcon
  ariaLabel: string
  children: ReactNode
}

const kebabCase = (str: string) => str.toLowerCase().split(' ').join('-')

export const AppSidebarSectionExpandable = ({ id, active, icon, title, ariaLabel, children }: AppSidebarSectionExpandableProps) => {
  const { isOpen, open: openSidebar } = useContext(appSidebarContext)
  const usePersistedMenuStorageState = createPersistedState<boolean>(`isOpen::${title}`)

  const [open, setOpen] = usePersistedMenuStorageState(false)
  const getIsActive = useRefValue(active)
  const getSetOpen = useRefValue(setOpen)

  const chevronButtonProps: IconProps = open
    ? { icon: ChevronUp, ariaLabel: 'Section Open' }
    : { icon: ChevronDown, ariaLabel: 'Section Closed' }
  const isSectionOpen = open && isOpen

  const handleClick = () => {
    if (!isOpen) {
      openSidebar()
      setOpen(true)
    } else {
      setOpen(!open)
    }
  }

  useEffect(() => {
    const cb = getSetOpen()

    if (getIsActive() && cb) {
      setTimeout(() => cb(true))
    }
  }, [getIsActive, getSetOpen])

  return (
    <section data-test={`sidebar-menu-section-${kebabCase(id)}`}>
      <AppSidebarItem
        title={title}
        aria-label={ariaLabel}
        icon={icon}
        iconAriaLabel={title}
        onClick={handleClick}
        active={active}
        className={styles.toggle}
        adornment={<Icon data-test="sidebar-menu-section-chevron" size="medium" containerClassName={styles.icon} {...chevronButtonProps} />}
        data-test="sidebar-menu-section-title"
      />
      {/* detect whether an item is in an expandable section or not. */}
      <appSidebarSectionContext.Provider value={{}}>
        <div
          className={cn(styles.content, {
            [styles.transitionEnter]: isSectionOpen,
            [styles.transitionLeave]: !isSectionOpen,
          })}
        >
          {children}
        </div>
      </appSidebarSectionContext.Provider>
    </section>
  )
}
