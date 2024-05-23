import React, { FocusEvent, ReactNode, useCallback, useMemo, useState, KeyboardEvent } from 'react'
import { Check, ChevronDown, ChevronUp, Minus } from 'react-feather'
import { useUID } from 'react-uid'
import cls from 'classnames'

import { Popover } from '../Popover'
import { Link } from '../Link'
import { SelectFieldOption } from './helpers'
import { TextField } from '../TextField'
import { HelpProps } from '../Help'
import { useOpenCloseState } from '../hooks'
import { TruncatedText } from '../TruncatedText'

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
  placeholderMode?: 'normal' | 'permanent'
  placeholder?: string
  disabled?: boolean
  required?: boolean
  labelClassName?: string
  errorClassName?: string
  'data-test': string
  noOptionsMessage?: string
  defaultOpen?: boolean
  id?: string
  searchInputProps?: {
    endAdornment?: ReactNode
    startAdornment?: ReactNode
  }
  filterOptions?: (candidate: SelectFieldOption<V>, input: string) => boolean
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
    size = 'small',
    placeholder = 'Search',
    placeholderMode = 'normal',
    label,
    showAriaLabel,
    disabled,
    helperText,
    className,
    error,
    onBlur,
    name,
    required,
    defaultOpen = false,
    'data-test': dataTest,
    allSelectedLabel = 'All selected',
    noneSelectedLabel = 'None selected',
    noOptionsMessage = 'No options',
    id: rootId,
    filterOptions,
    searchInputProps = {},
  } = props
  const id = useUID()
  const { isOpen, toggle, close } = useOpenCloseState(defaultOpen)
  const [searchValue, setSearchValue] = useState('')
  const [forceUpdateToken, setForceUpdateToken] = useState(1)
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null)

  const handleKeyPress = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        toggle()
      }
    },
    [toggle],
  )

  const valueSet = useMemo(() => new Set(value), [value])
  const filteredOptions = useMemo(() => {
    const value = searchValue.toLowerCase()

    return options.filter((option) => {
      if (filterOptions) {
        return filterOptions(option, value)
      }

      return option.label.toLowerCase().includes(value)
    })
  }, [options, searchValue, filterOptions])

  const getValueLabel = () => {
    if (placeholderMode === 'permanent') {
      return placeholder
    }
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
        id={rootId || id}
        onClick={toggle}
        onKeyPress={handleKeyPress}
        mRef={setAnchorElement}
        onChange={() => null}
        label={(label as string) || ''}
        disabled={disabled}
        showAriaLabel={showAriaLabel}
        helperText={helperText}
        className={cls(className, styles.opener, {
          [styles.withPermanentPlaceholder]: placeholderMode === 'permanent',
        })}
        error={error}
        onBlur={onBlur}
        readOnly
        required={required}
        data-test={`${dataTest}-opener`}
        value={getValueLabel()}
        inputTrailingIconLabel={isOpen ? 'Close' : 'Open'}
        inputTrailingIcon={isOpen ? ChevronUp : ChevronDown}
      />

      <Popover
        matchReferenceSize
        anchorElement={anchorElement}
        open={isOpen}
        onClose={close}
        className={styles.panel}
        onUpdateLayout={() => setForceUpdateToken((token) => token + 1)}
      >
        <div className={styles.dropdown} data-test={`${dataTest}-dropdown`}>
          <div className={styles.search}>
            {searchInputProps.startAdornment}
            <TextField
              size={size}
              iconSize="medium"
              className={styles.searchField}
              name="checkable-select-search"
              data-test={`${dataTest}-search`}
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              label=""
              disabled={disabled}
              placeholder={placeholder}
            />
            {searchInputProps.endAdornment}
          </div>
          <div className={styles.options}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
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
                    <TruncatedText text={option.label} forceUpdateToken={forceUpdateToken} />
                  </button>
                )
              })
            ) : (
              <span className={styles.noOptionsMessage} data-test={`${dataTest}-no-options-message`}>
                {noOptionsMessage}
              </span>
            )}
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
