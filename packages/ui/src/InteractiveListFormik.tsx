import React, { ReactElement, Ref, useCallback } from 'react'
import { FieldArray, FieldValidator, useField } from 'formik'

import { getFieldError } from './utils/formik'
import { ExtractKeysOfValueType } from './utils/types'
import InteractiveList, { InteractiveListExtraProps, InteractiveListInputRef } from './InteractiveList'

export type InteractiveListFormikProps<V extends object> = InteractiveListExtraProps & {
  name: ExtractKeysOfValueType<V, string[]>
  validate?: FieldValidator
  inputRef?: Ref<InteractiveListInputRef>
}

export const InteractiveListFormik = <V extends object>({
  name,
  validate,
  inputRef,
  children,
  ...props
}: InteractiveListFormikProps<V>): ReactElement => {
  const [field, meta, { setTouched, setError }] = useField<string[]>({
    name,
    validate,
  })

  const onError = useCallback(
    (value) => {
      setTouched(value, false)
      setError(value)
    },
    [setTouched, setError],
  )

  return (
    <FieldArray
      name={name}
      render={(arrayHelpers) => {
        return (
          <InteractiveList
            ref={inputRef}
            {...props}
            name={name}
            value={field.value}
            arrayHelpers={arrayHelpers}
            onError={onError}
            validate={validate}
            error={getFieldError(meta)}
          >
            {children}
          </InteractiveList>
        )
      }}
    />
  )
}
