import React, { useMemo } from 'react'
import { Copy } from 'react-feather'

import { ContextMenuItem, ContextMenu as OriginalContextMenu } from '../../../../ContextMenu'

import styles from './ContextMenu.module.scss'

export interface ContextMenuProps {
  anchorElement: HTMLElement | null
  onCopy: () => void
}

export const ContextMenu = ({ anchorElement, onCopy }: ContextMenuProps) => {
  const items = useMemo<ContextMenuItem[]>(
    () => [
      {
        content: (
          <>
            Copy <Copy />
          </>
        ),
        className: styles.item,
        onClick: onCopy,
      },
    ],
    [onCopy],
  )
  return <OriginalContextMenu anchorElement={anchorElement} items={items} />
}
