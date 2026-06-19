import React from 'react'
import { Plus, X } from 'react-feather'
import { useUID } from 'react-uid'
import cn from 'classnames'

import { DataTestProp } from '../helpers/types'
import { Error, errorId } from '../components/Error'
import { ExtractKeysOfValueType } from '../utils/types'
import { FieldHeaderProps } from '../components/FieldHeader'
import { TextField, TextFieldExtraProps } from './TextField'
import { IconButton } from './IconButton'

import styles from './InteractiveListLegacy.module.scss'

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
          kind="transparent"
          ariaLabel="Remove Item"
          icon={X}
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

export const InteractiveList = <V,>({
  label,
  children,
  error,
  name,
  value,
  helperText,
  placeholder,
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
          placeholder={placeholder}
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
          onKeyDown={async (e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              await onAddItem()
            }
          }}
        >
          <IconButton
            data-test={`${dataTest}-add-button`}
            kind="primary"
            ariaLabel="Add Icon"
            icon={Plus}
            className={cn(styles.addIcon, iconClassName)}
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
