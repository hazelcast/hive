import React, { FocusEvent, Ref, useCallback, useImperativeHandle, useMemo, useState } from 'react'
import { TextField, TextFieldExtraProps } from './TextField'
import { IconButton } from './IconButton'
import { Plus, X } from 'react-feather'
import styles from './InteractiveList.module.scss'
import { useUID } from 'react-uid'
import { FieldArrayRenderProps, FieldValidator } from 'formik'
import { Error, errorId } from './Error'

export type InteractiveListExtraProps = {
  children?: React.ReactNode | React.ReactNode[]
  inputControlRef?: Ref<InteractiveListInputRef>
} & Pick<TextFieldExtraProps<'text'>, 'label' | 'helperText' | 'inputIcon' | 'type' | 'placeholder'>

export type InteractiveListCoreProps = {
  name: string
  value: string[]
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void
  error?: string
  validate?: FieldValidator
  arrayHelpers: FieldArrayRenderProps
  onError: (str: string) => void
} & InteractiveListExtraProps

export type InteractiveListProps = InteractiveListExtraProps & InteractiveListCoreProps

export type InteractiveListInputRef = { setValue: (value: string) => void }

export type InteractiveListItemProps = {
  arrayHelpers: FieldArrayRenderProps
  content: string
  error?: string
  idx: number
}

export const InteractiveListItem = ({ arrayHelpers, content, error, idx }: InteractiveListItemProps) => {
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
            arrayHelpers.remove(idx)
          }}
        />
      </div>
      {error && <Error error={error} inputId={id} />}
    </>
  )
}

const InteractiveList = ({
  label,
  inputControlRef,
  children,
  error,
  name,
  value,
  helperText,
  inputIcon,
  onError,
  type,
  validate,
  arrayHelpers,
}: InteractiveListProps) => {
  const id = useUID()
  const [inputValue, setValue] = useState<string>('')

  const normalizedValue = useMemo(() => inputValue.trim(), [inputValue])

  useImperativeHandle(inputControlRef, () => ({
    setValue: (value: string) => {
      setValue(value)
    },
  }))

  const addValueCallback = useCallback(async () => {
    if (normalizedValue.length === 0) {
      onError('You need to provide a non empty value')
    } else if (value.includes(normalizedValue)) {
      onError('You need to provide a unique value')
    } else {
      if (validate) {
        const error = await validate(normalizedValue)
        if (error) {
          onError(error)
        } else {
          arrayHelpers.push(normalizedValue)
          setValue('')
        }
      } else {
        arrayHelpers.push(normalizedValue)
        setValue('')
      }
    }
  }, [value, normalizedValue, onError, validate, arrayHelpers])

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
            setValue(value)
          }}
          onKeyPress={async (e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              await addValueCallback()
            }
          }}
        />
        <IconButton
          data-test="interactive-list-add-button"
          kind="transparent"
          ariaLabel="Add Icon"
          icon={Plus}
          className={styles.addIcon}
          size="normal"
          onClick={async () => {
            await addValueCallback()
          }}
        />
      </div>
      {children}
      <ul className={styles.list}>
        {value.map((str, idx) => (
          <li key={idx}>
            <InteractiveListItem
              arrayHelpers={arrayHelpers}
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

InteractiveList.displayName = 'InteractiveList'

export default InteractiveList
