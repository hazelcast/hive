export { Toast, ToastProvider, ToastViewport } from './Toast'
export type { ToastProps, ToastVariant } from './Toast'

// Re-exported for backward compat with Alert and other consumers of the legacy types.
// These will be removed in v5 — import from '@hazelcast/ui/old' instead.
export { ToastIcon } from '../../old/Toast'
export type { ToastType, ToastIconDescriptor } from '../../old/Toast'
