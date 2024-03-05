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

const Option: typeof rsComponents.Option = (props) => (
  <rsComponents.Option {...props}>
    <div className={styles.valueContainer}>
      <TruncatedText text={props.label} />
      <span className={styles.trailingNote}>{(props.data as SelectFieldOption<string>)?.trailingNote}</span>
    </div>
  </rsComponents.Option>
)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const IndicatorSeparator: typeof rsComponents.IndicatorSeparator = () => null

const SingleValue: typeof rsComponents.SingleValue = ({ children, ...props }) => (
  <rsComponents.SingleValue {...props}>
    <div className={styles.valueContainer}>
      <TruncatedText text={children as string} />
      <span className={styles.trailingNote}>{(props.data as SelectFieldOption<string>)?.trailingNote}</span>
    </div>
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
