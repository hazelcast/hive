import React, { ReactNode, useContext } from 'react'
import cn from 'classnames'
import { Icon as FeatherIcon } from 'react-feather'
import { DataTestProp } from '../../../../src'

import { Icon } from '../../Icon'
import { Tooltip } from '../../Tooltip'
import { Button, ButtonColor } from '../../Button'
import { appSidebarContext } from '../appSidebarContext'
import { AppSidebarFavoriteButton } from '../AppSidebarFavoriteButton'
import { appSidebarSectionContext } from '../AppSidebarSection/appSidebarSectionContext'

import styles from './AppSidebarItem.module.scss'

export type AppSidebarItemProps = {
  id?: string
  title: string
  className?: string
  active?: boolean
  color?: ButtonColor
  onClick?: () => void
  available?: boolean
  adornment?: ReactNode
  adornmentClassName?: string
} & DataTestProp &
  ({ disabled?: never; disabledTooltip?: never } | { disabled: boolean; disabledTooltip: string }) &
  ({ icon?: never; iconAriaLabel?: never } | { icon: FeatherIcon; iconAriaLabel: string })

export const AppSidebarItem = ({
  id,
  title,
  className,
  active,
  icon,
  iconAriaLabel,
  disabled,
  disabledTooltip,
  onClick,
  color = 'light',
  adornment,
  available,
  adornmentClassName,
  'data-test': dataTest,
}: AppSidebarItemProps) => {
  const { isOpen } = useContext(appSidebarContext)
  const ctx = useContext(appSidebarSectionContext)

  return (
    <Tooltip arrow={false} placement="right-start" color="dark" visible={isOpen ? false : undefined} content={iconAriaLabel}>
      {(ref) => (
        <div ref={ref} className={cn(styles.root, { [styles.collapsed]: !isOpen, [styles.nested]: !!ctx })} data-test={dataTest}>
          {id && ctx && <AppSidebarFavoriteButton id={id} className={styles.favorite} />}
          <Button
            variant="text"
            color={color}
            active={active}
            truncate={false}
            onClick={onClick}
            outline="inset"
            disabled={disabled as boolean}
            disabledTooltip={disabledTooltip}
            bodyClassName={styles.content}
            data-test="sidebar-menu-item-title"
            className={cn(styles.button, { [styles.active]: active }, className)}
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
        </div>
      )}
    </Tooltip>
  )
}
