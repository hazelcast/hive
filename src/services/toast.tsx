import React, { FC, ReactNode, useSyncExternalStore } from 'react'

import { Toast, ToastProvider, ToastViewport, ToastVariant } from '../components/Toast'
import styles from './ToastContainer.module.css'

export type ToastContent = ReactNode | ((props: { closeToast: () => void }) => ReactNode)

export type ToastOptions = {
  toastId?: string | number
  autoClose?: number | false
  onClose?: () => void
  closeButton?: boolean
  closeOnClick?: boolean
  variant?: ToastVariant
}

type ToastMethod = (content: ToastContent, options?: ToastOptions) => string

export type ToastService = ToastMethod & {
  info: ToastMethod
  success: ToastMethod
  warn: ToastMethod
  error: ToastMethod
  custom: ToastMethod
  dismiss: (id?: string | number) => void
  isActive: (id: string | number) => boolean
}

type ToastEntry = {
  id: string
  variant: ToastVariant
  content: ReactNode
  duration: number
  closeButton: boolean
  closeOnClick: boolean
  onClose?: () => void
}

let toastEntries: ToastEntry[] = []
let toastCounter = 0
const subscribers = new Set<() => void>()
const emptyEntries: ToastEntry[] = []

const subscribe = (subscriber: () => void) => {
  subscribers.add(subscriber)
  return () => subscribers.delete(subscriber)
}

const notifySubscribers = () => subscribers.forEach((subscriber) => subscriber())
const getSnapshot = () => toastEntries
const getServerSnapshot = () => emptyEntries

const closeToast = (id: string) => {
  const entry = toastEntries.find((toastEntry) => toastEntry.id === id)
  if (!entry) return

  toastEntries = toastEntries.filter((toastEntry) => toastEntry.id !== id)
  notifySubscribers()
  entry.onClose?.()
}

const enqueueToast = (content: ToastContent, variant: ToastVariant, options: ToastOptions = {}) => {
  const id = String(options.toastId ?? `hive-toast-${++toastCounter}`)
  const close = () => closeToast(id)
  const renderedContent = <div data-test="toast-message">{typeof content === 'function' ? content({ closeToast: close }) : content}</div>

  toastEntries = [
    ...toastEntries.filter((toastEntry) => toastEntry.id !== id),
    {
      id,
      variant: options.variant ?? variant,
      content: renderedContent,
      duration: options.autoClose === false ? Infinity : (options.autoClose ?? 5000),
      closeButton: options.closeButton ?? true,
      closeOnClick: options.closeOnClick ?? false,
      onClose: options.onClose,
    },
  ]
  notifySubscribers()
  return id
}

const toastBase: ToastMethod = (content, options) => enqueueToast(content, 'info', options)

export const toast = Object.assign(toastBase, {
  info: (content: ToastContent, options?: ToastOptions) => enqueueToast(content, 'info', options),
  success: (content: ToastContent, options?: ToastOptions) => enqueueToast(content, 'success', options),
  warn: (content: ToastContent, options?: ToastOptions) => enqueueToast(content, 'warn', options),
  error: (content: ToastContent, options?: ToastOptions) => enqueueToast(content, 'error', options),
  custom: (content: ToastContent, options?: ToastOptions) => enqueueToast(content, options?.variant ?? 'info', options),
  dismiss: (id?: string | number) => {
    if (id !== undefined) {
      closeToast(String(id))
      return
    }

    const entriesToClose = toastEntries
    toastEntries = []
    notifySubscribers()
    entriesToClose.forEach((entry) => entry.onClose?.())
  },
  isActive: (id: string | number) => toastEntries.some((entry) => entry.id === String(id)),
}) satisfies ToastService

export const ToastContainer: FC = () => {
  const entries = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  return (
    <ToastProvider swipeDirection="right">
      {entries.map((entry) => (
        <Toast
          key={entry.id}
          id={entry.id}
          variant={entry.variant}
          content={entry.content}
          duration={entry.duration}
          closeButton={entry.closeButton}
          closeOnClick={entry.closeOnClick}
          onOpenChange={(open) => {
            if (!open) closeToast(entry.id)
          }}
        />
      ))}
      <ToastViewport className={styles.viewport} aria-label="Notifications" />
    </ToastProvider>
  )
}
