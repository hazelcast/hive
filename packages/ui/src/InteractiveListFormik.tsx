import React, { ReactElement, useCallback } from 'react'
import { FieldArray, FieldValidator, useField } from 'formik'

import { getFieldError } from './utils/formik'
import { ExtractKeysOfValueType } from './utils/types'
import InteractiveList, { InteractiveListExtraProps } from './InteractiveList'

export type InteractiveListFormikProps<V extends object> = InteractiveListExtraProps & {
  name: ExtractKeysOfValueType<V, string[]>
  validate?: FieldValidator
}

/**
 * InteractiveListFormik
 *
 * This Formik-bound component is used to work with an array of strings.
 * It guarantees the uniqueness of elements with respect to the empty characters at the beginning and the end of each string.
 *
 * It prevents from entering a non-valid entry based on a validate function passed to an element.
 * Unfortunately, we can't access Yup validation at this level when adding an entry, so Yup validation is done only on form submit.
 * More info here https://formik.org/docs/api/fieldarray
 *
 * Passing an InteractiveListInputRef as inputControlRef property allows you to modify the value of text input.
 */
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
