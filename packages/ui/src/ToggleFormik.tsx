import React, { ReactElement, useContext } from 'react'
import { useField } from 'formik'

import { Toggle, ToggleProps } from './Toggle'

export type ToggleFormikProps = ToggleProps & {
  value: string
}

export const ToggleFormik = ({ value, ...props }: ToggleFormikProps): ReactElement => {
  return <div>xxx formik </div>
}
