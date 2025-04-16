import React, { ReactElement, useCallback, useMemo } from 'react'
import { useField } from 'formik'

import { AutocompleteField, AutocompleteFieldProps } from './AutocompleteField'
import { FieldValidatorGeneric, formikTouchAndUpdate, getFieldError } from '../utils/formik'

type AutocompleteFieldFormikProps = AutocompleteFieldProps & {
  validate?: FieldValidatorGeneric<string | null>
  onChange?: (value: string | null) => void
}

export const AutocompleteFieldFormik = ({ name, validate, onChange, ...props }: AutocompleteFieldFormikProps): ReactElement => {
  const [{ value, onBlur }, meta, { setValue, setTouched }] = useField<string | null>({
    name,
    validate,
  })

  const setFormikValue = useMemo(() => formikTouchAndUpdate<string | null>(setValue, setTouched), [setValue, setTouched])
  const handleChange = useCallback(
    (newValue: string) => {
      if (onChange) {
        onChange(newValue)
      }

      setFormikValue(newValue)
    },
    [setFormikValue, onChange],
  )

  return <AutocompleteField {...props} value={value} onChange={handleChange} name={name} onBlur={onBlur} error={getFieldError(meta)} />
}
