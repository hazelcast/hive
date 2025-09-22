import React, { FC, ReactNode, useState, useLayoutEffect, useRef, MouseEventHandler, CSSProperties } from 'react'
import ReactDOM from 'react-dom'
import { FloatingArrow, Placement, offset, useFloating, arrow, useHover, useInteractions, autoUpdate } from '@floating-ui/react'
import cn from 'classnames'

import { getPortalContainer } from '../utils/portal'

import styles from './Tooltip.module.scss'

export type TooltipProps = {
  content: ReactNode
  id?: string
  offset?: number
  arrow?: boolean
  color?: 'dark' | 'secondary'
  padding?: number
  placement?: Placement
  visible?: boolean
  className?: string
  children: (
    ref: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
    onMouseEnter?: MouseEventHandler,
    onMouseLeave?: MouseEventHandler,
  ) => ReactNode
  wordBreak?: CSSProperties['wordBreak']
  disabled?: boolean
  zIndex?: number
}

/**
 * ### Purpose
 * Useful when you need to display additional information/actionable content.
 * A tooltip with this content is displayed when user hovers over a target element.
 *
 * ### General info
 * - Tooltip automatically detects viewport overflow and changes placement to prevent it.
 * - Offset (space between a target and tooltip elements) can be also configured via "offset" property.
 * - If "content" property is undefined, tooltip element will be removed from DOM entirely.
 * - It's required to set the "id" property which will be assigned to the tooltip. This id parameter can be then used as a value of "aria-labelledby" attribute.
 * - Use `updateToken` prop to update the tooltip position.
 * - Use `tooltipContainer` prop to change the tooltip portal container. Defaults to `body`.
 *
 * ### Usage
 * Wrap the target element with Tooltip component and use the "content" property to define what should be displayed inside the tooltip.
 */
export const Tooltip: FC<TooltipProps> = ({
  id,
  content,
  offset: offsetY = 10,
  padding = 10,
  placement = 'top',
  visible: visibilityOverride,
  children,
  wordBreak,
  disabled = false,
  zIndex = 20,
  arrow: showArrow = true,
  color,
  className,
}) => {
  const arrowRef = useRef(null)

  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLSpanElement | null>(null)

  const { floatingStyles, update, context } = useFloating({
    strategy: 'absolute',
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(offsetY),
      ...(showArrow
        ? [
            arrow({
              element: arrowRef,
              padding,
            }),
          ]
        : []),
    ],
    elements: {
      floating: popperElement,
      reference: referenceElement,
    },
  })

  const hover = useHover(context)

  // const {getReferenceProps, getFloatingProps} = useInteractions([
  const { getFloatingProps } = useInteractions([hover])

  const isTooltipVisible = typeof visibilityOverride === 'boolean' ? visibilityOverride : !disabled

  // Update the tooltip's position (useful when resizing table columns)
  useLayoutEffect(() => {
    if (content) {
      void update()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTooltipVisible])

  const tooltipPortalContainer = getPortalContainer('body', referenceElement)

  return (
    <>
      {children(setReferenceElement)}
      {content !== undefined && (
        <>
          <span {...(id && { id })} className={cn(styles.tooltipSr, className)} role="tooltip" data-test="tooltip-sr">
            {content}
          </span>
          {tooltipPortalContainer &&
            ReactDOM.createPortal(
              <>
                <span
                  ref={setPopperElement}
                  className={cn(
                    styles.overlay,
                    {
                      [styles.hidden]: !isTooltipVisible,
                    },
                    color && [styles[color]],
                    className,
                  )}
                  style={{ ...floatingStyles, ...{ zIndex: context ? zIndex + 1 : zIndex }, wordBreak }}
                  data-test="tooltip-overlay"
                  aria-hidden
                  {...getFloatingProps()}
                >
                  {content}
                  {showArrow && <FloatingArrow ref={arrowRef} context={context} className={styles.arrow} />}
                </span>
              </>,
              tooltipPortalContainer,
            )}
        </>
      )}
    </>
  )
}
