import React, { FocusEvent, useMemo } from 'react'
import ReactSelect, { ActionMeta, components, ValueType } from 'react-select'
import { useUID } from 'react-uid'
import cn from 'classnames'
import styles from './AutocompleteField.module.scss'
import { Label } from './Label'
import { Error, errorId } from './Error'
import { Help, HelpProps } from './Help'
import { Props as ReactSelectProps } from 'react-select/src/Select'
import { canUseDOM } from './utils/ssr'

export type AutocompleteFieldOption = {
  label: string
  value: string
}

export type AutocompleteFieldProps = {
  'data-test'?: string
  className?: string
  disabled?: boolean
  error?: string
  errorClassName?: string
  isClearable?: boolean
  label: string
  labelClassName?: string
  menuPortalTarget?: 'body' | 'self' | HTMLElement | null
  onChange?: (newValue: string) => void
  onBlur?: (e: FocusEvent<HTMLElement>) => void
  required?: boolean
  helperText?: HelpProps['helperText']
  name: string
  options: AutocompleteFieldOption[]
  value: string
}

type GetSelectedOptionFromValueProps = {
  value: string
  optionsMap: { [key: string]: AutocompleteFieldOption }
}

/**
 * Transforms the value passed to the AUtocomplete component so that it's in a format as underlying react-select expects
 * @param value - single value or an array of values
 * @param optionsMap - an object where option values are mapped to react-select expected objects
 */
export function getSelectedOptionFromValue({ value, optionsMap }: GetSelectedOptionFromValueProps): AutocompleteFieldOption | null {
  let option = null
  if (value) {
    option = optionsMap[value] ?? { value: value, label: value }
  }
  return option
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Input = (props: any) => {
  // autoComplete='off' is hard-coded inside SelectField, but doesn't work in Chrome.
  // Having an invalid value hard-coded disabled it in all browsers.
  return <components.Input {...props} autoComplete="chrome-off" />
}

export const AutocompleteField: React.FC<AutocompleteFieldProps> = ({
  'data-test': dataTest,
  className,
  disabled,
  error,
  errorClassName,
  isClearable,
  label,
  labelClassName,
  helperText,
  menuPortalTarget = 'body',
  name,
  onChange,
  options,
  required,
  value,
  ...rest
}) => {
  const id = useUID()

  const optionsMap = React.useMemo(
    () =>
      options.reduce((acc, option) => {
        acc[`${option.value}`] = option
        return acc
      }, {} as { [key: string]: AutocompleteFieldOption }),
    [options],
  )

  const selectedOption = useMemo(() => getSelectedOptionFromValue({ optionsMap, value }), [optionsMap, value])

  const onChangeFn = React.useCallback(
    (option: AutocompleteFieldOption | null) => {
      ;(onChange as (newValue: string | null) => void)(option === null ? null : option.value)
    },
    [onChange],
  )

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

  const props: ReactSelectProps<AutocompleteFieldOption> = {
    inputId: id,
    className: 'hz-autocomplete-field',
    classNamePrefix: 'hz-autocomplete-field',
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-invalid_attribute
    'aria-errormessage': error && errorId(id),
    'aria-invalid': !!error,
    'aria-required': required,
    isClearable: isClearable ?? false,
    isDisabled: disabled,
    isSearchable: true,
    isMulti: false,
    name: name,
    value: selectedOption,
    options,
    onChange: onChangeFn as (value: ValueType<AutocompleteFieldOption>, action: ActionMeta<AutocompleteFieldOption>) => void,
    menuPortalTarget: getMenuContainer(menuPortalTarget),
    components: {
      // DropdownIndicator,
      // ClearIndicator,
      Input,
    },
    ...rest,
  }

  console.log(selectedOption)

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
      <Label id={id} label={label} className={cn(styles.label, labelClassName)} />
      <div className={styles.selectBlock}>
        <ReactSelect<AutocompleteFieldOption> {...props} />
        {helperText && <Help parentId={id} helperText={helperText} className={styles.helperText} />}
      </div>
      <Error error={error} className={cn(styles.errorContainer, errorClassName)} inputId={id} />
    </div>
  )
}
