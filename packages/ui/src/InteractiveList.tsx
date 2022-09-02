import React, { FocusEvent } from 'react'
import cn from 'classnames'
import { TextField, TextFieldExtraProps } from './TextField'
import { IconButton } from './IconButton'
import { Plus, X } from 'react-feather'
import styles from './InteractiveList.module.scss'
import { useUID } from 'react-uid'
import { Error, errorId } from './Error'
import { ExtractKeysOfValueType } from './utils/types'
import { FieldHeaderProps } from './FieldHeader'

export type InteractiveListExtraProps = {
  children?: React.ReactNode | React.ReactNode[]
  disabled?: boolean
  disabledTooltip?: string
} & Pick<TextFieldExtraProps<'text'>, 'inputIcon' | 'type' | 'placeholder'> &
  Omit<FieldHeaderProps, 'id'>

export type InteractiveListCoreProps<V> = {
  name: ExtractKeysOfValueType<V, string[]>
  value: string[]
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void
  error?: string
  inputValue: string
  setInputValue: (val: string) => void
  onAddItem: () => Promise<string | undefined>
  onRemoveItem: (idx: number) => boolean
} & InteractiveListExtraProps

export type InteractiveListProps<V> = InteractiveListExtraProps & InteractiveListCoreProps<V>

export type InteractiveListInputRef = { setValue: (value: string) => void }

export type InteractiveListItemProps = {
  content: string
  error?: string
  idx: number
  onRemoveItem: (idx: number) => boolean
  disabled?: boolean
}

export const InteractiveListItem = ({ onRemoveItem, content, error, idx, disabled }: InteractiveListItemProps) => {
  const id = useUID()
  const errorProps = error
    ? {
        'aria-invalid': true,
        'aria-errormessage': errorId(id),
      }
    : {}

  return (
    <>
      <div className={styles.content}>
        <span id={id} {...errorProps}>
          {content}
        </span>{' '}
        {!disabled && (
          <IconButton
            kind="transparent"
            ariaLabel="Remove Item"
            icon={X}
            size="small"
            onClick={() => {
              onRemoveItem(idx)
            }}
          />
        )}
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
  disabled,
  disabledTooltip = '',
}: InteractiveListProps<V>) => {
  const id = useUID()

  return (
    <>
      <div className={styles.inputRow}>
        <TextField
          id={id}
          type={type}
          helperText={helperText}
          inputIcon={inputIcon}
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
        />
        <IconButton
          data-test="interactive-list-add-button"
          kind="transparent"
          ariaLabel="Add Icon"
          icon={Plus}
          className={cn(styles.addIcon, { [styles.disabledIcon]: disabled })}
          size="medium"
          disabled={!!disabled}
          disabledTooltip={disabledTooltip}
          onClick={onAddItem}
        />
      </div>
      {children}
      <ul className={styles.list}>
        {value.map((str, idx) => (
          <li key={str}>
            <InteractiveListItem
              onRemoveItem={onRemoveItem}
              idx={idx}
              content={str}
              error={typeof error === 'object' && error[idx] ? error[idx] : undefined}
              disabled={disabled}
            />
          </li>
        ))}
      </ul>
    </>
  )
}
