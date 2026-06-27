import React, { FC, ReactNode } from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import cn from 'classnames'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'react-feather'

import styles from './Toast.module.css'

export type ToastVariant = 'success' | 'error' | 'warn' | 'info'

type IconComponent = FC<{ size?: number; className?: string }>

type VariantConfig = {
  Icon: IconComponent
  ariaLabel: string
}

const VARIANT_CONFIG: Record<ToastVariant, VariantConfig> = {
  success: { Icon: CheckCircle, ariaLabel: 'Success' },
  error: { Icon: XCircle, ariaLabel: 'Error' },
  warn: { Icon: AlertTriangle, ariaLabel: 'Warning' },
  info: { Icon: Info, ariaLabel: 'Info' },
}

export const ToastProvider = ToastPrimitive.Provider
export const ToastViewport = ToastPrimitive.Viewport

let _idCounter = 0

export type ToastProps = {
  content: ReactNode
  variant?: ToastVariant
  id?: string
  /** Duration in ms before auto-dismiss. Pass `Infinity` to keep open until manually closed. Default: `5000`. */
  duration?: number
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const Toast: FC<ToastProps> = ({
  id = `toast-${++_idCounter}`,
  variant = 'info',
  content,
  duration = 5000,
  open = true,
  onOpenChange = () => undefined,
}) => {
  const { Icon, ariaLabel } = VARIANT_CONFIG[variant]
  const radixDuration = duration === Infinity ? 2147483647 : duration

  return (
    <ToastPrimitive.Root
      key={id}
      open={open}
      onOpenChange={onOpenChange}
      duration={radixDuration}
      className={cn(styles.root, styles[variant])}
    >
      <div className={styles.bar} />
      <div className={styles.body}>
        <Icon size={18} className={styles.icon} aria-hidden />
        <ToastPrimitive.Description asChild>
          <div className={styles.content}>{content}</div>
        </ToastPrimitive.Description>
        <ToastPrimitive.Action altText="Close" asChild>
          <button className={styles.closeButton} onClick={() => onOpenChange(false)} aria-label={`Close ${ariaLabel} notification`}>
            <X size={16} />
          </button>
        </ToastPrimitive.Action>
      </div>
    </ToastPrimitive.Root>
  )
}
