import React, { ReactNode, useState } from 'react'
import { Menu as MenuIcon } from 'react-feather'
import cn from 'classnames'

import { Button } from '../../Button'
import { Popover } from '../../Popover'
import { useOpenCloseState } from '../../hooks'

import styles from './AppHeaderMenu.module.scss'

export interface AppHeaderMenuProps {
  separator?: boolean
  children: (props: { onClose: () => void }) => ReactNode
}

export const AppHeaderMenu = ({ separator, children }: AppHeaderMenuProps) => {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>()
  const { isOpen, toggle, close } = useOpenCloseState()

  return (
    <div className={cn(styles.root, { [styles.separator]: separator })}>
      <Button
        variant="text"
        color="light"
        iconSize="medium"
        onClick={toggle}
        capitalize={false}
        iconRight={MenuIcon}
        ref={setAnchorElement}
        data-test="app-header-menu-toggle"
        iconRightAriaLabel="menu icon"
        className={styles.toggleButton}
      >
        Menu
      </Button>
      <Popover open={isOpen} anchorElement={anchorElement} onClose={close} className={styles.content}>
        {children({ onClose: close })}
      </Popover>
    </div>
  )
}
