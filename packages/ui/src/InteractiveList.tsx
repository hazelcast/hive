import React from 'react'
import { Plus, X } from 'react-feather'
import { useUID } from 'react-uid'
import cn from 'classnames'
import { DataTestProp } from '@hazelcast/helpers'

import { IconButton } from './IconButton'
import { Error, errorId } from './Error'
import { ExtractKeysOfValueType } from './utils/types'
import { FieldHeaderProps } from './FieldHeader'
import { TextField, TextFieldExtraProps } from './TextField'

import styles from './InteractiveList.module.scss'

export type InteractiveListExtraProps = {
  children?: React.ReactNode | React.ReactNode[]
  iconClassName?: string
  itemClassName?: string
  listClassName?: string
} & Pick<TextFieldExtraProps<'text'>, 'inputIcon' | 'type' | 'placeholder' | 'inputClassName' | 'className'> &
  Omit<FieldHeaderProps, 'id'>

export type InteractiveListCoreProps<V> = {
  name: ExtractKeysOfValueType<V, string[]>
  value: string[]
  error?: string
  inputValue: string
  setInputValue: (val: string) => void
  onAddItem: () => Promise<string | undefined>
  onRemoveItem: (idx: number) => boolean
} & InteractiveListExtraProps &
  DataTestProp

export type InteractiveListProps<V> = InteractiveListExtraProps & InteractiveListCoreProps<V>

export type InteractiveListInputRef = {
  setValue: (value: string) => void
  addItem: () => Promise<string | undefined>
  getValue: () => string
}

export type InteractiveListItemProps = {
  content: string
  error?: string
  idx: number
  onRemoveItem: (idx: number) => boolean
} & DataTestProp

export const InteractiveListItem = ({ onRemoveItem, content, error, idx, 'data-test': dataTest }: InteractiveListItemProps) => {
  const id = useUID()
  const errorProps = error
    ? {
        'aria-invalid': true,
        'aria-errormessage': errorId(id),
      }
    : {}

  return (
    <>
      <div data-test={dataTest} className={styles.content}>
        <span id={id} {...errorProps}>
          {content}
        </span>{' '}
        <IconButton
          kind="primary"
          ariaLabel="Remove Item"
          icon={X}
          size="medium"
          className={styles.removeIcon}
          onClick={() => {
            onRemoveItem(idx)
          }}
        />
      </div>
      {error && <Error error={error} inputId={id} />}
    </>
  )
}

/**
 * This component is meant to be used only from InteractiveListFormik
 * @private
 */
export const InteractiveList = <V,>({
  label,
  children,
  error,
  name,
  value,
  helperText,
  inputIcon,
  type,
  inputValue,
  setInputValue,
  onAddItem,
  onRemoveItem,
  className,
  inputClassName,
  iconClassName,
  itemClassName,
  listClassName,
  'data-test': dataTest = 'interactive-list',
}: InteractiveListProps<V>) => {
  const id = useUID()

  return (
    <>
      <div data-test={dataTest} className={cn(styles.inputRow, className)}>
        <TextField
          id={id}
          type={type}
          helperText={helperText}
          inputIcon={inputIcon}
          inputClassName={cn(styles.input, inputClassName)}
          inputContainerClassName={styles.inputContainer}
          inputBorderOverlayClassName={styles.inputBorderOverlay}
          error={typeof error === 'string' ? error : undefined}
          label={label}
          name={name}
          value={inputValue}
          onChange={({ target: { value } }) => {
            setInputValue(value)
          }}
          onKeyPress={async (e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              await onAddItem()
            }
          }}
        >
          <IconButton
            data-test={`${dataTest}-add-button`}
            kind="transparent"
            ariaLabel="Add Icon"
            icon={Plus}
            className={cn(styles.addIcon, iconClassName)}
            size="medium"
            onClick={() => void onAddItem()}
          />
        </TextField>
      </div>
      {children}
      <ul className={cn(styles.list, listClassName)}>
        {value.map((str, idx) => (
          <li key={str} className={itemClassName}>
            <InteractiveListItem
              onRemoveItem={onRemoveItem}
              idx={idx}
              content={str}
              data-test={`${dataTest}-item`}
              error={typeof error === 'object' && error[idx] ? error[idx] : undefined}
            />
          </li>
        ))}
      </ul>
    </>
  )
}
