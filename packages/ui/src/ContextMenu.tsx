import React, { ReactNode, useCallback, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import cls from 'classnames'
import useIsomorphicLayoutEffect from 'react-use/lib/useIsomorphicLayoutEffect'

import { useRefValue } from './hooks'

import styles from './ContextMenu.module.scss'

export interface ContextMenuItem {
  onClick: () => void
  content: ReactNode
  className?: string
}

export interface ContextMenuProps {
  items: ContextMenuItem[]
  anchorElement: HTMLElement | null
  offset?: { top?: number; left?: number }
}

export const ContextMenu = ({ anchorElement, offset, items }: ContextMenuProps) => {
  const rootEl = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null)

  const getOffset = useRefValue(offset)

  const handleContextMenuOpen = useCallback(
    (e: MouseEvent) => {
      if (!anchorElement || (!anchorElement.contains(e.target as Node) && e.target !== anchorElement)) {
        //handleContextMenuClose()
        return
      }
      e.preventDefault()

      const currentOffset = getOffset()
      const width = rootEl.current?.offsetWidth ?? 0
      const height = rootEl.current?.offsetHeight ?? 0
      let left = e.pageX + (currentOffset?.left ?? 0)
      let top = e.pageY + (currentOffset?.top ?? 0)

      if (left + width > window.scrollX + document.documentElement.clientWidth) {
        left = window.scrollX + document.documentElement.clientWidth - width
      }
      if (top + height > window.scrollY + document.documentElement.clientHeight) {
        top = window.scrollY + document.documentElement.clientHeight - height
      }

      setCoords({ top, left })
    },
    [setCoords, getOffset, anchorElement],
  )
  const handleContextMenuClose = useCallback(() => {
    setCoords(null)
  }, [setCoords])

  useIsomorphicLayoutEffect(() => {
    if (anchorElement) {
      document.body.addEventListener('contextmenu', handleContextMenuOpen, false)
    }
    return () => {
      document.body.removeEventListener('contextmenu', handleContextMenuOpen)
    }
  }, [handleContextMenuOpen])
  useIsomorphicLayoutEffect(() => {
    if (coords) {
      document.body.addEventListener('click', handleContextMenuClose, false)
    }

    return () => {
      document.body.removeEventListener('click', handleContextMenuClose)
    }
  }, [coords, handleContextMenuClose])
  useIsomorphicLayoutEffect(() => {
    if (coords) {
      window.addEventListener('resize', handleContextMenuClose)
      window.addEventListener('orientationchange', handleContextMenuClose)
    }

    return () => {
      window.removeEventListener('resize', handleContextMenuClose)
      window.removeEventListener('orientationchange', handleContextMenuClose)
    }
  }, [coords, handleContextMenuClose])

  return createPortal(
    <div ref={rootEl} style={coords || undefined} className={cls(styles.root, { [styles.hidden]: !coords })}>
      {items.map(({ onClick, content, className }, index) => (
        <button key={index} className={cls(styles.item, className)} onClick={onClick}>
          {content}
        </button>
      ))}
    </div>,
    document.body,
  )
}
