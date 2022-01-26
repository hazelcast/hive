import React, { FC, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { Modifier, usePopper } from 'react-popper'
import { Placement } from '@popperjs/core'
import cls from 'classnames'
import FocusTrap from 'focus-trap-react'

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
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null)

  const hasFocusableElements = useMemo(() => {
    return open
      ? (popperElement?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), details:not([disabled]), summary:not(:disabled)',
        )?.length ?? 0) > 0
      : false
  }, [popperElement, open])
  const modifiers = useMemo((): Modifier<string, Record<string, unknown>>[] => {
    const modifiers: Modifier<string, Record<string, unknown>>[] = [
      {
        name: 'offset',
        options: {
          offset: [offset?.y ?? 0, offset?.x ?? 0],
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

  return (
    <>
      {containerEl
        ? createPortal(
            open && (
              <FocusTrap
                active={hasFocusableElements}
                focusTrapOptions={{
                  initialFocus: false,
                  setReturnFocus: anchorElement || undefined,
                  escapeDeactivates: true,
                  allowOutsideClick: true,
                  onDeactivate: onClose,
                }}
              >
                <div
                  ref={setPopperElement}
                  data-test={dataTest}
                  className={cls(styles.root, className)}
                  style={popper.styles.popper}
                  {...popper.attributes.popper}
                >
                  {children}
                </div>
              </FocusTrap>
            ),
            containerEl,
          )
        : children}
    </>
  )
}
