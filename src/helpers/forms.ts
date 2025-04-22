import { logger } from '../services/logger'

export function triggerNativeInputChange(value: string, inputEl: HTMLInputElement) {
  const inputPropertyDescriptor = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')
  if (inputPropertyDescriptor) {
    const nativeInputValueSetter = inputPropertyDescriptor.set
    if (nativeInputValueSetter) {
      nativeInputValueSetter.call(inputEl, value)
      const event = new Event('input', { bubbles: true })
      inputEl.dispatchEvent(event)
    }
  } else {
    logger.warn('Could not find property descriptor for input elements')
  }
}
