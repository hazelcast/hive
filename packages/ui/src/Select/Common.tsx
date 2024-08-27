import React, { ReactNode } from 'react'
import { ChevronDown, X } from 'react-feather'
import { components as rsComponents } from 'react-select'
import cn from 'classnames'

import { Icon } from '../Icon'
import { IconButton } from '../IconButton'
import { TruncatedText } from '../TruncatedText'
import { SelectFieldOption } from './helpers'

import styles from './Common.module.scss'

const DropdownIndicator: typeof rsComponents.DropdownIndicator = ({ selectProps }) => (
  <Icon
    icon={ChevronDown}
    ariaHidden
    size="medium"
    className={cn(styles.chevron, { [styles.open]: selectProps.menuIsOpen, [styles.disabled]: selectProps.isDisabled })}
  />
)

// innerProps set event handling
const ClearIndicator: typeof rsComponents.ClearIndicator = ({ innerProps }) => (
  // Visually impaired people will use the keyboard (backspace) to remove the value. We do not want to confuse them by allowing to focus this button.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconButton {...innerProps} icon={X} ariaHidden kind="primary" size="medium" className={styles.clear} tabIndex={-1} />
)

const Input: typeof rsComponents.Input = (innerProps) => {
  // autoComplete='off' is hard-coded inside SelectField, but doesn't work in Chrome.
  // Having an invalid value hard-coded disabled it in all browsers.
  const props = {
    ...innerProps,
    autoComplete: 'chrome-off',
  }
  return <rsComponents.Input {...props} />
}

export type RenderMenuFooterFunction = () => ReactNode

const isRenderMenuFooterFunction = (fn: object): fn is RenderMenuFooterFunction => typeof fn === 'function'

const MenuList: typeof rsComponents.MenuList = (props) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { renderMenuFooter } = props.selectProps
  return (
    <>
      <rsComponents.MenuList {...props} />
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */}
      {isRenderMenuFooterFunction(renderMenuFooter) && renderMenuFooter()}
    </>
  )
}

const ValueContainer: typeof rsComponents.ValueContainer = (props) => (
  <rsComponents.ValueContainer className={styles.valueContainer} {...props}>
    <TruncatedText text={props.children as string} />
    <span
      className={cn(styles.trailingNote, props.selectProps.classNamePrefix ? `${props.selectProps.classNamePrefix}__trailing-note` : '')}
    >
      {(props as unknown as { data: SelectFieldOption<string> }).data?.trailingNote}
    </span>
  </rsComponents.ValueContainer>
)

const Option: typeof rsComponents.Option = (props) => (
  <rsComponents.Option {...props}>
    <ValueContainer {...props}>{props.label}</ValueContainer>
  </rsComponents.Option>
)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const IndicatorSeparator: typeof rsComponents.IndicatorSeparator = () => null

const SingleValue: typeof rsComponents.SingleValue = ({ children, ...props }) => (
  <rsComponents.SingleValue {...props}>
    <ValueContainer {...props}>{children}</ValueContainer>
  </rsComponents.SingleValue>
)

const components: Partial<typeof rsComponents> = {
  DropdownIndicator,
  ClearIndicator,
  Input,
  MenuList,
  IndicatorSeparator,
  Option,
  SingleValue,
}

export { components }
