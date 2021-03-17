import React, { FocusEvent, Ref, useEffect, useImperativeHandle, useMemo, useState } from 'react'
import { TextField, TextFieldExtraProps } from './TextField'
import { IconButton } from './IconButton'
import { Plus, X } from 'react-feather'
import styles from './InteractiveList.module.scss'
import { useUID } from 'react-uid'
import { FieldArrayRenderProps, FieldValidator, FormikHelpers } from 'formik'
import { Error, errorId } from './Error'
import { ExtractKeysOfValueType } from './utils/types'

export type InteractiveListExtraProps = {
  children?: React.ReactNode | React.ReactNode[]
  inputControlRef?: Ref<InteractiveListInputRef>
} & Pick<TextFieldExtraProps<'text'>, 'label' | 'helperText' | 'inputIcon' | 'type' | 'placeholder'>

export type InteractiveListCoreProps<V> = {
  name: ExtractKeysOfValueType<V, string[]>
  value: string[]
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void
  error?: string
  validate?: FieldValidator
  arrayHelpers: FieldArrayRenderProps
  onError: (str: string) => void
  validateForm: FormikHelpers<V>['validateForm']
} & InteractiveListExtraProps

export type InteractiveListProps<V> = InteractiveListExtraProps & InteractiveListCoreProps<V>

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

/**
 * This component is meant to be used only from InteractiveListFormik
 * @private
 */
const InteractiveList = <V,>({
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
  validateForm,
}: InteractiveListProps<V>) => {
  const id = useUID()
  const [inputValue, setValue] = useState<string>('')
  // We want to revalidate on change only after un-successful insert
  const [touched, setTouched] = useState(false)

  const normalizedValue = useMemo(() => inputValue.trim(), [inputValue])

  useImperativeHandle(inputControlRef, () => ({
    setValue: (value: string) => {
      setValue(value)
    },
  }))

  useEffect(() => {
    if (touched) {
      void getValidationError().then((validateError) => {
        if (validateError) {
          onError(validateError)
        }
      })
    }
  }, [touched, inputValue])

  const getValidationError = async () => {
    let validateError: string | undefined = undefined

    if (normalizedValue.length === 0) {
      validateError = 'You need to provide a non empty value'
    }

    if (validateError === undefined && value.includes(normalizedValue)) {
      validateError = 'You need to provide a unique value'
    }

    if (validateError === undefined && validate) {
      // let's check validate error
      const error = await validate(normalizedValue)
      if (error) {
        validateError = error
      }
    }

    if (validateError === undefined) {
      // If we passed with previous checks, let's check against Formik's validation error
      // We do that by checking future state with validateForm
      const formikErrors = await validateForm({
        [name]: [...value, normalizedValue],
      })
      const fieldErrors = formikErrors[name] as string[] | string | undefined
      validateError = typeof fieldErrors === 'string' ? fieldErrors : fieldErrors?.find((x) => !!x)
    }

    return validateError
  }

  const addValueCallback = async () => {
    const validateError = await getValidationError()
    if (validateError) {
      onError(validateError)
      setTouched(true)
    } else {
      arrayHelpers.push(normalizedValue)
      setTouched(false)
      setValue('')
    }
  }

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
