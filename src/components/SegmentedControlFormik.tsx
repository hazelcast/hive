import React, { ReactElement, useMemo } from 'react'
import { useField } from 'formik'

import { SegmentedControl, SegmentedControlProps } from './SegmentedControl'
import { FieldValidatorGeneric, formikTouchAndUpdate } from '../utils/formik'
import { ExtractKeysOfValueType } from '../utils/types'

export type SegmentedControlFormikProps<V extends object, OV> = Omit<SegmentedControlProps<OV>, 'value' | 'onChange'> & {
  name: ExtractKeysOfValueType<V, OV | undefined>
  validate?: FieldValidatorGeneric<OV | undefined>
}

export const SegmentedControlFormik = <V extends object, OV extends string = string>({
  name,
  validate,
  ...props
}: SegmentedControlFormikProps<V, OV>): ReactElement => {
  const [{ value }, , { setValue, setTouched }] = useField<OV>({
    name,
    validate,
  })

  const onChange = useMemo(() => formikTouchAndUpdate<OV>(setValue, setTouched), [setValue, setTouched])

  return <SegmentedControl<OV> {...props} value={value} onChange={onChange} />
}
