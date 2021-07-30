import React, { FocusEvent, ReactNode, useMemo, useState } from 'react'
import { Check, ChevronDown, ChevronUp, Minus } from 'react-feather'
import { useUID } from 'react-uid'
import cls from 'classnames'
import { Modifier, usePopper } from 'react-popper'

import { Popover } from '../Popover'
import { Link } from '../Link'
import { SelectFieldOption } from './helpers'
import { TextField } from '../TextField'
import { HelpProps } from '../Help'

import styles from './CheckableSelectField.module.scss'
import ReactDOM from 'react-dom'
import { canUseDOM } from '../utils/ssr'

export type CheckableSelectFieldCoreStaticProps<V> = {
  name: string
  onBlur?: (e: FocusEvent<HTMLElement>) => void
  error?: string
  value: V[]
  onChange: (newValue: V[]) => void
}

export type CheckableSelectFieldExtraProps<V> = {
  options: SelectFieldOption<V>[]
  label: ReactNode
  size?: 'small' | 'medium'
  showAriaLabel?: boolean
  helperText?: HelpProps['helperText']
  className?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  labelClassName?: string
  errorClassName?: string
  'data-test': string
}

export type CheckableSelectProps<V> = CheckableSelectFieldCoreStaticProps<V> & CheckableSelectFieldExtraProps<V>

export type CheckableSelectCoreProps<V> = {
  value: V[]
  className?: string
  placeholder?: string
  onChange: (newValue: V[]) => void
}

export interface CheckMarkProps {
  checked: boolean
}

const Checkmark = ({ checked }: CheckMarkProps) => {
  const classNames = cls(styles.checkmark, { [styles.checked]: checked })

  return checked ? <Check className={classNames} /> : <Minus className={classNames} />
}

export const CheckableSelectField = <V extends string | number = number>(props: CheckableSelectProps<V>) => {
  const {
    options,
    onChange,
    value,
    size = 'medium',
    placeholder = 'Search',
    label,
    showAriaLabel,
    disabled,
    helperText,
    className,
    error,
    onBlur,
    name,
    required,
    'data-test': dataTest,
  } = props
  const id = useUID()
  const [searchValue, setSearchValue] = useState('')
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLSpanElement | null>(null)

  const valueSet = useMemo(() => new Set(value), [value])
  const filteredOptions = useMemo(() => {
    const value = searchValue.toLowerCase()

    return options.filter(({ label }) => label.toLowerCase().includes(value))
  }, [options, searchValue])

  const modifiers = useMemo(
    (): Modifier<string, Record<string, unknown>>[] => [
      {
        name: 'matchReferenceSize',
        enabled: true,
        fn: ({ state, instance }) => {
          const widthOrHeight = state.placement.startsWith('left') || state.placement.startsWith('right') ? 'height' : 'width'

          if (!popperElement) return

          const popperSize = popperElement[`offset${widthOrHeight[0].toUpperCase() + widthOrHeight.slice(1)}` as 'offsetWidth']
          const referenceSize = state.rects.reference[widthOrHeight]

          if (Math.round(popperSize) === Math.round(referenceSize)) return

          popperElement.style[widthOrHeight] = `${referenceSize}px`
          void instance.update()
        },
        phase: 'beforeWrite',
        requires: ['computeStyles'],
      },
    ],
    [popperElement],
  )
  const popper = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
    modifiers,
  })

  return (
    <Popover>
      {({ open }) => {
        const opener = (
          <TextField
            size={size}
            name={name}
            id={id}
            onChange={() => null}
            label={(label as string) || ''}
            disabled={disabled}
            showAriaLabel={showAriaLabel}
            helperText={helperText}
            className={cls(className, styles.opener)}
            error={error}
            onBlur={onBlur}
            readOnly
            required={required}
            data-test={`${dataTest}-opener`}
            value={`${value.length} selected`}
            inputTrailingIconLabel={open ? 'Close' : 'Open'}
            inputTrailingIcon={open ? ChevronUp : ChevronDown}
          />
        )

        return (
          <>
            {disabled ? (
              opener
            ) : (
              <Popover.Button ref={setReferenceElement} as="span">
                {opener}
              </Popover.Button>
            )}
            {ReactDOM.createPortal(
              <Popover.Panel ref={setPopperElement} style={popper.styles.popper} {...popper.attributes.popper} className={styles.panel}>
                <div className={styles.dropdown} data-test={`${dataTest}-dropdown`}>
                  <TextField
                    size={size}
                    className={styles.search}
                    name="checkable-select-search"
                    data-test={`${dataTest}-search`}
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
                    label=""
                    disabled={disabled}
                    placeholder={placeholder}
                  />
                  <div className={styles.options}>
                    {filteredOptions.map((option) => {
                      const isChecked = valueSet.has(option.value)

                      return (
                        <button
                          type="button"
                          key={option.value}
                          name={option.label}
                          data-test={`${dataTest}-option`}
                          className={cls(styles.option, { [styles.optionChecked]: isChecked })}
                          onClick={() => {
                            if (isChecked) {
                              onChange(value.filter((item) => item !== option.value))
                            } else {
                              onChange([...value, option.value])
                            }
                          }}
                        >
                          <Checkmark checked={isChecked} />
                          {option.label}
                        </button>
                      )
                    })}
                  </div>
                  <div className={styles.bottom}>
                    <Link
                      component="button"
                      data-test={`${dataTest}-select-all`}
                      onClick={() => {
                        onChange(filteredOptions.map(({ value }) => value))
                      }}
                    >
                      Select all
                    </Link>
                    <Link component="button" data-test={`${dataTest}-select-none`} onClick={() => onChange([])}>
                      Select none
                    </Link>
                  </div>
                </div>
              </Popover.Panel>,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              canUseDOM ? document.body : null,
            )}
          </>
        )
      }}
    </Popover>
  )
}
