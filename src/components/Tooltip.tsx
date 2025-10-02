import React, { FC, ReactNode, useRef, CSSProperties, cloneElement, ReactElement, useState } from 'react'
import {
  FloatingArrow,
  Placement,
  offset,
  useFloating,
  arrow,
  useHover,
  useInteractions,
  autoUpdate,
  autoPlacement as autoPlacementMiddleware,
  FloatingPortal,
  ReferenceType,
  safePolygon,
} from '@floating-ui/react'
import cn from 'classnames'

import styles from './Tooltip.module.scss'
import { canUseDOM } from '../utils/ssr'

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
  children: (ref: (node: ReferenceType | null) => void) => ReactElement
  wordBreak?: CSSProperties['wordBreak']
  zIndex?: number
  autoPlacement?: boolean
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
  zIndex = 20,
  arrow: showArrow = true,
  color,
  autoPlacement = true,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const arrowRef = useRef(null)

  const { refs, floatingStyles, context } = useFloating({
    strategy: 'absolute',
    placement,
    whileElementsMounted: autoUpdate,
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      ...(autoPlacement ? [autoPlacementMiddleware()] : []),
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
  })

  const hover = useHover(context, { handleClose: safePolygon() })

  const { getReferenceProps, getFloatingProps } = useInteractions([hover])

  const isTooltipVisible = typeof visibilityOverride === 'boolean' ? visibilityOverride : isOpen

  return (
    <>
      {cloneElement(children(refs.setReference), { ...getReferenceProps() })}
      {content !== undefined && isTooltipVisible && (
        <>
          <span {...(id && { id })} className={cn(styles.tooltipSr, className)} role="tooltip" data-test="tooltip-sr">
            {content}
          </span>
          <FloatingPortal root={canUseDOM ? document.body : null}>
            <span
              ref={refs.setFloating}
              className={cn(styles.overlay, color && [styles[color]], className)}
              style={{ ...floatingStyles, ...{ zIndex: context ? zIndex + 1 : zIndex }, wordBreak }}
              data-test="tooltip-overlay"
              {...getFloatingProps()}
            >
              {content}
              {showArrow && <FloatingArrow ref={arrowRef} context={context} className={styles.arrow} />}
            </span>
          </FloatingPortal>
        </>
      )}
    </>
  )
}
