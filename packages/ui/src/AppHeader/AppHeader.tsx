import React, { ReactNode } from 'react'
import cls from 'classnames'

import { EnvironmentBadge } from './EnvironmentBadge'
import { AppHeaderMenu, AppHeaderMenuProps } from './AppHeaderMenu'
import { AppHeaderLogo, AppHeaderLogoProps } from './AppHeaderLogo'
import { SelectCluster, SelectClusterProps } from './SelectCluster'

import styles from './AppHeader.module.scss'

export interface AppHeaderProps {
  name: ReactNode
  className?: string
  environment?: 'production'
  logoProps: AppHeaderLogoProps
  clusterSelectProps?: SelectClusterProps
  menuContent?: AppHeaderMenuProps['children']
}

export const AppHeader = ({ name, className, environment, clusterSelectProps, logoProps, menuContent }: AppHeaderProps) => (
  <header className={cls(styles.root, className)}>
    <AppHeaderLogo {...logoProps} />
    <span className={styles.name}>{name}</span>
    {clusterSelectProps && <SelectCluster {...clusterSelectProps} />}
    {environment && <EnvironmentBadge environment={environment} />}
    <div className={styles.aside}>{menuContent && <AppHeaderMenu>{menuContent}</AppHeaderMenu>}</div>
  </header>
)
