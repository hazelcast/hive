import React, { FC, ChangeEvent, InputHTMLAttributes, forwardRef } from 'react'
import { Calendar } from 'react-feather'

import { TextField } from '../../TextField'
import { CalendarSize } from '../Calendar'

export type CalendarInputInternalProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
} & CalendarInputExtraProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>

export const CalendarInputInternal = forwardRef<HTMLInputElement, CalendarInputInternalProps>(
  ({ className, value, onChange, label, textFieldSize, ...props }, ref) => (
    <TextField<'text'>
      {...props}
      mRef={ref}
      size={textFieldSize}
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
  ),
)
CalendarInputInternal.displayName = 'CalendarInputInternal'

export type CalendarInputExtraProps = {
  label: string
  textFieldSize?: CalendarSize
  className?: string
}

/*
 * Note:
 * The types are not available, the element is internally instantiated via React.cloneElement
 * We need to accept the props as unknown and cast them in place
 * Otherwise "Calendar.customInput" would require us to pass them explicitly
 */
export type CalendarInputProps = unknown & CalendarInputExtraProps

export const CalendarInput: FC<CalendarInputProps> = forwardRef<HTMLInputElement, CalendarInputProps>((props, ref) => {
  // Note: Cast the "unknown" props to the actual type
  const propsTyped = props as CalendarInputInternalProps

  return <CalendarInputInternal ref={ref} {...propsTyped} />
})

CalendarInput.displayName = 'CalendarInput'
