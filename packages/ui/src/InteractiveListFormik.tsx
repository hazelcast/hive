import React, { ReactElement } from 'react'
import { FieldValidator, useField } from 'formik'
import { useMemo } from 'react'

import { formikTouchAndUpdate, getFieldError } from './utils/formik'
import { ExtractKeysOfValueType } from './utils/types'
import InteractiveList, { InteractiveListExtraProps } from './InteractiveList'

export type InteractiveListFormikProps<V extends object> = InteractiveListExtraProps & {
  name: ExtractKeysOfValueType<V, string[]>
  validate?: FieldValidator
}

export const InteractiveListFormik = <V extends object>({ name, validate, ...props }: InteractiveListFormikProps<V>): ReactElement => {
  const [field, meta, { setValue, setTouched }] = useField<string[]>({
    name,
    validate,
  })

  const onChange = useMemo(() => formikTouchAndUpdate(setValue, setTouched), [setValue, setTouched])

  return <InteractiveList {...props} name={name} value={field.value} onChange={onChange} error={getFieldError(meta)} />
}
