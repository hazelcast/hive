import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../lib/utils'

/**
 * CVA variant definitions for the Hazelcast button.
 *
 * Structural classes live here. Color-specific CSS variables
 * (--btn-bg, --btn-bg-hover, --btn-bg-active, --btn-text-contained)
 * are set by the .hz-btn-{color} classes defined in globals.css.
 */
export const buttonVariants = cva(
  [
    // Structural base
    'inline-block relative box-border cursor-pointer p-0 no-underline',
    'max-w-[var(--button-max-width,370px)]',
    // Focus ring: show the inner .hz-btn-outline span on keyboard focus
    '[&:focus-visible_.hz-btn-outline]:visible',
    // Transparent outline so high-contrast mode still sees a boundary
    'focus-visible:outline-2 focus-visible:outline-transparent',
    'disabled:cursor-not-allowed',
  ],
  {
    variants: {
      /** Maps to .hz-btn-{color} which sets --btn-* CSS variables */
      color: {
        primary: 'hz-btn-primary',
        secondary: 'hz-btn-secondary',
        warning: 'hz-btn-warning',
        brand: 'hz-btn-brand',
        authPrimary: 'hz-btn-auth-primary',
        authSecondary: 'hz-btn-auth-secondary',
        light: 'hz-btn-light',
      },
      variant: {
        contained: [
          'hz-btn-contained',
          'bg-(--btn-bg) border-none',
          'text-(--btn-text-contained)',
          'hover:bg-(--btn-bg-hover) focus-visible:bg-(--btn-bg-hover)',
          'active:bg-(--btn-bg-active) data-[active]:bg-(--btn-bg-active)',
          'disabled:bg-(--color-neutral) disabled:text-(--color-text-secondary)',
        ],
        outlined: [
          'hz-btn-outlined',
          'bg-transparent border border-solid border-(--btn-bg)',
          'text-(--btn-bg)',
          'hover:border-(--btn-bg-hover) hover:text-(--btn-bg-hover) hover:bg-transparent',
          'focus-visible:border-(--btn-bg-hover) focus-visible:text-(--btn-bg-hover) focus-visible:bg-transparent',
          'active:border-(--btn-bg-active) active:text-(--btn-bg-active)',
          'data-[active]:border-(--btn-bg-active) data-[active]:text-(--btn-bg-active)',
          'disabled:bg-transparent disabled:text-(--color-text-secondary) disabled:border-(--color-neutral)',
        ],
        text: [
          'hz-btn-text',
          'bg-transparent border-none',
          'text-(--btn-bg)',
          'hover:text-(--btn-bg-hover) hover:bg-transparent',
          'focus-visible:text-(--btn-bg-hover) focus-visible:bg-transparent',
          'active:text-(--btn-bg-active)',
          'data-[active]:text-(--btn-bg-active)',
          'disabled:bg-transparent disabled:text-(--color-text-secondary)',
        ],
      },
      size: {
        small: [
          'h-[var(--button-height-sm,1.875rem)]',
          'rounded-[var(--button-radius,1.25rem)]',
          'text-[0.6875rem] font-semibold tracking-[0.08em] uppercase',
        ],
        medium: [
          'h-[var(--button-height-md,2.6875rem)]',
          'rounded-[var(--button-radius,1.25rem)]',
          'text-[0.75rem] font-semibold tracking-[0.08em] uppercase',
        ],
      },
    },
    compoundVariants: [
      // authSecondary: the base border is white (contained + outlined), not the bg color
      {
        color: 'authSecondary',
        variant: 'contained',
        class: 'border border-solid border-(--color-neutral-white)',
      },
      {
        color: 'authSecondary',
        variant: 'contained',
        class: 'disabled:text-(--color-text) disabled:bg-(--color-neutral-white) disabled:border-(--color-neutral-white)',
      },
      // authSecondary outlined: border is the authSecondary color (not white)
      {
        color: 'authSecondary',
        variant: 'outlined',
        class: 'border-(--btn-bg)',
      },
      // light: disabled state keeps the "light" background, just dimmed
      {
        color: 'light',
        variant: 'contained',
        class: 'disabled:bg-(--color-neutral-light) disabled:border-(--color-neutral-light)',
      },
    ],
    defaultVariants: {
      color: 'primary',
      variant: 'contained',
      size: 'small',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>

export interface ButtonPrimitiveProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>, ButtonVariants {
  asChild?: boolean
}

/**
 * Low-level shadcn-style Button primitive.
 * Use the high-level `Button` component for the full Hazelcast button
 * with icons, loading states, and tooltips.
 */
export const ButtonPrimitive = React.forwardRef<HTMLButtonElement, ButtonPrimitiveProps>(
  ({ className, variant, size, color, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref as React.Ref<HTMLButtonElement>}
        className={cn(buttonVariants({ variant, size, color: color ?? undefined }), className)}
        {...props}
      />
    )
  },
)

ButtonPrimitive.displayName = 'ButtonPrimitive'
