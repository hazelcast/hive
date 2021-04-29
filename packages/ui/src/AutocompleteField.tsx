import React, { FocusEvent, ReactNode, useMemo } from 'react'
import ReactSelect, { ActionMeta, components, ValueType } from 'react-select'
import { useUID } from 'react-uid'
import cn from 'classnames'
import { Search, X } from 'react-feather'
import useIsomorphicLayoutEffect from 'react-use/lib/useIsomorphicLayoutEffect'
import styles from './AutocompleteField.module.scss'
import { Label } from './Label'
import { Error, errorId } from './Error'
import { Help, HelpProps } from './Help'
import { Props as ReactSelectProps } from 'react-select/src/Select'
import { canUseDOM } from './utils/ssr'
import { IconButton } from './IconButton'

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
  renderOption?: (highlightedLabelText: ReactNode, option: AutocompleteFieldOption, isSelected: boolean) => ReactNode
  name: string
  options: AutocompleteFieldOption[]
  value?: string | null
  placeholder?: string
}

type GetSelectedOptionFromValueProps = {
  value?: string | null
  optionsMap: { [key: string]: AutocompleteFieldOption }
}

/**
 * Transforms the value passed to the Autocomplete component so that it's in a format as underlying react-select expects
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

const Input = (innerProps: React.ComponentProps<typeof components.Input>) => {
  // autoComplete='off' is hard-coded inside SelectField, but doesn't work in Chrome.
  // Having an invalid value hard-coded disabled it in all browsers.
  const props = {
    ...innerProps,
    autoComplete: 'chrome-off',
  }
  return <components.Input {...props} />
}

const DropdownIndicator = (props: React.ComponentProps<typeof components.DropdownIndicator>) => {
  return (
    <components.DropdownIndicator {...props}>
      <Search size={20} />
    </components.DropdownIndicator>
  )
}

// innerProps set event handling
const ClearIndicator = ({ innerProps }: React.ComponentProps<typeof components.ClearIndicator>) => {
  // Visually impaired people will use the keyboard (backspace) to remove the value. We do not want to confuse them by allowing to focus this button.
  return <IconButton {...innerProps} icon={X} ariaHidden kind="primary" size="normal" className={styles.clear} tabIndex={-1} />
}

export const highlightOptionText = (labelText: string, inputValue: string | undefined): ReactNode => {
  const customSeparator = '<%>'
  const query = inputValue || ''
  console.log(
    labelText
      .replace(new RegExp(query, 'ig'), `${customSeparator}$&${customSeparator}`)
      .split(customSeparator)
      .filter((val) => val),
  )
  return (
    labelText
      // .replace(' ', '&#32;') // to not lose spaces
      .replace(new RegExp(query, 'ig'), `${customSeparator}$&${customSeparator}`)
      .split(customSeparator)
      .filter((val) => val)
      .map((val: string, i: number) => (
        <span
          className={cn({ 'hz-autocomplete-field__matched-option-text': val.toLowerCase() === query.toLowerCase() })}
          key={val + `${i}`}
        >
          {val}
        </span>
      ))
  )
}

const Option = ({ children, ...rest }: React.ComponentProps<typeof components.Option>) => {
  const inputValue: string = rest.selectProps.inputValue as string
  const labelText: string = (rest.data as AutocompleteFieldOption).label
  let optionText: ReactNode = labelText
  if (inputValue && children) {
    optionText = highlightOptionText(labelText, inputValue)
  }
  return (
    <components.Option {...rest}>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-call */}
      {rest.selectProps.renderOption ? rest.selectProps.renderOption(optionText, rest.data, rest.isSelected) : optionText}
    </components.Option>
  )
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
  placeholder = 'Search...',
  ...rest
}) => {
  const id = useUID()

  useIsomorphicLayoutEffect(() => {
    const menuContainer = getMenuContainer(menuPortalTarget)

    if (menuContainer && !menuContainer.className.includes(styles.menuContainer)) {
      menuContainer.className = `${menuContainer.className} ${styles.menuContainer}`
    }
  }, [menuPortalTarget])

  const optionsMap = React.useMemo(
    () =>
      options.reduce((acc, option) => {
        acc[`${option.value}`] = option
        return acc
      }, {} as { [key: string]: AutocompleteFieldOption }),
    [options],
  )

  const selectedOption = useMemo(() => getSelectedOptionFromValue({ value, optionsMap }), [optionsMap, value])

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
    placeholder,
    options,
    onChange: onChangeFn as (value: ValueType<AutocompleteFieldOption>, action: ActionMeta<AutocompleteFieldOption>) => void,
    menuPortalTarget: getMenuContainer(menuPortalTarget),
    components: {
      DropdownIndicator,
      ClearIndicator,
      Option,
      Input,
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
