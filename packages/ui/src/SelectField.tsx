import { DataTestProp } from '@hazelcast/helpers'
import React, { ReactElement, useRef, FocusEvent, InputHTMLAttributes } from 'react'
import { v4 as uuid } from 'uuid'
import cn from 'classnames'
import ReactSelect, { Props as ReactSelectProps, ValueType, IndicatorProps, ActionMeta } from 'react-select'
import { ChevronDown, X } from 'react-feather'
import useIsomorphicLayoutEffect from 'react-use/lib/useIsomorphicLayoutEffect'

import { Error, errorId } from './Error'
import { Label } from './Label'
import { Help } from './Help'
import { Icon } from './Icon'
import { IconButton } from './IconButton'

import styles from './SelectField.module.scss'
import { canUseDOM } from './utils/ssr'

const DropdownIndicator = () => <Icon icon={ChevronDown} ariaHidden size="normal" className={styles.chevron} />

// innerProps set event handling
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ClearIndicator = ({ innerProps }: IndicatorProps<SelectFieldOption<any>>) => {
  // Visually impaired people will use the keyboard (backspace) to remove the value. We do not want to confuse them by allowing to focus this button.
  return <IconButton {...innerProps} icon={X} ariaHidden kind="primary" size="normal" className={styles.clear} tabIndex={-1} />
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
      value: SelectFieldOption<V> | null
      onChange: (newValue: SelectFieldOption<V> | null) => void
    }
  | {
      isClearable?: false
      value: SelectFieldOption<V>
      onChange: (newValue: SelectFieldOption<V>) => void
    }
export type SelectFieldExtraProps<V> = {
  options: SelectFieldOption<V>[]
  label: string
  helperText?: string | ReactElement
  className?: string
  errorClassName?: string
  menuPortalTarget?: 'body' | 'self' | HTMLElement | null
} & DataTestProp &
  Pick<InputHTMLAttributes<HTMLElement>, 'autoFocus' | 'disabled' | 'autoComplete' | 'required' | 'placeholder'> &
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
  const idRef = useRef(uuid())

  useIsomorphicLayoutEffect(() => {
    const menuContainer = getMenuContainer(menuPortalTarget)

    if (menuContainer && !menuContainer.className.includes(styles.menuContainer)) {
      menuContainer.className = `${menuContainer.className} ${styles.menuContainer}`
    }
  }, [menuPortalTarget])

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
      <Label id={idRef.current} label={label} />
      <div className={styles.selectBlock}>
        <ReactSelect<SelectFieldOption<V>>
          inputId={idRef.current}
          className="hz-select-field"
          classNamePrefix="hz-select-field"
          // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-invalid_attribute
          aria-errormessage={error && errorId(idRef.current)}
          aria-invalid={!!error}
          aria-required={required}
          isClearable={isClearable ?? false}
          isDisabled={disabled}
          isMulti={false}
          isSearchable={isSearchable}
          name={name}
          value={value}
          onChange={onChange as (value: ValueType<SelectFieldOption<V>>, action: ActionMeta<SelectFieldOption<V>>) => void}
          menuPortalTarget={getMenuContainer(menuPortalTarget)}
          components={{
            DropdownIndicator,
            ClearIndicator,
          }}
          {...rest}
        />
        {helperText && <Help parentId={idRef.current} helperText={helperText} className={styles.helperText} />}
      </div>
      <Error error={error} className={cn(styles.errorContainer, errorClassName)} inputId={idRef.current} />
    </div>
  )
}
