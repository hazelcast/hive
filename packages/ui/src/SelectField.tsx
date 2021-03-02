import { DataTestProp } from '@hazelcast/helpers'
import React, { FocusEvent, InputHTMLAttributes, ReactElement, useMemo } from 'react'
import cn from 'classnames'
import ReactSelect, { ActionMeta, components, MultiValueProps, Props as ReactSelectProps, ValueType } from 'react-select'
import ReactSelectCreatable from 'react-select/creatable'
import { ChevronDown, X } from 'react-feather'
import useIsomorphicLayoutEffect from 'react-use/lib/useIsomorphicLayoutEffect'
import { useUID } from 'react-uid'

import { Error, errorId } from './Error'
import { Label } from './Label'
import { Help } from './Help'
import { Icon } from './Icon'
import { IconButton } from './IconButton'
import { canUseDOM } from './utils/ssr'

import styles from './SelectField.module.scss'

const DropdownIndicator = () => <Icon icon={ChevronDown} ariaHidden size="normal" className={styles.chevron} />

// innerProps set event handling
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ClearIndicator = ({ innerProps }: any) => {
  // Visually impaired people will use the keyboard (backspace) to remove the value. We do not want to confuse them by allowing to focus this button.
  return <IconButton {...innerProps} icon={X} ariaHidden kind="primary" size="normal" className={styles.clear} tabIndex={-1} />
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Input = (props: any) => {
  // autoComplete='off' is hard-coded inside SelectField, but doesn't work in Chrome.
  // Having an invalid value hard-coded disabled it in all browsers.
  return <components.Input {...props} autoComplete="chrome-off" />
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
//
// refactor: newer react-select packages have better typings for this.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MultiValueLabel = (props: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,  @typescript-eslint/no-unsafe-assignment
  const children = props.children
  return <div className={cn(styles.multiValueLabel)}> {children} </div>
}

// Self styled version of the MultiValue/Remove button
//
// refactor: newer react-select packages have better typings for this.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MultiValueRemove = (props: any) => {
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

export type SelectFieldOption<V = string> = {
  label: string
  value: V
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
      isClearable: true
      isMulti: true
      value: V[] | null
      onChange: (newValue: V[] | null) => void
    }
  | {
      isClearable?: false
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

function isMultipleModeGuard<V>(value: V | V[], isMultiple: boolean): value is V[] {
  return isMultiple
}

function isCreatableGuard(value: unknown, isCreatable: boolean): value is string | string[] {
  return isCreatable
}

export type SelectFieldExtraProps<V> = {
  isCreatable?: boolean
  options: SelectFieldOption<V>[]
  label: string
  helperText?: string | ReactElement
  className?: string
  labelClassName?: string
  errorClassName?: string
  menuPortalTarget?: 'body' | 'self' | HTMLElement | null
} & DataTestProp &
  Pick<InputHTMLAttributes<HTMLElement>, 'autoFocus' | 'disabled' | 'required' | 'placeholder'> &
  Pick<ReactSelectProps, 'isSearchable' | 'menuIsOpen' | 'menuPlacement' | 'noOptionsMessage' | 'inputValue'>

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

export const SelectField = <V,>({
  'data-test': dataTest,
  labelClassName,
  className,
  error,
  errorClassName,
  isMulti = false,
  isClearable,
  disabled,
  isSearchable = true,
  isCreatable = false,
  label,
  name,
  required,
  value,
  onChange,
  helperText,
  menuPortalTarget = 'body',
  options,
  ...rest
}: SelectProps<V>): ReactElement<SelectProps<V>> => {
  const id = useUID()

  useIsomorphicLayoutEffect(() => {
    const menuContainer = getMenuContainer(menuPortalTarget)

    if (menuContainer && !menuContainer.className.includes(styles.menuContainer)) {
      menuContainer.className = `${menuContainer.className} ${styles.menuContainer}`
    }
  }, [menuPortalTarget])

  const onChangeMultipleFn = React.useCallback(
    (values: SelectFieldOption<V>[] | null) => {
      ;(onChange as (newValue: V[] | null) => void)(values === null ? null : values.map(({ value }) => value))
    },
    [onChange],
  )

  const onChangeFn = React.useCallback(
    (option: SelectFieldOption<V | null>) => {
      ;(onChange as (newValue: V | null) => void)(option === null ? null : option.value)
    },
    [onChange],
  )

  const onCreateOption = React.useCallback(
    (newValue) => {
      if (isCreatableGuard(value, isCreatable)) {
        ;(onChange as (newValue: string[] | null) => void)([...value, newValue])
      } else {
        ;(onChange as (newValue: string | null) => void)(newValue)
      }
    },
    [onChange, value],
  )

  const selectedOption = useMemo(() => {
    if (isMultipleModeGuard(value, isMulti)) {
      // if it's multi value, let's transform a value array to an array containing SelectFieldOptions
      return (
        value?.map((val) => ({
          value: val,
          // we need to find instead of value: object mapping so that we can support objects as values
          label: (options.find(({ value }) => value === val) as SelectFieldOption<V>)?.label ?? val,
        })) ?? []
      )
    } else {
      if (value === null) {
        return null
      }

      // if it's single value, let's pick a SelectFieldOption from the available options based on a value
      return (
        options.find((option) => option.value === value) ?? {
          value,
          label: value,
        }
      )
    }
  }, [options, isMulti, value]) as SelectFieldOption<V> | SelectFieldOption<V>[] | undefined

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
      <Label id={id} label={label} className={labelClassName} />
      <div className={styles.selectBlock}>
        {isCreatableGuard(value, isCreatable) ? (
          <ReactSelectCreatable<SelectFieldOption<V>> {...props} onCreateOption={onCreateOption} />
        ) : (
          <ReactSelect<SelectFieldOption<V>> {...props} />
        )}
        {helperText && <Help parentId={id} helperText={helperText} className={styles.helperText} />}
      </div>
      <Error error={error} className={cn(styles.errorContainer, errorClassName)} inputId={id} />
    </div>
  )
}
