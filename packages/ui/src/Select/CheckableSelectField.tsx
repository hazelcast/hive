import React, { ReactNode } from 'react'
import cls from 'classnames'
import { components, MenuProps, OptionProps, ValueContainerProps } from 'react-select'
import { Check, Minus } from 'react-feather'

import { Link } from '../Link'
import { MultiSelectField, MultiSelectProps, MultiSelectFieldExtraProps } from './MultiSelectField'

import styles from './CheckableSelectField.module.scss'
import { getOptionsMap, SelectFieldOption } from './helpers'

export type CheckableSelectProps<V extends string | number> = MultiSelectProps<V>
export type CheckableSelectFieldExtraProps<V> = MultiSelectFieldExtraProps<V>

export interface CheckMarkProps {
  checked: boolean
}

const Checkmark = ({ checked }: CheckMarkProps) => {
  const classNames = cls(styles.checkmark, { [styles.checked]: checked })

  return checked ? <Check className={classNames} /> : <Minus className={classNames} />
}
const CustomOption = <V extends string | number>(optionProps: OptionProps<SelectFieldOption<V>>) => {
  const { label, isSelected, innerProps, innerRef } = optionProps

  return (
    <div ref={innerRef} className={styles.option} {...innerProps}>
      <Checkmark checked={isSelected} />
      {label}
    </div>
  )
}
const CustomMenu = <V extends string | number>({ children, ...rest }: MenuProps<SelectFieldOption<V>>) => {
  return (
    <components.Menu {...rest}>
      <div>
        <div className={styles.options}>{children}</div>
        <div className={styles.bottom}>
          <Link
            component="button"
            data-test={`${dataTest}-select-all`}
            onClick={() => rest.setValue(Object.values(getOptionsMap(rest.options)), 'set-value')}
          >
            Select all
          </Link>
          <Link component="button" data-test={`${dataTest}-select-none`} onClick={() => rest.setValue([], 'set-value')}>
            Select none
          </Link>
        </div>
      </div>
    </components.Menu>
  )
}
const CustomValueContainer = <V extends string | number>({ children, ...props }: ValueContainerProps<SelectFieldOption<V>>) => {
  const value = props.getValue()
  let content: ReactNode = null

  if (value && Array.isArray(value) && value.length) {
    // value is displayed instead of original MultiValue components
    content = <span>{value.length} selected</span>
  }

  return (
    <components.ValueContainer {...props}>
      {content}
      {children}
    </components.ValueContainer>
  )
}

const dataTest = 'checkable-select'

export const CheckableSelectField = <V extends string | number = number>(props: CheckableSelectProps<V>) => {
  const { options, onChange, value, className, ...rest } = props

  return (
    <MultiSelectField<V>
      {...rest}
      isSearchable
      data-test={dataTest}
      options={options}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      isClearable={false}
      placeholder="Search"
      onChange={onChange}
      className={cls(styles.wrapper, className)}
      value={value}
      components={{
        ValueContainer: CustomValueContainer,
        Menu: CustomMenu,
        Option: CustomOption,
      }}
    />
  )
}
