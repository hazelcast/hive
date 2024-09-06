import React, { ReactElement, ReactNode, useContext } from 'react'
import cn from 'classnames'
import { Icon as FeatherIcon } from 'react-feather'

import { Icon } from '../../Icon'
import { Tooltip } from '../../Tooltip'
import { Button, ButtonColor } from '../../Button'
import { appSidebarContext } from '../appSidebarContext'
import { AppSidebarFavoriteButton } from '../AppSidebarFavoriteButton'
import { appSidebarSectionContext } from '../AppSidebarSection/appSidebarSectionContext'

import styles from './AppSidebarItem.module.scss'
import { DataTestProp } from '@hazelcast/helpers'

const Component = ({ children }: { children: ReactNode }) => <>{children}</>

export type AppSidebarItemProps = {
  id?: string
  title: string
  className?: string
  active?: boolean
  color?: ButtonColor
  onClick?: () => void
  available?: boolean
  adornment?: ReactNode
  wrapper?: (props: { children: ReactElement | string }) => ReactElement
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
  'data-test': dataTest,
  wrapper: Wrapper = Component,
}: AppSidebarItemProps) => {
  const { isOpen } = useContext(appSidebarContext)
  const ctx = useContext(appSidebarSectionContext)

  return (
    <div className={cn(styles.root, { [styles.collapsed]: !isOpen, [styles.nested]: !!ctx })} data-test={dataTest}>
      {id && ctx && <AppSidebarFavoriteButton id={id} className={styles.favorite} />}
      <Wrapper>
        <Button
          variant="text"
          color={color}
          active={active}
          truncate={false}
          onClick={onClick}
          disabled={disabled as boolean}
          disabledTooltip={disabledTooltip}
          bodyClassName={styles.content}
          className={cn(styles.button, { [styles.active]: active }, className)}
        >
          <>
            {icon && (
              <Tooltip arrow={false} placement="right-start" color="dark" visible={isOpen ? false : undefined} content={iconAriaLabel}>
                {(ref) => <Icon ref={ref} size="medium" icon={icon} ariaLabel={iconAriaLabel} className={styles.icon} />}
              </Tooltip>
            )}
            {title}
            {(adornment || available !== undefined) && (
              <div className={styles.adornment}>
                {adornment}
                {available !== undefined && <span className={cn(styles.status, { [styles.available]: available })} />}
              </div>
            )}
          </>
        </Button>
      </Wrapper>
    </div>
  )
}
