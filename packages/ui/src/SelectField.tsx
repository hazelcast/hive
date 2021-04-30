import { DataTestProp } from '@hazelcast/helpers'
import React, { FocusEvent, InputHTMLAttributes, ReactElement, useMemo } from 'react'
import cn from 'classnames'
import ReactSelect, {
  ActionMeta,
  components,
  MultiValueProps,
  GroupedOptionsType,
  Props as ReactSelectProps,
  ValueType,
  OptionsType,
} from 'react-select'
import ReactSelectCreatable from 'react-select/creatable'
import { ChevronDown, X } from 'react-feather'
import useIsomorphicLayoutEffect from 'react-use/lib/useIsomorphicLayoutEffect'
import { useUID } from 'react-uid'

import { Error, errorId } from './Error'
import { Label } from './Label'
import { Help, HelpProps } from './Help'
import { Icon, IconProps } from './Icon'
import { IconButton } from './IconButton'
import { canUseDOM } from './utils/ssr'

import styles from './SelectField.module.scss'
import { GroupType } from 'react-select/src/types'

export type SelectFieldOption<V> = {
  label: string
  value: V
}

const DropdownIndicator = () => <Icon icon={ChevronDown} ariaHidden size="normal" className={styles.chevron} />

// innerProps set event handling
const ClearIndicator = ({ innerProps }: React.ComponentProps<typeof components.ClearIndicator>) => {
  // Visually impaired people will use the keyboard (backspace) to remove the value. We do not want to confuse them by allowing to focus this button.
  return <IconButton {...innerProps} icon={X} ariaHidden kind="primary" size="normal" className={styles.clear} tabIndex={-1} />
}

const Input = (innerProps: React.ComponentProps<typeof components.Input>) => {
  // autoComplete='off' is hard-coded inside SelectField, but doesn't work in Chrome.
  // Having an invalid value hard-coded disabled it in all browsers.
  const props = {
    ...innerProps,
    autoComplete: 'chrome-off',
  }
  return <components.Input {...props} />
}

// This component is implemented because we want to style things with the css (as opposed to the react-select
// recommended way of styling things via js).
//
// We simply inject `.multiValueIsFocused`.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MultiValue = (props: MultiValueProps<any>) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  props.components.Remove = MultiValueRemove

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  props.components.Label = MultiValueLabel

  return <components.MultiValue {...props} className={cn(styles.multiValue, { [styles.multiValueIsFocused]: props.isFocused })} />
}

// Self styled version of the MultiValue/Label
const MultiValueLabel = (props: React.ComponentProps<typeof components.MultiValueLabel>) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,  @typescript-eslint/no-unsafe-assignment
  const children = props.children
  return <div className={cn(styles.multiValueLabel)}> {children} </div>
}

// Self styled version of the MultiValue/Remove button
const MultiValueRemove = (props: React.ComponentProps<typeof components.MultiValueRemove>) => {
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
      className={cn(styles.multiValueRemove)}
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

interface SelectFieldOptionsMap<V> {
  [key: string]: SelectFieldOption<V>
}

export type SelectFieldCoreStaticProps = {
  name: string
  onBlur?: (e: FocusEvent<HTMLElement>) => void
  error?: string
}

export type SelectFieldCoreDynamicProps<V> =
  | {
      isClearable: true
      isMulti?: false
      value: V | null
      onChange: (newValue: V | null) => void
    }
  | {
      isClearable?: false
      isMulti?: false
      value: V
      onChange: (newValue: V) => void
    }
  | {
      isMulti: true
      value: V[]
      onChange: (newValue: V[]) => void
    }

// Since the user input is string, let's allow creatable only for string
type SelectFieldCreatableProps<V> = V extends string
  ? {
      isCreatable?: boolean
    }
  : {
      isCreatable?: false
    }

function isSimpleOption<V>(option: GroupType<SelectFieldOption<V>> | SelectFieldOption<V>): option is SelectFieldOption<V> {
  return !!(option as SelectFieldOption<V>).value
}

function isOptionsGroup<V>(option: GroupType<SelectFieldOption<V>> | SelectFieldOption<V>): option is GroupType<SelectFieldOption<V>> {
  return !!(option as GroupType<SelectFieldOption<V>>).options
}

function isMultipleModeGuard<V>(value: V | V[] | null, isMultiple: boolean): value is V[] {
  return isMultiple
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

export type SelectFieldExtraProps<V> = {
  isCreatable?: boolean
  isClearable?: boolean
  options: GroupedOptionsType<SelectFieldOption<V>> | OptionsType<SelectFieldOption<V>>
  label: string
  helperText?: HelpProps['helperText']
  className?: string
  placeholder?: string
  labelClassName?: string
  errorClassName?: string
  menuPortalTarget?: 'body' | 'self' | HTMLElement | null
} & DataTestProp &
  Pick<InputHTMLAttributes<HTMLElement>, 'autoFocus' | 'disabled' | 'required' | 'placeholder'> &
  Pick<ReactSelectProps, 'isSearchable' | 'menuIsOpen' | 'menuPlacement' | 'noOptionsMessage' | 'inputValue'> &
  SelectFieldIconLeftProps

export type SelectProps<V> = SelectFieldCoreStaticProps &
  SelectFieldCoreDynamicProps<V> &
  SelectFieldExtraProps<V> &
  SelectFieldCreatableProps<V>

const getMenuContainer = (menuPortalTarget: 'body' | 'self' | HTMLElement | null): HTMLElement | null | undefined => {
  if (menuPortalTarget == 'body') {
    // There is no document is SSR environment
    return canUseDOM ? document.body : undefined
  }
  if (menuPortalTarget == 'self') {
    return undefined
  }
  return menuPortalTarget
}

type GetSelectedOptionFromValueProps<V> = {
  value: V | V[] | null
  optionsMap: SelectFieldOptionsMap<V>
  isMulti: boolean
}

/**
 * Transforms the value passed to our Select component so that it's in a format as underlying react-select expects
 * @param value - single value or an array of values
 * @param optionsMap - an object where option values are mapped to react-select expected objects
 * @param isMulti - boolean indicating whether we're in a multiple mode or not
 */
export function getSelectedOptionFromValue<V extends string | number>({
  value,
  optionsMap,
  isMulti,
}: GetSelectedOptionFromValueProps<V>): SelectFieldOption<V> | SelectFieldOption<V>[] | null {
  if (isMultipleModeGuard(value, isMulti)) {
    // if it's multi value, let's transform a value array to an array containing SelectFieldOptions
    return value.map((val) => optionsMap[val] ?? { value: val, label: val })
  } else {
    if (value === null) {
      return null
    }
    return optionsMap[value] ?? { value: value, label: value }
  }
}

export const SelectField = <V extends string | number = string>({
  'data-test': dataTest,
  className,
  disabled,
  error,
  errorClassName,
  helperText,
  isClearable,
  isCreatable = false,
  isMulti = false,
  isSearchable = true,
  label,
  labelClassName,
  menuPortalTarget = 'body',
  name,
  onChange,
  options,
  placeholder,
  required,
  value,
  ...iconAndRest
}: SelectProps<V>): ReactElement<SelectProps<V>> => {
  const id = useUID()

  const { iconLeft, iconLeftAriaLabel, iconLeftClassName, iconLeftContainerClassName, ...rest } = iconAndRest

  useIsomorphicLayoutEffect(() => {
    const menuContainer = getMenuContainer(menuPortalTarget)

    if (menuContainer && !menuContainer.className.includes(styles.menuContainer)) {
      menuContainer.className = `${menuContainer.className} ${styles.menuContainer}`
    }
  }, [menuPortalTarget])

  const optionsMap = React.useMemo<SelectFieldOptionsMap<V>>(
    () =>
      // need this type assertion because of the TS issue https://github.com/microsoft/TypeScript/issues/7294
      (options as Array<GroupType<SelectFieldOption<V>> | SelectFieldOption<V>>).reduce(
        (
          acc: SelectFieldOptionsMap<V>,
          optionOrGroup: GroupType<SelectFieldOption<V>> | SelectFieldOption<V>,
        ): SelectFieldOptionsMap<V> => {
          // if it's a simple non-group option
          if (isSimpleOption(optionOrGroup)) {
            acc[optionOrGroup.value] = optionOrGroup
            // else it's a group option
          } else if (isOptionsGroup(optionOrGroup)) {
            optionOrGroup.options.reduce((innerAcc: SelectFieldOptionsMap<V>, option: SelectFieldOption<V>) => {
              innerAcc[option.value] = option
              return innerAcc
            }, acc)
          }
          return acc
        },
        {} as SelectFieldOptionsMap<V>,
      ),
    [options],
  )

  const onChangeMultipleFn = React.useCallback(
    (values: SelectFieldOption<V>[]) => {
      ;(onChange as (newValue: V[]) => void)(values.map(({ value }) => value))
    },
    [onChange],
  )

  const onChangeFn = React.useCallback(
    (option: SelectFieldOption<V> | null) => {
      ;(onChange as (newValue: V | null) => void)(option === null ? null : option.value)
    },
    [onChange],
  )

  const selectedOption = useMemo(
    () => getSelectedOptionFromValue<V>({ optionsMap, value, isMulti }),
    [optionsMap, isMulti, value],
  )

  const props: ReactSelectProps<SelectFieldOption<V>> = {
    inputId: id,
    className: 'hz-select-field',
    classNamePrefix: 'hz-select-field',
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-invalid_attribute
    'aria-errormessage': error && errorId(id),
    'aria-invalid': !!error,
    'aria-required': required,
    isClearable: isClearable ?? false,
    isDisabled: disabled,
    isSearchable: isSearchable,
    isMulti: isMulti,
    name: name,
    value: selectedOption,
    options,
    onChange: (isMulti ? onChangeMultipleFn : onChangeFn) as (
      value: ValueType<SelectFieldOption<V>>,
      action: ActionMeta<SelectFieldOption<V>>,
    ) => void,
    placeholder,
    menuPortalTarget: getMenuContainer(menuPortalTarget),
    components: {
      DropdownIndicator,
      ClearIndicator,
      Input,
      MultiValue,
    },
    ...rest,
  }

  return (
    <div
      data-test={dataTest}
      className={cn(
        styles.container,
        {
          [styles.disabled]: disabled,
          [styles.hasError]: error,
          [styles.empty]: !value,
          [styles.multiContainer]: isMulti,
        },
        // Menu container is either this select itself or any other element
        // We can always add this class to the select itself because even if the menu container is any parent it won't break it
        // However, if it is the select itself, it will properly add necessary specificity level to the menu styles.
        styles.menuContainer,
        className,
      )}
    >
      <Label id={id} label={label} className={cn(styles.label, labelClassName)} />
      <div className={styles.selectBlock}>
        {iconLeft && iconLeftAriaLabel && (
          <Icon
            containerClassName={cn(styles.iconLeftContainer, iconLeftContainerClassName)}
            icon={iconLeft}
            ariaLabel={iconLeftAriaLabel}
            data-test="select-field-icon-left"
            className={cn(styles.iconLeft, iconLeftClassName)}
          />
        )}
        {isCreatable ? <ReactSelectCreatable<SelectFieldOption<V>> {...props} /> : <ReactSelect<SelectFieldOption<V>> {...props} />}
        {helperText && <Help parentId={id} helperText={helperText} className={styles.helperText} />}
      </div>
      <Error error={error} className={cn(styles.errorContainer, errorClassName)} inputId={id} />
    </div>
  )
}
