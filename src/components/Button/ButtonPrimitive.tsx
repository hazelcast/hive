import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../lib/utils'

/**
 * shadcn-style button primitive for Hazelcast UI v4.
 *
 * Variant names follow our existing API (contained/outlined/text)
 * and map to shadcn semantics. shadcn's standard names (default,
 * outline, ghost, destructive, secondary, link) are also supported
 * so the shadcn CLI can add components without conflicts.
 *
 * Colors map to shadcn CSS variables:
 *   primary     → --primary / --primary-foreground
 *   secondary   → --destructive / --destructive-foreground
 *   warning     → --warning / --warning-foreground
 *   brand, authPrimary, authSecondary, light → --primary (placeholder,
 *     configure with Hazelcast design tokens via globals.css)
 */
export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md px-3 h-9 text-xs font-medium',
    'ring-offset-background transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'data-[active]:opacity-80',
    '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        // Hazelcast names
        contained: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outlined: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        text: 'hover:bg-accent hover:text-accent-foreground',
        // shadcn standard names (kept for CLI compatibility)
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      color: {
        primary: '',
        secondary: '',
        warning: '',
        brand: '',
        authPrimary: '',
        authSecondary: '',
        light: '',
      },
    },
    compoundVariants: [
      // secondary color → destructive (error/danger)
      {
        color: 'secondary',
        variant: 'contained',
        class: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      },
      {
        color: 'secondary',
        variant: ['outlined', 'outline'],
        class: 'border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive',
      },
      {
        color: 'secondary',
        variant: ['text', 'ghost'],
        class: 'text-destructive hover:bg-destructive/10',
      },
      // warning color
      {
        color: 'warning',
        variant: 'contained',
        class: 'bg-warning text-warning-foreground hover:bg-warning/90',
      },
      {
        color: 'warning',
        variant: ['outlined', 'outline'],
        class: 'border-warning text-warning hover:bg-warning/10 hover:text-warning',
      },
      {
        color: 'warning',
        variant: ['text', 'ghost'],
        class: 'text-warning hover:bg-warning/10',
      },
      // brand, authPrimary, authSecondary, light → use primary as placeholder
      // TODO: add Hazelcast-specific CSS variables in globals.css and replace these
    ],
    defaultVariants: {
      variant: 'contained',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>

export interface ButtonPrimitiveProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>, ButtonVariants {
  asChild?: boolean
}

/**
 * Low-level shadcn-style Button primitive.
 * Use the high-level `Button` component for icons, loading states, and tooltips.
 */
export const ButtonPrimitive = React.forwardRef<HTMLButtonElement, ButtonPrimitiveProps>(
  ({ className, variant, color, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref as React.Ref<HTMLButtonElement>}
        className={cn(buttonVariants({ variant, color: color ?? undefined }), className)}
        {...props}
      />
    )
  },
)

ButtonPrimitive.displayName = 'ButtonPrimitive'
