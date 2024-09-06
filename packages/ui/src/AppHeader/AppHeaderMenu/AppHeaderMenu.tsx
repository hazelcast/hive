import React, { ReactNode, useState } from 'react'
import { Menu as MenuIcon } from 'react-feather'

import { Button } from '../../Button'
import { Popover } from '../../Popover'
import { useOpenCloseState } from '../../hooks'

import styles from './AppHeaderMenu.module.scss'

export interface AppHeaderMenuProps {
  children: (props: { onClose: () => void }) => ReactNode
}

export const AppHeaderMenu = ({ children }: AppHeaderMenuProps) => {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>()
  const { isOpen, toggle, close } = useOpenCloseState()

  return (
    <>
      <Button
        variant="text"
        color="light"
        iconSize="medium"
        onClick={toggle}
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
    </>
  )
}
