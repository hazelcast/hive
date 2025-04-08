import React, { ReactNode, useContext, useEffect, useRef } from 'react'
import cn from 'classnames'
import { ChevronDown, ChevronUp, Icon as FeatherIcon } from 'react-feather'
import { DataTestProp } from '../../../../src'

import { useRefValue, createPersistedState } from '../../../hooks'
import { Icon, IconProps } from '../../Icon'
import { AppSidebarItem } from '../AppSidebarItem'
import { appSidebarContext } from '../appSidebarContext'
import { appSidebarSectionContext } from './appSidebarSectionContext'

import styles from './AppSidebarSection.module.scss'

export type AppSidebarSectionExpandableProps = {
  id: string
  title: string
  active: boolean
  icon: FeatherIcon
  ariaLabel: string
  children: ReactNode
} & DataTestProp

const kebabCase = (str: string) => str.toLowerCase().split(' ').join('-')

export const AppSidebarSectionExpandable = ({
  id,
  active,
  icon,
  title,
  ariaLabel,
  children,
  'data-test': dataTest = 'sidebar-menu-section-title',
}: AppSidebarSectionExpandableProps) => {
  const rootEl = useRef<HTMLElement>(null)
  const clicked = useRef(false)
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
      clicked.current = true
    } else {
      setOpen(!open)
      clicked.current = false
    }
  }
  const handleTransitionEnd = () => {
    if (isOpen && active && rootEl.current && clicked.current) {
      rootEl.current.scrollIntoView()
      clicked.current = false
    }
  }

  useEffect(() => {
    const cb = getSetOpen()

    if (getIsActive() && cb) {
      setTimeout(() => cb(true))
    }
  }, [getIsActive, getSetOpen])

  return (
    <section ref={rootEl} data-test={`sidebar-menu-section-${kebabCase(id)}`}>
      <AppSidebarItem
        title={title}
        aria-label={ariaLabel}
        icon={icon}
        iconAriaLabel={title}
        onClick={handleClick}
        active={active}
        className={styles.toggle}
        adornmentClassName={styles.adornment}
        adornment={<Icon data-test="sidebar-menu-section-chevron" size="medium" containerClassName={styles.icon} {...chevronButtonProps} />}
        data-test={dataTest}
      />
      {/* detect whether an item is in an expandable section or not. */}
      <appSidebarSectionContext.Provider value={{}}>
        <div
          onTransitionEnd={handleTransitionEnd}
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
