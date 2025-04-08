import React, { ReactNode } from 'react'
import cls from 'classnames'
import { DataTestProp } from '../../../src'

import { EnvironmentBadge } from './EnvironmentBadge'
import { AppHeaderMenu, AppHeaderMenuProps } from './AppHeaderMenu'
import { AppHeaderLogo, AppHeaderLogoProps } from './AppHeaderLogo'
import { SelectCluster, SelectClusterProps } from './SelectCluster'

import styles from './AppHeader.module.scss'

export interface AppHeaderProps extends DataTestProp {
  name: ReactNode
  className?: string
  children?: ReactNode
  asideContent?: ReactNode
  environment?: 'production'
  logoProps: AppHeaderLogoProps
  clusterSelectProps?: SelectClusterProps
  menuContent?: AppHeaderMenuProps['children']
}

export const AppHeader = ({
  name,
  className,
  children,
  environment,
  clusterSelectProps,
  logoProps,
  menuContent,
  asideContent,
  'data-test': dataTest = 'app-header',
}: AppHeaderProps) => (
  <header data-test={dataTest} className={cls(styles.root, className)}>
    <AppHeaderLogo {...logoProps} />
    <span className={styles.name}>{name}</span>
    {clusterSelectProps && <SelectCluster {...clusterSelectProps} />}
    {children}
    {environment && <EnvironmentBadge environment={environment} />}
    <div className={styles.aside}>
      {asideContent}
      {menuContent && <AppHeaderMenu separator={!!asideContent}>{menuContent}</AppHeaderMenu>}
    </div>
  </header>
)
