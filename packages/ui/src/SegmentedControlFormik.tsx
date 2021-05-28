import React, { ReactElement, useMemo } from 'react'
import { useField } from 'formik'

import { SegmentedControl, SegmentedControlProps } from './SegmentedControl'
import { FieldValidatorGeneric, formikTouchAndUpdate } from './utils/formik'
import { ExtractKeysOfValueType } from './utils/types'

export type SegmentedControlFormikProps<V extends object> = Omit<SegmentedControlProps, 'value' | 'onChange'> & {
  name: ExtractKeysOfValueType<V, string | undefined>
  validate?: FieldValidatorGeneric<string | undefined>
}

export const SegmentedControlFormik = <V extends object>({ name, validate, ...props }: SegmentedControlFormikProps<V>): ReactElement => {
  const [{ value }, , { setValue, setTouched }] = useField<string>({
    name,
    validate,
  })

  const onChange = useMemo(() => formikTouchAndUpdate<string>(setValue, setTouched), [setValue, setTouched])

  return <SegmentedControl {...props} value={value} onChange={onChange} />
}
