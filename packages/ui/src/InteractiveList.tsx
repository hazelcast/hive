import React, { FocusEvent, useState } from 'react'
import { TextField, TextFieldExtraProps } from './TextField'
import { IconButton } from './IconButton'
import { Plus, X } from 'react-feather'
import styles from './InteractiveList.module.scss'
import { useUID } from 'react-uid'

export type InteractiveListExtraProps = {
  customAddElement?: React.FC<{ setValue: (value: string) => void }>
} & Pick<TextFieldExtraProps<'text'>, 'label' | 'helperText' | 'inputIcon' | 'type'>

export type InteractiveListCoreProps = {
  name: string
  value: string[]
  onChange: (newValue: string[]) => void
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void
  error?: string
} & InteractiveListExtraProps

export type InteractiveListProps = InteractiveListExtraProps & InteractiveListCoreProps

const InteractiveList = ({
  label,
  error,
  name,
  customAddElement: CustomAddElement,
  value,
  onChange,
  helperText,
  inputIcon,
  type,
}: InteractiveListProps) => {
  const [inputValue, setValue] = useState<string>('')
  const id = useUID()

  return (
    <div>
      <div className={styles.inputRow}>
        <TextField
          id={id}
          type={type}
          helperText={helperText}
          inputIcon={inputIcon}
          error={error}
          label={label}
          name={name}
          value={inputValue}
          onChange={({ target: { value } }) => setValue(value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              onChange([...value, inputValue])
              setValue('')
            }
          }}
        />
        <IconButton
          kind="transparent"
          ariaLabel="Add Icon"
          icon={Plus}
          className={styles.addIcon}
          size="normal"
          onClick={() => {
            onChange([...value, inputValue])
            setValue('')
          }}
        />
      </div>
      {CustomAddElement && <CustomAddElement setValue={setValue} />}
      <ul className={styles.list}>
        {value.map((str) => (
          <li key={str}>
            <span>{str}</span> <IconButton kind="transparent" ariaLabel="Remove Item" icon={X} size="small" />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default InteractiveList
