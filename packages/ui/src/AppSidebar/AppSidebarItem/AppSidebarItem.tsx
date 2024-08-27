import React, { ReactElement, ReactNode, useContext } from 'react'
import cn from 'classnames'
import { Icon as FeatherIcon } from 'react-feather'

import { Icon } from '../../Icon'
import { Button } from '../../Button'
import { Tooltip } from '../../Tooltip'
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
  onClick?: () => void
  registrable?: boolean
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
  adornment,
  registrable = true,
  'data-test': dataTest,
  wrapper: Wrapper = Component,
}: AppSidebarItemProps) => {
  const { isOpen } = useContext(appSidebarContext)
  const ctx = useContext(appSidebarSectionContext)

  return (
    <div className={cn(styles.root, { [styles.nested]: !!ctx })} data-test={dataTest}>
      {id && <AppSidebarFavoriteButton id={id} title={title} registrable={registrable} className={styles.favorite} />}
      <Wrapper>
        <Button
          variant="text"
          color="light"
          active={active}
          truncate={false}
          onClick={onClick}
          disabled={disabled as boolean}
          disabledTooltip={disabledTooltip}
          bodyClassName={styles.content}
          className={cn(styles.button, { [styles.collapsed]: !isOpen, [styles.active]: active }, className)}
        >
          <>
            {icon && (
              <Tooltip arrow={false} placement="right-start" color="dark" visible={isOpen ? false : undefined} content={iconAriaLabel}>
                {(ref) => <Icon ref={ref} size="medium" icon={icon} ariaLabel={iconAriaLabel} />}
              </Tooltip>
            )}
            {title}
            {adornment && <div className={styles.adornment}>{adornment}</div>}
          </>
        </Button>
      </Wrapper>
    </div>
  )
}
