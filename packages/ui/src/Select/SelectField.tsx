import React, { FocusEvent, InputHTMLAttributes, ReactElement, useCallback, useEffect, useMemo, useRef } from 'react'
import ReactSelect, { ActionMeta, GroupedOptionsType, Props as ReactSelectProps, ValueType, OptionsType } from 'react-select'
import ReactSelectCreatable from 'react-select/creatable'
import { useUID } from 'react-uid'
import useIsomorphicLayoutEffect from 'react-use/lib/useIsomorphicLayoutEffect'
import cn from 'classnames'
import { DataTestProp } from '@hazelcast/helpers'

import { Error, errorId } from '../Error'
import { FieldHeader, FieldHeaderProps } from '../FieldHeader'
import { Icon, IconProps } from '../Icon'
import { getMenuContainer, getOptionsMap, SelectFieldOption, SelectFieldOptionsMap } from './helpers'
import { components, RenderMenuFooterFunction } from './Common'
import { components as rsComponents } from 'react-select'
import { useCloseOnResize } from '../hooks/useCloseOnResize'

import styles from './SelectField.module.scss'

export type SelectFieldCoreStaticProps<V> = {
  name: string
  onBlur?: (e: FocusEvent<HTMLElement>) => void
  error?: string
  value: V | null
  onChange: (value: V | null) => void
}

// Left icon is always present with proper aria-label attribute
export type SelectFieldIconLeftProps =
  | {
      iconLeft: IconProps['icon']
      iconLeftAriaLabel: string
      iconLeftClassName?: string
      iconLeftContainerClassName?: string
    }
  | {
      iconLeft?: never
      iconLeftAriaLabel?: never
      iconLeftClassName?: never
      iconLeftContainerClassName?: never
    }

export type SelectFieldSize = 'small' | 'medium'

export type SelectFieldExtraProps<V> = {
  options: GroupedOptionsType<SelectFieldOption<V>> | OptionsType<SelectFieldOption<V>>
  size?: SelectFieldSize
  // Since the user input is string, let's allow creatable only for string
  isCreatable?: V extends string ? boolean : false
  className?: string
  placeholder?: string
  errorClassName?: string
  menuPortalTarget?: 'body' | 'self' | HTMLElement | null
  formatGroupLabel?: ReactSelectProps<SelectFieldOption<V>>['formatGroupLabel']
  formatOptionLabel?: ReactSelectProps<SelectFieldOption<V>>['formatOptionLabel']
  renderMenuFooter?: RenderMenuFooterFunction
  styles?: ReactSelectProps<SelectFieldOption<V>>['styles']
  singleValueTooltipVisible?: boolean
} & DataTestProp &
  Pick<InputHTMLAttributes<HTMLElement>, 'autoFocus' | 'disabled' | 'required' | 'placeholder'> &
  Pick<
    ReactSelectProps,
    'isSearchable' | 'isClearable' | 'menuIsOpen' | 'menuPlacement' | 'closeMenuOnScroll' | 'noOptionsMessage' | 'inputValue'
  > &
  SelectFieldIconLeftProps &
  Omit<FieldHeaderProps, 'id'>

export type SelectFieldProps<V> = SelectFieldCoreStaticProps<V> & SelectFieldExtraProps<V>

export const SelectField = <V extends string | number = string>(props: SelectFieldProps<V>): ReactElement<SelectFieldProps<V>> => {
  const {
    'data-test': dataTest,
    className,
    disabled,
    error,
    errorClassName,
    helperText,
    isClearable = false,
    isCreatable,
    isSearchable = true,
    label,
    labelClassName,
    showAriaLabel = false,
    size = 'medium',
    menuIsOpen,
    menuPortalTarget = 'body',
    menuPlacement = 'auto',
    name,
    onChange,
    options,
    placeholder,
    required,
    value,
    formatGroupLabel,
    formatOptionLabel,
    renderMenuFooter,
    singleValueTooltipVisible = true,
    ...iconAndRest
  } = props
  const id = useUID()

  const { iconLeft, iconLeftAriaLabel, iconLeftClassName, iconLeftContainerClassName, ...rest } = iconAndRest

  useIsomorphicLayoutEffect(() => {
    const menuContainer = getMenuContainer(menuPortalTarget)

    if (menuContainer && !menuContainer.className.includes(styles.menuContainer)) {
      menuContainer.className = `${menuContainer.className} ${styles.menuContainer}`
    }
  }, [menuPortalTarget])

  const optionsMap = useMemo<SelectFieldOptionsMap<V>>(() => getOptionsMap(options), [options])

  /**
   * Three (3) cases here:
   * 1. No option is selected
   * 2. An existing option is selected
   * 3. A created option is selected
   */
  const selectedOption = useMemo<SelectFieldOption<V> | null>(
    () => (value === null ? null : optionsMap[value] ?? { value: value, label: value }),
    [optionsMap, value],
  )

  const onChangeWrapped = useCallback(
    (option: SelectFieldOption<V> | null) => {
      onChange(option?.value ?? null)
    },
    [onChange],
  )

  /** Recipe: https://react-select.com/advanced#controlled-props */
  const selectRef = useRef<ReactSelect>()
  useEffect(() => {
    if (selectRef.current) {
      menuIsOpen ? selectRef.current.onMenuOpen() : selectRef.current.onMenuClose()
    }
  }, [menuIsOpen])

  const innerComponents = useMemo(
    () =>
      singleValueTooltipVisible
        ? components
        : {
            ...components,
            SingleValue: rsComponents.SingleValue,
          },
    [singleValueTooltipVisible],
  )

  useCloseOnResize(selectRef)

  const selectProps: ReactSelectProps<SelectFieldOption<V>> = {
    ref: selectRef,
    inputId: id,
    className: 'hz-select-field',
    classNamePrefix: 'hz-select-field',
    'aria-label': showAriaLabel ? label : undefined,
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-invalid_attribute
    'aria-errormessage': error && errorId(id),
    'aria-invalid': !!error,
    'aria-required': required,
    isClearable,
    isSearchable,
    isDisabled: disabled,
    name: name,
    value: selectedOption,
    options,
    onChange: onChangeWrapped as (value: ValueType<SelectFieldOption<V>, false>, action: ActionMeta<SelectFieldOption<V>>) => void,
    placeholder,
    menuIsOpen,
    menuPlacement,
    menuPortalTarget: getMenuContainer(menuPortalTarget),
    components: innerComponents,
    formatGroupLabel,
    formatOptionLabel,
    renderMenuFooter,
    ...rest,
  }

  return (
    <div
      data-test={dataTest}
      className={cn(
        styles.container,
        // Menu container is either this select itself or any other element
        // We can always add this class to the select itself because even if the menu container is any parent it won't break it
        // However, if it is the select itself, it will properly add necessary specificity level to the menu styles.
        styles.menuContainer,
        {
          [styles.disabled]: disabled,
          [styles.hasError]: error,
          [styles.empty]: !value,
          [styles.hasIcon]: !!iconLeft,
          [styles.small]: size === 'small',
          [styles.withError]: 'error' in props,
        },
        className,
      )}
    >
      <FieldHeader
        label={label}
        id={id}
        size={size}
        helperText={helperText}
        showAriaLabel={showAriaLabel}
        labelClassName={labelClassName}
      />
      <div className={styles.selectBlock}>
        {iconLeft && iconLeftAriaLabel && (
          <Icon
            containerClassName={cn(styles.iconLeftContainer, iconLeftContainerClassName)}
            icon={iconLeft}
            size={size}
            ariaLabel={iconLeftAriaLabel}
            data-test="select-field-icon-left"
            className={cn(styles.iconLeft, iconLeftClassName)}
          />
        )}
        {isCreatable ? (
          <ReactSelectCreatable<SelectFieldOption<V>> {...selectProps} />
        ) : (
          <ReactSelect<SelectFieldOption<V>> {...selectProps} />
        )}
      </div>
      <Error truncated error={error} className={cn(styles.errorContainer, errorClassName)} inputId={id} />
    </div>
  )
}
