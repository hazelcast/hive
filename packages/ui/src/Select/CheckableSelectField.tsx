import React, { FocusEvent, ReactNode, useMemo, useState } from 'react'
import { Check, ChevronDown, ChevronUp, Minus } from 'react-feather'
import { useUID } from 'react-uid'
import cls from 'classnames'

import { Popover } from '../Popover'
import { Link } from '../Link'
import { SelectFieldOption } from './helpers'
import { TextField } from '../TextField'
import { HelpProps } from '../Help'
import { useOpenCloseState } from '../hooks'

import styles from './CheckableSelectField.module.scss'

export type CheckableSelectFieldCoreStaticProps<V> = {
  name: string
  onBlur?: (e: FocusEvent<HTMLElement>) => void
  error?: string
  value: V[]
  onChange: (newValue: V[]) => void
  allSelectedLabel?: string
  noneSelectedLabel?: string
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
    allSelectedLabel = 'All selected',
    noneSelectedLabel = 'None selected',
  } = props
  const id = useUID()
  const { isOpen, toggle, close } = useOpenCloseState()
  const [searchValue, setSearchValue] = useState('')
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null)

  const valueSet = useMemo(() => new Set(value), [value])
  const filteredOptions = useMemo(() => {
    const value = searchValue.toLowerCase()

    return options.filter(({ label }) => label.toLowerCase().includes(value))
  }, [options, searchValue])

  const getValueLabel = () => {
    if (value.length === 0) {
      return noneSelectedLabel
    }
    if (value.length === options.length) {
      return allSelectedLabel
    }

    return `${value.length} selected`
  }

  return (
    <>
      <TextField
        size={size}
        name={name}
        id={id}
        onClick={toggle}
        mRef={setAnchorElement}
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
        value={getValueLabel()}
        inputTrailingIconLabel={isOpen ? 'Close' : 'Open'}
        inputTrailingIcon={isOpen ? ChevronUp : ChevronDown}
      />

      <Popover matchReferenceSize anchorElement={anchorElement} open={isOpen} onClose={close} className={styles.panel}>
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
      </Popover>
    </>
  )
}
