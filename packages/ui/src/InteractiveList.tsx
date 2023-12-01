import React, { FocusEvent } from 'react'
import { TextField, TextFieldExtraProps } from './TextField'
import { IconButton } from './IconButton'
import { Plus, X } from 'react-feather'
import styles from './InteractiveList.module.scss'
import { useUID } from 'react-uid'
import { Error, errorId } from './Error'
import { ExtractKeysOfValueType } from './utils/types'
import { FieldHeaderProps } from './FieldHeader'
import cn from 'classnames'

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
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void
  error?: string
  inputValue: string
  setInputValue: (val: string) => void
  onAddItem: () => Promise<string | undefined>
  onRemoveItem: (idx: number) => boolean
} & InteractiveListExtraProps

export type InteractiveListProps<V> = InteractiveListExtraProps & InteractiveListCoreProps<V>

export type InteractiveListInputRef = { setValue: (value: string) => void; addItem: () => Promise<string | undefined> }

export type InteractiveListItemProps = {
  content: string
  error?: string
  idx: number
  onRemoveItem: (idx: number) => boolean
}

export const InteractiveListItem = ({ onRemoveItem, content, error, idx }: InteractiveListItemProps) => {
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
        <IconButton
          kind="transparent"
          ariaLabel="Remove Item"
          icon={X}
          size="small"
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
}: InteractiveListProps<V>) => {
  const id = useUID()

  return (
    <>
      <div className={cn(styles.inputRow, className)}>
        <TextField
          id={id}
          type={type}
          helperText={helperText}
          inputIcon={inputIcon}
          className={inputClassName}
          error={typeof error === 'string' ? error : undefined}
          label={label}
          name={name}
          value={inputValue}
          onChange={({ target: { value } }) => {
            setInputValue(value)
          }}
          /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
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
          className={cn(styles.addIcon, iconClassName)}
          size="medium"
          onClick={() => void onAddItem()}
        />
      </div>
      {children}
      <ul className={cn(styles.list, listClassName)}>
        {value.map((str, idx) => (
          <li key={str} className={itemClassName}>
            <InteractiveListItem
              onRemoveItem={onRemoveItem}
              idx={idx}
              content={str}
              error={typeof error === 'object' && error[idx] ? error[idx] : undefined}
            />
          </li>
        ))}
      </ul>
    </>
  )
}
