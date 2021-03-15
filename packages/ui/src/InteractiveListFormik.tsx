import React, { ReactElement, useCallback } from 'react'
import { FieldArray, FieldValidator, useField } from 'formik'

import { getFieldError } from './utils/formik'
import { ExtractKeysOfValueType } from './utils/types'
import InteractiveList, { InteractiveListExtraProps } from './InteractiveList'

export type InteractiveListFormikProps<V extends object> = InteractiveListExtraProps & {
  name: ExtractKeysOfValueType<V, string[]>
  validate?: FieldValidator
}

export const InteractiveListFormik = <V extends object>({
  name,
  validate,
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
