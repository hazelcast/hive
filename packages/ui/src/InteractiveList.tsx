import React, { FocusEvent, useCallback, useMemo, useState } from 'react'
import { TextField, TextFieldExtraProps } from './TextField'
import { IconButton } from './IconButton'
import { Plus, X } from 'react-feather'
import styles from './InteractiveList.module.scss'
import { useUID } from 'react-uid'
import { FieldArrayRenderProps, FieldValidator } from 'formik'

export type InteractiveListExtraProps = {
  customAddElement?: React.FC<{ setValue: (value: string) => void }>
} & Pick<TextFieldExtraProps<'text'>, 'label' | 'helperText' | 'inputIcon' | 'type'>

export type InteractiveListCoreProps<V> = {
  name: string
  value: string[]
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void
  error?: string
  validate?: FieldValidator
  arrayHelpers: FieldArrayRenderProps
  onError: (str: string) => void
} & InteractiveListExtraProps

export type InteractiveListProps<V> = InteractiveListExtraProps & InteractiveListCoreProps<V>

const InteractiveList = <V extends object>({
  label,
  error,
  name,
  customAddElement: CustomAddElement,
  value,
  helperText,
  inputIcon,
  onError,
  type,
  validate,
  arrayHelpers,
}: InteractiveListProps<V>) => {
  const id = useUID()
  const [inputValue, setValue] = useState<string>('')

  const normalizedValue = useMemo(() => inputValue.trim(), [inputValue])

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
  }, [value, normalizedValue])

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
      {CustomAddElement && <CustomAddElement setValue={setValue} />}
      <ul className={styles.list}>
        {value.map((str, idx) => (
          <>
            <li key={idx}>
              <span>{str}</span>{' '}
              <IconButton
                kind="transparent"
                ariaLabel="Remove Item"
                icon={X}
                size="small"
                onClick={() => {
                  arrayHelpers.remove(idx)
                }}
              />
            </li>
            {typeof error === 'object' && error[idx] ? error[idx] : null}
          </>
        ))}
      </ul>
    </>
  )
}

export default InteractiveList
