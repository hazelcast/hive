import React, { KeyboardEvent, useEffect, useId, useRef, useState } from 'react'
import { Check, Moon, Sun } from 'react-feather'
import cn from 'classnames'

import { Icon } from './Icon'
import { Popover } from './Popover'
import { ThemePreference } from '../utils/colorScheme'
import { HalfCircle } from '../icons/HalfCircle'

import styles from './ThemeSwitcher.module.css'

export interface ThemeSwitcherProps {
  value: ThemePreference
  onChange: (preference: ThemePreference) => void
  disabled?: boolean
  className?: string
  'aria-label'?: string
  'data-test'?: string
}

const options = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: HalfCircle },
] as const

export const ThemeSwitcher = ({
  value,
  onChange,
  disabled = false,
  className,
  'aria-label': ariaLabel = 'Color theme',
  'data-test': dataTest = 'theme-switcher',
}: ThemeSwitcherProps) => {
  const [open, setOpen] = useState(false)
  const trigger = useRef<HTMLButtonElement>(null)
  const items = useRef<(HTMLButtonElement | null)[]>([])
  const initialFocus = useRef(0)
  const menuId = useId()
  const selected = options.find((option) => option.value === value) ?? options[0]

  useEffect(() => {
    if (open && !disabled) items.current[initialFocus.current]?.focus({ preventScroll: true })
  }, [open, disabled])

  const close = () => setOpen(false)
  const show = (index: number) => {
    initialFocus.current = index
    setOpen(true)
  }
  const select = (preference: ThemePreference) => {
    close()
    trigger.current?.focus({ preventScroll: true })
    onChange(preference)
  }
  const onMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = items.current.findIndex((item) => item === document.activeElement)
    let nextIndex: number
    switch (event.key) {
      case 'ArrowDown':
        nextIndex = (index + 1) % options.length
        break
      case 'ArrowUp':
        nextIndex = (index + options.length - 1) % options.length
        break
      case 'Home':
        nextIndex = 0
        break
      case 'End':
        nextIndex = options.length - 1
        break
      case 'Escape':
        event.stopPropagation()
        event.preventDefault()
        close()
        trigger.current?.focus({ preventScroll: true })
        return
      case 'Tab':
        close()
        trigger.current?.focus({ preventScroll: true })
        return
      default:
        nextIndex = options.findIndex((option) => option.label.toLowerCase().startsWith(event.key.toLowerCase()))
        if (nextIndex < 0 || event.key.length !== 1) return
    }
    event.preventDefault()
    items.current[nextIndex]?.focus()
  }

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className={cn(styles.trigger, className)}
        aria-label={`${ariaLabel}: ${selected.label}`}
        title={`${ariaLabel}: ${selected.label}`}
        aria-haspopup="menu"
        aria-expanded={open && !disabled}
        aria-controls={open && !disabled ? menuId : undefined}
        disabled={disabled}
        data-test={dataTest}
        onClick={() => (open ? close() : show(options.indexOf(selected)))}
        onKeyDown={(event) => {
          if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
          event.preventDefault()
          show(event.key === 'ArrowDown' ? 0 : options.length - 1)
        }}
      >
        <Icon icon={selected.icon} size="smallMedium" ariaHidden />
      </button>
      <Popover open={open && !disabled} anchorElement={trigger.current} onClose={close} offset={4} className={styles.popover}>
        <div
          id={menuId}
          role="menu"
          aria-label={ariaLabel}
          onKeyDown={onMenuKeyDown}
          onMouseDown={(event) => event.stopPropagation()}
          onTouchStart={(event) => event.stopPropagation()}
        >
          {options.map((option, index) => (
            <button
              key={option.value}
              ref={(element) => {
                items.current[index] = element
              }}
              type="button"
              role="menuitemradio"
              aria-checked={value === option.value}
              tabIndex={-1}
              className={styles.option}
              onClick={() => select(option.value)}
            >
              <Icon icon={option.icon} size="small" ariaHidden />
              <span>{option.label}</span>
              <span className={styles.check}>{value === option.value && <Icon icon={Check} size="small" ariaHidden />}</span>
            </button>
          ))}
        </div>
      </Popover>
    </>
  )
}
