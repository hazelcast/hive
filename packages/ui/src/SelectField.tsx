import { DataTestProp } from '@hazelcast/helpers'
import React, { FocusEvent, InputHTMLAttributes, ReactElement, CSSProperties } from 'react'
import cn from 'classnames'
import ReactSelect, { ActionMeta, components, IndicatorProps, Props as ReactSelectProps, ValueType } from 'react-select'
import { ChevronDown, X } from 'react-feather'
import useIsomorphicLayoutEffect from 'react-use/lib/useIsomorphicLayoutEffect'
import { useUID } from 'react-uid'

import { Error, errorId } from './Error'
import { Label } from './Label'
import { Help } from './Help'
import { Icon } from './Icon'
import { IconButton } from './IconButton'
import { canUseDOM } from './utils/ssr'

import styleConsts from '../styles/constants/export.module.scss'
import styles from './SelectField.module.scss'

const DropdownIndicator = () => <Icon icon={ChevronDown} ariaHidden size="normal" className={styles.chevron} />

// innerProps set event handling
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ClearIndicator = ({ innerProps }: IndicatorProps<SelectFieldOption<any>>) => {
  // Visually impaired people will use the keyboard (backspace) to remove the value. We do not want to confuse them by allowing to focus this button.
  return <IconButton {...innerProps} icon={X} ariaHidden kind="primary" size="normal" className={styles.clear} tabIndex={-1} />
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Input = (props: any) => {
  // autoComplete='off' is hard-coded inside SelectField, but doesn't work in Chrome.
  // Having an invalid value hard-coded disabled it in all browsers.
  return <components.Input {...props} autoComplete="chrome-off" />
}

export type SelectFieldOption<V = string> = {
  label: string
  value: V
}

export type SelectFieldValue<V = string> = SelectFieldOption<V> | SelectFieldOption<V>[]

export type SelectFieldCoreStaticProps = {
  name: string
  onBlur?: (e: FocusEvent<HTMLElement>) => void
  error?: string
  isMulti?: boolean
}

export type SelectFieldCoreDynamicProps<V> =
  | {
      isClearable: true
      value: SelectFieldValue<V> | null
      onChange: (newValue: SelectFieldValue<V> | null) => void
    }
  | {
      isClearable?: false
      value: SelectFieldValue<V>
      onChange: (newValue: SelectFieldValue<V>) => void
    }

export type SelectFieldExtraProps<V> = {
  options: SelectFieldOption<V>[]
  label: string
  helperText?: string | ReactElement
  className?: string
  errorClassName?: string
  menuPortalTarget?: 'body' | 'self' | HTMLElement | null
} & DataTestProp &
  Pick<InputHTMLAttributes<HTMLElement>, 'autoFocus' | 'disabled' | 'required' | 'placeholder'> &
  Pick<ReactSelectProps, 'isSearchable' | 'menuIsOpen' | 'menuPlacement' | 'noOptionsMessage' | 'inputValue'>

export type SelectProps<V> = SelectFieldCoreStaticProps & SelectFieldCoreDynamicProps<V> & SelectFieldExtraProps<V>

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
  className,
  error,
  errorClassName,
  isMulti = false,
  isClearable,
  disabled,
  isSearchable = true,
  label,
  name,
  required,
  value,
  onChange,
  helperText,
  menuPortalTarget = 'body',
  ...rest
}: SelectProps<V>): ReactElement<SelectProps<V>> => {
  const id = useUID()

  useIsomorphicLayoutEffect(() => {
    const menuContainer = getMenuContainer(menuPortalTarget)

    if (menuContainer && !menuContainer.className.includes(styles.menuContainer)) {
      menuContainer.className = `${menuContainer.className} ${styles.menuContainer}`
    }
  }, [menuPortalTarget])

  // Custom styling
  //
  // This is the recommend way of styling react-select:
  // (https://react-select.com/styles#using-classnames)
  //
  // ps. Also it's impossible to style the focused state of
  // multiValue tags via CSS.
  const customStyles = {
    multiValueRemove: (styles: CSSProperties, { isFocused }: ReactSelectProps) => ({
      ...styles,
      backgroundColor: isFocused && styleConsts.colorWarning,
      borderWidth: isFocused && 1,
      borderStyle: isFocused && 'solid',
      borderColor: isFocused && styleConsts.colorAccessibilityOutline,
      ':hover': {
        backgroundColor: styleConsts.colorWarning,
        borderColor: styleConsts.colorPrimary,
      },
    }),
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
        },
        // Menu container is either this select itself or any other element
        // We can always add this class to the select itself because even if the menu container is any parent it won't break it
        // However, if it is the select itself, it will properly add necessary specificity level to the menu styles.
        styles.menuContainer,
        className,
      )}
    >
      <Label id={id} label={label} />
      <div className={styles.selectBlock}>
        <ReactSelect<SelectFieldOption<V>>
          inputId={id}
          className="hz-select-field"
          classNamePrefix="hz-select-field"
          // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-invalid_attribute
          aria-errormessage={error && errorId(id)}
          aria-invalid={!!error}
          aria-required={required}
          isClearable={isClearable ?? false}
          isDisabled={disabled}
          isSearchable={isSearchable}
          isMulti={isMulti}
          styles={customStyles}
          name={name}
          value={value}
          onChange={onChange as (value: ValueType<SelectFieldValue<V>>, action: ActionMeta<SelectFieldOption<V>>) => void}
          menuPortalTarget={getMenuContainer(menuPortalTarget)}
          components={{
            DropdownIndicator,
            ClearIndicator,
            Input,
          }}
          {...rest}
        />
        {helperText && <Help parentId={id} helperText={helperText} className={styles.helperText} />}
      </div>
      <Error error={error} className={cn(styles.errorContainer, errorClassName)} inputId={id} />
    </div>
  )
}
