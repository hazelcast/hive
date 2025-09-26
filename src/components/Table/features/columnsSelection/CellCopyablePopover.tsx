import React, { PropsWithChildren, useEffect } from 'react'
import cls from 'classnames'

import { Popover } from '../../../Popover'

import styles from './CellCopyablePopover.module.scss'

export interface CellCopyablePopover {
  isOpen: boolean
  onClose: () => void
  contentClassName?: string
  anchorElement?: HTMLElement | null
}

export const CellCopyablePopover = ({
  children,
  contentClassName,
  anchorElement,
  isOpen,
  onClose,
}: PropsWithChildren<CellCopyablePopover>) => {
  useEffect(() => {
    return () => onClose()
  }, [onClose])

  return (
    <Popover
      open={isOpen}
      onClose={onClose}
      anchorElement={anchorElement}
      placement="top-start"
      className={styles.root}
      data-test="cell-copyable-popover"
      offset={{ mainAxis: -(anchorElement?.offsetHeight ?? 0) }}
    >
      <div
        className={cls(styles.content, contentClassName)}
        onDoubleClick={onClose}
        style={{ minHeight: anchorElement?.offsetHeight, minWidth: anchorElement?.offsetWidth }}
      >
        {children}
      </div>
    </Popover>
  )
}
