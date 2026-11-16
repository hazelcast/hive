import React, { ReactNode } from 'react'
import { Menu } from 'react-feather'
import cls from 'classnames'

import compactLogo from '../../assets/images/hazelcast-compact.png'
import darkWordmark from '../../assets/images/hazelcast-wordmark-dark-theme.png'
import lightWordmark from '../../assets/images/hazelcast-wordmark-light-theme.png'
import { Icon } from '../Icon'
import styles from './TopNavigation.module.css'

export interface TopNavigationProps {
  logo?: ReactNode
  mobileLogo?: ReactNode
  name?: ReactNode
  navigation?: ReactNode
  children?: ReactNode
  actions?: ReactNode
  layout?: 'grouped' | 'spaced'
  mobile?: boolean
  navigationClassName?: string
  actionsClassName?: string
  mobileMenu?: {
    onClick: () => void
    label: string
    expanded?: boolean
    controls?: string
  }
  className?: string
  'data-test'?: string
}

const DefaultDesktopLogo = () => (
  <a href="/" className={styles.defaultDesktopLogo} aria-label="Hazelcast home">
    <img className={styles.defaultLightWordmark} src={lightWordmark} alt="" />
    <img className={styles.defaultDarkWordmark} src={darkWordmark} alt="" />
  </a>
)

const DefaultMobileLogo = () => (
  <a href="/" className={styles.defaultMobileLogo} aria-label="Hazelcast home">
    <img src={compactLogo} alt="" />
  </a>
)

export const TopNavigation = ({
  logo,
  mobileLogo,
  name,
  navigation,
  children,
  actions,
  layout = 'spaced',
  mobile = false,
  navigationClassName,
  actionsClassName,
  mobileMenu,
  className,
  'data-test': dataTest = 'top-navigation',
}: TopNavigationProps) => {
  const defaultLogo = <DefaultDesktopLogo />
  const selectedLogo = logo ?? defaultLogo
  const selectedMobileLogo = mobileLogo ?? (logo ? selectedLogo : <DefaultMobileLogo />)

  return (
    <header className={cls(styles.root, styles[layout], { [styles.mobile]: mobile }, className)} data-test={dataTest}>
      <div className={styles.leading}>
        {mobile && mobileMenu && (
          <button
            type="button"
            className={styles.mobileMenu}
            aria-label={mobileMenu.label}
            title={mobileMenu.label}
            aria-expanded={mobileMenu.expanded}
            aria-controls={mobileMenu.controls}
            onClick={mobileMenu.onClick}
          >
            <Icon icon={Menu} size="small" ariaHidden />
          </button>
        )}
        <div className={styles.brand}>
          <div>{mobile ? selectedMobileLogo : selectedLogo}</div>
          {!mobile && name && <div className={styles.name}>{name}</div>}
        </div>
        {navigation && <div className={cls(styles.navigation, navigationClassName)}>{navigation}</div>}
        {children}
      </div>
      {actions && <div className={cls(styles.actions, actionsClassName)}>{actions}</div>}
    </header>
  )
}
