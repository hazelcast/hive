import React, { FC, ReactElement } from 'react'

import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './TooltipPrimitive'
import type { TooltipPlacement } from './TooltipPrimitive'

export interface SimpleTooltipProps {
  content: React.ReactNode
  children: ReactElement
  placement?: TooltipPlacement
  open?: boolean
  arrow?: boolean
  sideOffset?: number
  id?: string
  className?: string
}

/**
 * Convenience wrapper around the Tooltip compound components.
 * Use this when you just need to attach a tooltip to a single element.
 *
 * For nested tooltips or advanced control, use the compound API directly:
 * TooltipProvider + Tooltip + TooltipTrigger + TooltipContent.
 */
export const SimpleTooltip: FC<SimpleTooltipProps> = ({ content, children, placement, open, arrow, sideOffset, id, className }) => {
  if (!content) {
    return children
  }

  return (
    <TooltipProvider>
      <Tooltip open={typeof open === 'boolean' ? open : undefined}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent placement={placement} arrow={arrow} sideOffset={sideOffset} id={id} className={className}>
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
