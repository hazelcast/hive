import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { Modifier, usePopper } from 'react-popper'
import { Placement } from '@popperjs/core'
import cls from 'classnames'

import { getPortalContainer, PortalContainer } from './utils/portal'
import { DataTestProp } from '../../helpers'
import { useOnClickOutside, useRefValue } from './hooks'

import styles from './Popover.module.scss'

export interface PopoverProps extends DataTestProp {
  open: boolean
  placement?: Placement
  offset?: Partial<{ x: number; y: number }>
  preventOverflowOptions?: {
    rootBoundary: 'vew'
  }
  className?: string
  anchorElement?: HTMLElement | null
  arrowElement?: HTMLElement | null
  onClose: () => void
  matchReferenceSize?: boolean
  onUpdateLayout?: () => void
  container?: PortalContainer
}

export const Popover: FC<PopoverProps> = (props) => {
  const {
    open,
    children,
    anchorElement,
    placement = 'bottom-end',
    className,
    offset,
    arrowElement,
    onClose,
    'data-test': dataTest,
    matchReferenceSize,
    onUpdateLayout,
    container = `body`,
  } = props

  const getOnUpdate = useRefValue(onUpdateLayout)
  const getOnClose = useRefValue(onClose)
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null)

  const modifiers = useMemo((): Modifier<string, Record<string, unknown>>[] => {
    const modifiers: Modifier<string, Record<string, unknown>>[] = [
      {
        name: 'offset',
        options: {
          offset: [offset?.x ?? 0, offset?.y ?? 0],
        },
      },
      {
        name: 'preventOverflow',
        options: {
          rootBoundary: 'viewport',
        },
      },
      { name: 'arrow', options: { element: arrowElement } },
    ]

    if (matchReferenceSize) {
      modifiers.push({
        name: 'matchReferenceSize',
        enabled: true,
        fn: ({ state, instance }) => {
          const onUpdate = getOnUpdate()
          const widthOrHeight = state.placement.startsWith('left') || state.placement.startsWith('right') ? 'height' : 'width'

          if (!popperElement) return

          const popperSize = popperElement[`offset${widthOrHeight[0].toUpperCase() + widthOrHeight.slice(1)}` as 'offsetWidth']
          const referenceSize = state.rects.reference[widthOrHeight]

          if (Math.round(popperSize) === Math.round(referenceSize)) return

          popperElement.style[widthOrHeight] = `${referenceSize}px`
          void instance.update()
          if (onUpdate) {
            onUpdate()
          }
        },
        phase: 'beforeWrite',
        requires: ['computeStyles'],
      })
    }

    return modifiers
  }, [matchReferenceSize, offset, popperElement, arrowElement, getOnUpdate])

  const popper = usePopper(anchorElement, popperElement, {
    placement,
    modifiers,
  })

  const containerEl = getPortalContainer(container, anchorElement)

  useOnClickOutside(open, {
    target: popperElement,
    excludeElement: anchorElement,
    handler: onClose,
  })

  const handleFocusIn = useCallback(
    (e: FocusEvent) => {
      if (popperElement && !popperElement.contains(e.target as Node) && !anchorElement?.contains(e.target as Node)) {
        onClose()
      }
    },
    [onClose, popperElement, anchorElement],
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
              <div
                ref={setPopperElement}
                data-test={dataTest}
                className={cls(styles.root, className)}
                style={popper.styles.popper}
                {...popper.attributes.popper}
              >
                {children}
              </div>
            ),
            containerEl,
          )
        : children}
    </>
  )
}
