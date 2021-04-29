import React, { ReactElement, useMemo } from 'react'
import { useField } from 'formik'

import { AutocompleteField, AutocompleteFieldProps } from './AutocompleteField'
import { FieldValidatorGeneric, formikTouchAndUpdate, getFieldError } from './utils/formik'

type AutocompleteFieldFormikProps = AutocompleteFieldProps & {
  validate?: FieldValidatorGeneric<string | null>
}

export const AutocompleteFieldFormik = ({ name, validate, ...props }: AutocompleteFieldFormikProps): ReactElement => {
  const [field, meta, { setValue, setTouched }] = useField<string | null>({
    name,
    validate,
  })

  const onChange = useMemo(() => formikTouchAndUpdate<string | null>(setValue, setTouched), [setValue, setTouched])

  return (
    <AutocompleteField {...props} value={field.value} onChange={onChange} name={name} onBlur={field.onBlur} error={getFieldError(meta)} />
  )
}
