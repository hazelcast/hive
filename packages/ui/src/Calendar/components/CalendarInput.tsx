import React, { FC, ChangeEvent, InputHTMLAttributes, forwardRef } from 'react'
import { Calendar } from 'react-feather'

import { TextField } from '../../TextField'

export type CalendarInputInternalProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
} & CalendarInputExtraProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>

export const CalendarInputInternal: FC<CalendarInputInternalProps> = ({ className, value, onChange, label, ...props }) => (
  <TextField<'text'>
    {...props}
    data-test="calendar-input"
    value={value?.toString()}
    onChange={onChange}
    inputContainerClassName={className}
    type="text"
    name="calendar-input"
    label={label}
    inputTrailingIcon={Calendar}
    inputTrailingIconLabel="Calendar Icon"
  />
)

export type CalendarInputExtraProps = {
  label: string
}

/*
 * Note:
 * The types are not available, the element is internally instantiated via React.cloneElement
 * We need to accept the props as unknown and cast them in place
 * Otherwise "Calendar.customInput" would require us to pass them explicitly
 */
export type CalendarInputProps = unknown & CalendarInputExtraProps

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const CalendarInput: FC<CalendarInputProps> = forwardRef((props, ref) => {
  // Note: Cast the "unknown" props to the actual type
  const propsTyped = props as CalendarInputInternalProps

  return <CalendarInputInternal {...propsTyped} />
})

CalendarInput.displayName = 'CalendarInput'
