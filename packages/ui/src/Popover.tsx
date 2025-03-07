import React, { CSSProperties, PropsWithChildren, useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { beforeWrite, createPopper, Instance, State, Placement } from '@popperjs/core'
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

export const Popover = (props: PropsWithChildren<PopoverProps>) => {
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
  const popperElement = useRef<HTMLDivElement | null>(null)

  const popper = useRef<Instance>()

  const containerEl = getPortalContainer(container, anchorElement)

  useOnClickOutside(open, {
    target: popperElement.current,
    excludeElement: anchorElement,
    handler: onClose,
  })

  const handleFocusIn = useCallback(
    (e: FocusEvent) => {
      if (popperElement.current && !popperElement.current.contains(e.target as Node) && !anchorElement?.contains(e.target as Node)) {
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
    if (open && anchorElement && popperElement.current) {
      popper.current = createPopper(anchorElement, popperElement.current, {
        placement,
        modifiers: [
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
          ...(matchReferenceSize
            ? [
                {
                  name: 'matchReferenceSize',
                  enabled: true,
                  fn: ({ state, instance }: { state: State; instance: Instance }) => {
                    console.log(111)
                    const onUpdate = getOnUpdate()
                    const widthOrHeight = state.placement.startsWith('left') || state.placement.startsWith('right') ? 'height' : 'width'

                    if (!popperElement.current) return

                    const popperSize =
                      popperElement.current[`offset${widthOrHeight[0].toUpperCase() + widthOrHeight.slice(1)}` as 'offsetWidth']
                    const referenceSize = state.rects.reference[widthOrHeight]

                    if (Math.round(popperSize) === Math.round(referenceSize)) return

                    popperElement.current.style[widthOrHeight] = `${referenceSize}px`
                    void instance.update()
                    if (onUpdate) {
                      onUpdate()
                    }
                  },
                  phase: beforeWrite,
                  requires: ['computeStyles'],
                },
              ]
            : []),
        ],
      })
    }

    return () => {
      popper.current?.destroy()
    }
  }, [open, matchReferenceSize, offset, placement, anchorElement])

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
                ref={popperElement}
                data-test={dataTest}
                className={cls(styles.root, className)}
                style={popper.current?.state.styles.popper as CSSProperties}
                {...popper.current?.state.attributes.popper}
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
