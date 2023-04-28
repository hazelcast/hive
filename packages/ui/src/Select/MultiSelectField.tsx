import React, { FocusEvent, InputHTMLAttributes, ReactElement, useCallback, useEffect, useMemo, useRef } from 'react'
import ReactSelect, {
  ActionMeta,
  components as rsComponents,
  GroupedOptionsType,
  Props as ReactSelectProps,
  ValueType,
  OptionsType,
  SelectComponentsConfig,
} from 'react-select'
import ReactSelectCreatable from 'react-select/creatable'
import { useUID } from 'react-uid'
import { X } from 'react-feather'
import useIsomorphicLayoutEffect from 'react-use/lib/useIsomorphicLayoutEffect'
import cn from 'classnames'
import { DataTestProp } from '@hazelcast/helpers'

import { Error, errorId } from '../Error'
import { Icon } from '../Icon'
import { SelectFieldOption, getMenuContainer, getOptionsMap, SelectFieldOptionsMap } from './helpers'
import { components, RenderMenuFooterFunction } from './Common'
import { FieldHeader, FieldHeaderProps } from '../FieldHeader'
import { useCloseOnResize } from '../hooks/useCloseOnResize'

import styles from './SelectField.module.scss'
import multiStyles from './MultiSelectField.module.scss'

// Self styled version of the MultiValue/Label
const MultiValueLabel: typeof rsComponents.MultiValueLabel = ({ children }) => <div className={multiStyles.multiValueLabel}>{children}</div>

// Self styled version of the MultiValue/Remove button
const MultiValueRemove: typeof rsComponents.MultiValueRemove = (props) => {
  // We have to pass down the onClick
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,  @typescript-eslint/no-unsafe-assignment
  const onClick: React.MouseEventHandler = props.innerProps.onClick

  const handleMouseDown = (event: React.MouseEvent) => {
    // prevent opening the dropdown
    event.preventDefault()
    event.stopPropagation()
  }

  const handleClick = (event: React.MouseEvent) => {
    event.button === 0 && onClick && onClick(event)
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className={cn(multiStyles.multiValueRemove, { [multiStyles.disabled]: true })}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      role="button"
      tabIndex={-1}
      aria-label="Remove"
    >
      <Icon icon={X} size="small" ariaHidden />
    </div>
  )
}

// We simply inject `.multiValueIsFocused`.
const MultiValue: typeof rsComponents.MultiValue = (props) => (
  <rsComponents.MultiValue
    {...props}
    className={cn(multiStyles.multiValue, { [multiStyles.multiValueIsFocused]: props.isFocused, [multiStyles.disabled]: props.isDisabled })}
  />
)

export type MultiSelectFieldCoreStaticProps<V> = {
  name: string
  onBlur?: (e: FocusEvent<HTMLElement>) => void
  error?: string
  value: V[]
  onChange: (newValue: V[]) => void
  components?: Partial<SelectComponentsConfig<SelectFieldOption<V>, true>>
}

export type MultiSelectFieldExtraProps<V> = {
  options: GroupedOptionsType<SelectFieldOption<V>> | OptionsType<SelectFieldOption<V>>
  // Since the user input is string, let's allow creatable only for string
  isCreatable?: V extends string ? boolean : false
  className?: string
  placeholder?: string
  errorClassName?: string
  menuPortalTarget?: 'body' | 'self' | HTMLElement | null
  formatGroupLabel?: ReactSelectProps<SelectFieldOption<V>, true>['formatGroupLabel']
  formatOptionLabel?: ReactSelectProps<SelectFieldOption<V>, true>['formatOptionLabel']
  renderMenuFooter?: RenderMenuFooterFunction
  styles?: ReactSelectProps<SelectFieldOption<V>, true>['styles']
} & DataTestProp &
  Pick<InputHTMLAttributes<HTMLElement>, 'autoFocus' | 'disabled' | 'required' | 'placeholder'> &
  Pick<
    ReactSelectProps,
    | 'isSearchable'
    | 'menuIsOpen'
    | 'menuPlacement'
    | 'noOptionsMessage'
    | 'inputValue'
    | 'closeMenuOnSelect'
    | 'hideSelectedOptions'
    | 'isClearable'
    | 'onInputChange'
  > &
  Omit<FieldHeaderProps, 'id'>

export type MultiSelectProps<V> = MultiSelectFieldCoreStaticProps<V> & MultiSelectFieldExtraProps<V>

export const MultiSelectField = <V extends string | number = number>(props: MultiSelectProps<V>): ReactElement<MultiSelectProps<V>> => {
  const {
    'data-test': dataTest,
    className,
    disabled,
    error,
    errorClassName,
    helperText,
    isCreatable,
    isSearchable = true,
    label,
    labelClassName,
    showAriaLabel = false,
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
    components: customComponents,
    ...rest
  } = props
  const id = useUID()

  useIsomorphicLayoutEffect(() => {
    const menuContainer = getMenuContainer(menuPortalTarget)

    if (menuContainer && !menuContainer.className.includes(styles.menuContainer)) {
      menuContainer.className = `${menuContainer.className} ${styles.menuContainer}`
    }
  }, [menuPortalTarget])

  const optionsMap = useMemo<SelectFieldOptionsMap<V>>(() => getOptionsMap<V>(options), [options])

  const selectedOptions = useMemo<SelectFieldOption<V>[]>(
    () => value.map((val) => optionsMap[val] ?? { value: val, label: val }),
    [optionsMap, value],
  )

  const onChangeWrapped = useCallback(
    (selectedOptions: readonly SelectFieldOption<V>[]) => {
      onChange(selectedOptions.map(({ value }) => value))
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

  useCloseOnResize(selectRef)

  const selectProps: ReactSelectProps<SelectFieldOption<V>, true> = {
    ref: selectRef,
    inputId: id,
    className: 'hz-select-field',
    classNamePrefix: 'hz-select-field',
    'aria-label': showAriaLabel ? label : undefined,
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-invalid_attribute
    'aria-errormessage': error && errorId(id),
    'aria-invalid': !!error,
    'aria-required': required,
    isDisabled: disabled,
    isSearchable: isSearchable,
    isClearable: true,
    isMulti: true,
    name: name,
    value: selectedOptions,
    options,
    onChange: onChangeWrapped as (value: ValueType<SelectFieldOption<V>, true>, action: ActionMeta<SelectFieldOption<V>>) => void,
    placeholder,
    menuIsOpen,
    menuPlacement,
    menuPortalTarget: getMenuContainer(menuPortalTarget),
    components: {
      MultiValueLabel,
      MultiValueRemove,
      MultiValue,
      ...components,
      ...customComponents,
    },
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
          [styles.withError]: 'error' in props,
          [styles.small]: rest.size === 'small',
          [multiStyles.small]: rest.size === 'small',
        },
        multiStyles.multiContainer,
        className,
      )}
    >
      <FieldHeader
        id={id}
        label={label}
        size={rest.size}
        helperText={helperText}
        showAriaLabel={showAriaLabel}
        labelClassName={labelClassName}
      />
      <div className={styles.selectBlock}>
        {isCreatable ? (
          <ReactSelectCreatable<SelectFieldOption<V>, true> {...selectProps} />
        ) : (
          <ReactSelect<SelectFieldOption<V>, true> {...selectProps} />
        )}
      </div>
      <Error truncated error={error} className={cn(styles.errorContainer, errorClassName)} inputId={id} />
    </div>
  )
}
