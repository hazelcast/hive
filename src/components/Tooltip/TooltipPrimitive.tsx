import React from 'react'
import * as RadixTooltip from '@radix-ui/react-tooltip'

import { cn } from '../../lib/utils'

export type TooltipPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'

function parsePlacement(placement: TooltipPlacement = 'top'): {
  side: 'top' | 'right' | 'bottom' | 'left'
  align: 'start' | 'center' | 'end'
} {
  const [side, align] = placement.split('-') as ['top' | 'right' | 'bottom' | 'left', 'start' | 'center' | 'end' | undefined]
  return { side, align: align ?? 'center' }
}

export const TooltipProvider = ({ delayDuration = 300, ...props }: React.ComponentPropsWithoutRef<typeof RadixTooltip.Provider>) => (
  <RadixTooltip.Provider delayDuration={delayDuration} {...props} />
)
TooltipProvider.displayName = 'TooltipProvider'
export const Tooltip = RadixTooltip.Root
export const TooltipTrigger = RadixTooltip.Trigger

export interface TooltipContentProps extends Omit<React.ComponentPropsWithoutRef<typeof RadixTooltip.Content>, 'side' | 'align'> {
  placement?: TooltipPlacement
  arrow?: boolean
}

export const TooltipContent = React.forwardRef<React.ElementRef<typeof RadixTooltip.Content>, TooltipContentProps>(
  ({ className, placement = 'top', sideOffset = 4, arrow: showArrow = true, children, ...props }, ref) => {
    const { side, align } = parsePlacement(placement)

    return (
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          ref={ref}
          side={side}
          align={align}
          sideOffset={sideOffset}
          className={cn(
            'z-50 max-w-xs overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground',
            'animate-in fade-in-0 zoom-in-95',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
            'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            className,
          )}
          {...props}
        >
          {children}
          {showArrow && <RadixTooltip.Arrow className="fill-primary" />}
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    )
  },
)
TooltipContent.displayName = 'TooltipContent'
