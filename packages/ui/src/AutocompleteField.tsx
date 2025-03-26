import React, { CSSProperties, FocusEvent, ReactNode, useMemo, useState } from 'react'
import ReactSelect, { ActionMeta, components, OnChangeValue, FormatOptionLabelMeta, Props as ReactSelectProps } from 'react-select'
import { useUID } from 'react-uid'
import cn from 'classnames'
import { Search, X } from 'react-feather'
import useIsomorphicLayoutEffect from 'react-use/lib/useIsomorphicLayoutEffect'
import styles from './AutocompleteField.module.scss'
import { Error, errorId } from './Error'
import { HelpProps } from './Help'
import { canUseDOM } from './utils/ssr'
import { IconButton } from './IconButton'
import { SelectFieldSize } from './Select/SelectField'
import { FieldHeader, FieldHeaderProps } from './FieldHeader'

export type AutocompleteFieldOption = {
  label: string
  value: string
}

export type RenderOptionFunction<O = AutocompleteFieldOption> = (
  highlightedLabelText: ReactNode,
  option: O extends AutocompleteFieldOption ? O : never,
  labelMeta: FormatOptionLabelMeta<AutocompleteFieldOption>,
) => ReactNode

export type AutocompleteFieldProps = {
  'data-test'?: string
  size?: SelectFieldSize
  className?: string
  disabled?: boolean
  error?: string
  errorClassName?: string
  isClearable?: boolean
  label?: string
  labelClassName?: string
  menuPortalTarget?: 'body' | 'self' | HTMLElement | null
  onChange?: (newValue: string) => void
  onInputChange?: (newInputValue: string) => void
  onBlur?: (e: FocusEvent<HTMLElement>) => void
  onFocus?: (e: FocusEvent<HTMLElement>) => void
  required?: boolean
  helperText?: HelpProps['helperText']
  renderOption?: RenderOptionFunction
  name: string
  options: AutocompleteFieldOption[]
  value?: string | null
  placeholder?: string
  openMenuOnClick?: boolean
} & Omit<FieldHeaderProps, 'id'>

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

const Input: typeof components.Input = (innerProps) => {
  // autoComplete='off' is hard-coded inside SelectField, but doesn't work in Chrome.
  // Having an invalid value hard-coded disabled it in all browsers.
  const props = {
    ...innerProps,
    autoComplete: 'chrome-off',
  }
  return <components.Input {...props} />
}

const DropdownIndicator: typeof components.DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <Search size={20} />
    </components.DropdownIndicator>
  )
}

// innerProps set event handling
const ClearIndicator: typeof components.ClearIndicator = ({ innerProps }) => {
  // Visually impaired people will use the keyboard (backspace) to remove the value. We do not want to confuse them by allowing to focus this button.

  // @ts-ignore
  return <IconButton {...innerProps} icon={X} ariaHidden kind="primary" size="medium" className={styles.clear} tabIndex={-1} />
}

export const highlightOptionText = (labelText: string, inputValue: string | undefined): ReactNode => {
  const separator = '<%>'
  const query = inputValue || ''
  return query
    ? labelText
        .replace(new RegExp(query, 'ig'), `${separator}$&${separator}`)
        .split(separator)
        .filter((val) => val)
        .map((val: string, i: number) => (
          <span
            className={cn({
              'hz-autocomplete-field__matched-option-text': val.toLowerCase() === query.toLowerCase(),
            })}
            key={val + `${i}`}
          >
            {val}
          </span>
        ))
    : labelText
}

export const AutocompleteField: React.FC<AutocompleteFieldProps> = ({
  'data-test': dataTest = 'autocomplete-field',
  className,
  disabled,
  error,
  errorClassName,
  isClearable,
  label,
  labelClassName,
  helperText,
  size = 'medium',
  menuPortalTarget = 'body',
  name,
  onChange,
  onFocus,
  onBlur,
  onInputChange,
  options,
  required,
  value,
  placeholder = 'Search...',
  showAriaLabel = false,
  renderOption,
  openMenuOnClick = true,
  ...rest
}) => {
  // when the user clicks on an input with the value, the value should disappear,
  // but then it should appear after the user selects something or blurs the input
  const [isValueHidden, setValueHidden] = useState(false)
  const id = useUID()

  useIsomorphicLayoutEffect(() => {
    const menuContainer = getMenuContainer(menuPortalTarget)

    if (menuContainer && !menuContainer.className.includes(styles.menuContainer)) {
      menuContainer.className = `${menuContainer.className} ${styles.menuContainer}`
    }
  }, [menuPortalTarget])

  const optionsMap = React.useMemo(
    () =>
      options.reduce(
        (acc, option) => {
          acc[`${option.value}`] = option
          return acc
        },
        {} as { [key: string]: AutocompleteFieldOption },
      ),
    [options],
  )

  const selectedOption = useMemo(() => getSelectedOptionFromValue({ value, optionsMap }), [optionsMap, value])

  const onChangeFn = React.useCallback(
    (option: AutocompleteFieldOption | null) => {
      setValueHidden(false)
      ;(onChange as (newValue: string | null) => void)(option === null ? null : option.value)
    },
    [onChange],
  )

  const onFocusFn = React.useCallback(
    (e: FocusEvent<HTMLElement>) => {
      if (onFocus) {
        onFocus(e)
      }
      if (!openMenuOnClick) {
        setValueHidden(true)
      }
    },
    [onFocus, openMenuOnClick],
  )

  const onBlurFn = React.useCallback(
    (e: FocusEvent<HTMLElement>) => {
      if (onBlur) {
        onBlur(e)
      }
      setValueHidden(false)
    },
    [onBlur],
  )

  const formatOptionLabelFn = React.useCallback(
    (option: AutocompleteFieldOption, labelMeta: FormatOptionLabelMeta<AutocompleteFieldOption>) => {
      const { inputValue } = labelMeta
      let optionText: ReactNode = option.label
      if (inputValue) {
        optionText = highlightOptionText(option.label, inputValue)
      }
      return renderOption ? renderOption(optionText, option, labelMeta) : optionText
    },
    [renderOption],
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

  const props: ReactSelectProps<AutocompleteFieldOption, false> = {
    inputId: id,
    className: 'hz-autocomplete-field',
    classNamePrefix: 'hz-autocomplete-field',
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-invalid_attribute
    'aria-errormessage': error && errorId(id),
    'aria-invalid': !!error,

    // @ts-ignore
    'aria-required': required,
    error,
    isClearable: isClearable ?? false,
    isDisabled: disabled,
    isSearchable: true,
    isMulti: false,
    name: name,
    value: selectedOption,
    placeholder,
    options,
    onChange: onChangeFn as (value: OnChangeValue<AutocompleteFieldOption, false>, action: ActionMeta<AutocompleteFieldOption>) => void,
    onFocus: onFocusFn,
    onBlur: onBlurFn,
    menuPortalTarget: getMenuContainer(menuPortalTarget),
    components: {
      DropdownIndicator,
      ClearIndicator,
      Input,
    },
    openMenuOnClick,
    ...rest,
  }

  return (
    <div
      data-test={dataTest}
      className={cn(
        styles.container,
        {
          [styles.withError]: 'error' in props,
          [styles.disabled]: disabled,
          [styles.hasError]: error,
          [styles.small]: size === 'small',
          [styles.empty]: !value,
        },
        // Menu container is either this select itself or any other element
        // We can always add this class to the select itself because even if the menu container is any parent it won't break it
        // However, if it is the select itself, it will properly add necessary specificity level to the menu styles.
        styles.menuContainer,
        className,
      )}
    >
      <FieldHeader
        label={label}
        id={id}
        size={size}
        data-test={dataTest}
        helperText={helperText}
        showAriaLabel={showAriaLabel}
        labelClassName={labelClassName}
      />
      <div className={styles.selectBlock}>
        <ReactSelect<AutocompleteFieldOption, false>
          onInputChange={onInputChange}
          formatOptionLabel={formatOptionLabelFn}
          styles={{
            ...props.styles,

            // @ts-ignore
            singleValue: (base: CSSProperties) => ({
              ...base,
              ...props.styles?.singleValue,
              visibility: isValueHidden ? 'hidden' : 'visible',
            }),
          }}
          {...props}
        />
      </div>
      <Error data-test={`${dataTest}-error`} truncated error={error} className={cn(styles.errorContainer, errorClassName)} inputId={id} />
    </div>
  )
}
