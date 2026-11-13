import React, { ReactNode, useContext } from 'react'
import cn from 'classnames'
import { Icon as FeatherIcon } from 'react-feather'

import { DataTestProp } from '../../../helpers/types'
import { Icon } from '../../Icon'
import { Tooltip } from '../../Tooltip'
import { Button } from '../../Button'
import { appSidebarContext } from '../appSidebarContext'
import { AppSidebarFavoriteButton } from '../AppSidebarFavoriteButton'
import { appSidebarSectionContext } from '../AppSidebarSection/appSidebarSectionContext'

import styles from './AppSidebarItem.module.css'

export type AppSidebarItemProps = {
  id?: string
  title: string
  className?: string
  active?: boolean
  color?: 'default' | 'danger'
  expanded?: boolean
  onClick?: () => void
  available?: boolean
  adornment?: ReactNode
  adornmentClassName?: string
  'aria-label'?: string
} & DataTestProp &
  ({ disabled?: never; disabledTooltip?: never } | { disabled: boolean; disabledTooltip: string }) &
  ({ icon?: never; iconAriaLabel?: never } | { icon: FeatherIcon; iconAriaLabel: string })

export const AppSidebarItem = ({
  id,
  title,
  className,
  active,
  color = 'default',
  expanded,
  icon,
  iconAriaLabel,
  disabled,
  disabledTooltip,
  onClick,
  adornment,
  available,
  adornmentClassName,
  'aria-label': ariaLabel,
  'data-test': dataTest,
}: AppSidebarItemProps) => {
  const { isOpen, variant } = useContext(appSidebarContext)
  const ctx = useContext(appSidebarSectionContext)

  return (
    <Tooltip arrow={false} side="right" align="start" color="dark" open={isOpen ? false : undefined} content={iconAriaLabel}>
      <div
        className={cn(styles.root, { [styles.collapsed]: !isOpen, [styles.nested]: !!ctx, [styles.modern]: variant === 'modern' })}
        data-test={dataTest}
      >
        {id && ctx && variant !== 'modern' && <AppSidebarFavoriteButton id={id} className={styles.favorite} />}
        <Button
          variant="ghost"
          color="secondary"
          active={active}
          aria-expanded={expanded}
          aria-label={variant === 'modern' ? (ariaLabel ?? title) : undefined}
          truncate={false}
          onClick={onClick}
          outline="inset"
          disabled={disabled as boolean}
          disabledTooltip={disabledTooltip}
          bodyClassName={styles.content}
          data-test="sidebar-menu-item-title"
          className={cn(styles.button, { [styles.active]: active, [styles.danger]: color === 'danger' }, className)}
        >
          <>
            {icon && <Icon size="medium" icon={icon} ariaLabel={iconAriaLabel} className={styles.icon} />}
            {title}
            {(adornment || available !== undefined) && (
              <div className={cn(styles.adornment, adornmentClassName)}>
                {adornment}
                {available !== undefined && <span className={cn(styles.status, { [styles.available]: available })} />}
              </div>
            )}
          </>
        </Button>
        {id && ctx && variant === 'modern' && <AppSidebarFavoriteButton id={id} className={styles.favorite} />}
      </div>
    </Tooltip>
  )
}
