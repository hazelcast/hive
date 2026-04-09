import React, { CSSProperties, ReactElement, ReactNode } from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import cn from 'classnames'

import styles from './Tooltip.module.css'

export type TooltipSide = 'top' | 'right' | 'bottom' | 'left'
export type TooltipAlign = 'start' | 'center' | 'end'

export type TooltipProps = {
  /** The trigger element */
  children: ReactElement
  /** Content displayed inside the tooltip */
  content: ReactNode
  /** Preferred side relative to the trigger */
  side?: TooltipSide
  /** Alignment along the side axis */
  align?: TooltipAlign
  /** Distance in pixels between trigger and tooltip */
  sideOffset?: number
  /** Automatically shift to avoid viewport overflow */
  avoidCollisions?: boolean
  /** Controlled open state */
  open?: boolean
  /** Delay in ms before the tooltip opens (default: 300) */
  delayDuration?: number
  /** Show the arrow pointer */
  arrow?: boolean
  /** Color variant */
  color?: 'dark' | 'secondary'
  /** CSS word-break override */
  wordBreak?: CSSProperties['wordBreak']
  /** z-index for the tooltip portal */
  zIndex?: number
  /** Additional className on the tooltip content */
  className?: string
  /** ID for aria-labelledby */
  id?: string
}

/**
 * ### Purpose
 * Displays additional information when hovering over a trigger element.
 *
 * ### Usage
 * Pass the trigger element as `children` and the tooltip text/content via `content`.
 *
 * ```tsx
 * <Tooltip content="Save changes">
 *   <button>Save</button>
 * </Tooltip>
 * ```
 */
export const Tooltip = ({
  children,
  content,
  side = 'top',
  align = 'center',
  sideOffset = 10,
  avoidCollisions = true,
  open,
  delayDuration = 300,
  arrow: showArrow = true,
  color,
  wordBreak,
  zIndex = 20,
  className,
  id,
}: TooltipProps) => {
  if (content === undefined) {
    return <>{children}</>
  }

  const rootProps = typeof open === 'boolean' ? { open } : {}

  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root {...rootProps}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            id={id}
            side={side}
            align={align}
            sideOffset={sideOffset}
            avoidCollisions={avoidCollisions}
            className={cn(styles.content, color && styles[color], className)}
            style={{ zIndex, wordBreak }}
            data-test="tooltip-overlay"
          >
            {content}
            {showArrow && <TooltipPrimitive.Arrow className={styles.arrow} />}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}
