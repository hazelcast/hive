import React, { PropsWithChildren, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useFloating, Placement, offset, OffsetOptions, shift, size } from '@floating-ui/react'
import cls from 'classnames'
import { autoPlacement as autoPlacementMiddleware } from '@floating-ui/react'

import { getPortalContainer, PortalContainer } from '../utils/portal'
import { DataTestProp } from '../helpers/types'
import { useOnClickOutside, useRefValue } from '../hooks'

import styles from './Popover.module.scss'

export interface PopoverProps extends DataTestProp {
  open: boolean
  placement?: Placement
  offset?: OffsetOptions
  className?: string
  anchorElement?: HTMLElement | null
  onClose: () => void
  matchReferenceSize?: boolean
  container?: PortalContainer
  autoPlacement?: boolean
}

export const Popover = (props: PropsWithChildren<PopoverProps>) => {
  const {
    open,
    children,
    anchorElement,
    placement = 'bottom-end',
    className,
    offset: offsetOptions,
    onClose,
    'data-test': dataTest,
    matchReferenceSize = false,
    container = `body`,
    autoPlacement = false,
  } = props

  const getOnClose = useRefValue(onClose)

  const { refs, floatingStyles } = useFloating({
    elements: { reference: anchorElement },
    placement,
    middleware: [
      ...(autoPlacement ? [autoPlacementMiddleware()] : []),
      ...(matchReferenceSize
        ? [
            size({
              apply({ rects, elements }) {
                Object.assign(elements.floating.style, {
                  minWidth: `${rects.reference.width}px`,
                })
              },
            }),
          ]
        : []),
      offset(offsetOptions),
      shift({
        crossAxis: true,
      }),
    ],
  })

  const containerEl = getPortalContainer(container, anchorElement)

  useOnClickOutside(open, {
    target: refs.floating.current,
    excludeElement: anchorElement,
    handler: onClose,
  })

  const handleFocusIn = useCallback(
    (e: FocusEvent) => {
      if (refs.floating.current && !refs.floating.current.contains(e.target as Node) && !anchorElement?.contains(e.target as Node)) {
        onClose()
      }
    },
    [onClose, refs.floating, anchorElement],
  )
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        getOnClose()()
      }
    },
    [getOnClose],
  )

  useEffect(() => {
    if (open) {
      document.addEventListener('focusin', handleFocusIn, false)
      document.addEventListener('keydown', handleKeyDown, false)
    } else {
      document.removeEventListener('focusin', handleFocusIn)
      document.removeEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('focusin', handleFocusIn)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, handleFocusIn, handleKeyDown])

  return (
    <>
      {containerEl
        ? createPortal(
            open && (
              <div ref={refs.setFloating} data-test={dataTest} className={cls(styles.root, className)} style={floatingStyles}>
                {children}
              </div>
            ),
            containerEl,
          )
        : children}
    </>
  )
}
