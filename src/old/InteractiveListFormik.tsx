import React, { ReactElement, Ref, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react'
import { FieldArray, FieldValidator, useField, useFormikContext } from 'formik'

import { ExtractKeysOfValueType } from '../utils/types'
import { getFieldError } from '../utils/formik'
import { InteractiveList, InteractiveListExtraProps, InteractiveListInputRef } from './InteractiveList'

export type InteractiveListFormikProps<V extends object> = InteractiveListExtraProps & {
  name: ExtractKeysOfValueType<V, string[]>
  validate?: FieldValidator
  inputControlRef?: Ref<InteractiveListInputRef>
}

export const InteractiveListFormik = <V extends object>({
  name,
  validate,
  children,
  inputControlRef,
  ...props
}: InteractiveListFormikProps<V>): ReactElement => {
  const { validateForm, values: valuesFormik } = useFormikContext<V>()
  const [field, meta, { setTouched, setError, setValue }] = useField<string[]>({
    name,
    validate,
  })

  const [inputValue, setInputValue] = useState<string>('')
  const [inputTouched, setInputTouched] = useState(false)

  const normalizedValue = useMemo(() => inputValue.trim(), [inputValue])

  const getValidationError = useCallback(async () => {
    let validationError: string | undefined = undefined

    if (normalizedValue.length === 0) {
      validationError = 'You need to provide a non empty value'
    }

    if (validationError === undefined && field.value.includes(normalizedValue)) {
      validationError = 'You need to provide a unique value'
    }

    if (validationError === undefined && validate) {
      const error = await validate(normalizedValue)
      if (error) {
        validationError = error
      }
    }

    if (validationError === undefined) {
      const formikErrors = await validateForm({
        ...valuesFormik,
        [name]: [...field.value, normalizedValue],
      })
      const fieldErrors = formikErrors[name] as string[] | string | undefined
      validationError = typeof fieldErrors === 'string' ? fieldErrors : fieldErrors?.find((x) => !!x)
    }

    return validationError
  }, [field.value, name, normalizedValue, validate, validateForm, valuesFormik])

  const onError = useCallback(
    (value: string | string[]) => {
      setTouched(true, false)
      // @ts-expect-error Formik expects string[] in typings, while runtime supports string | string[]
      setError(value)
    },
    [setTouched, setError],
  )

  const addItem = useCallback(async () => {
    const validationError = await getValidationError()
    if (validationError) {
      onError(validationError)
      setInputTouched(true)
      return validationError
    }

    field.value.push(normalizedValue)
    setValue(field.value)
    setInputTouched(false)
    setInputValue('')
    return undefined
  }, [field.value, getValidationError, normalizedValue, onError, setValue])

  useImperativeHandle(inputControlRef, () => ({
    setValue: (value: string) => {
      setInputValue(value)
    },
    addItem,
    getValue: () => inputValue,
  }))

  useEffect(() => {
    if (inputTouched) {
      void getValidationError().then((validationError) => {
        if (validationError) {
          onError(validationError)
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputTouched, inputValue])

  return (
    <FieldArray
      name={name}
      render={(arrayHelpers) => (
        <InteractiveList<V>
          {...props}
          name={name}
          value={field.value}
          inputValue={inputValue}
          setInputValue={setInputValue}
          error={getFieldError(meta)}
          onAddItem={addItem}
          onRemoveItem={(idx) => !!arrayHelpers.remove(idx)}
        >
          {children}
        </InteractiveList>
      )}
    />
  )
}
