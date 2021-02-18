import React, { FC, ChangeEvent, InputHTMLAttributes, forwardRef } from 'react'
import cn from 'classnames'
import { Calendar } from 'react-feather'

import { TextField } from '../../TextField'

import styles from '../Calendar.module.scss'

export type CalendarInputInternalProps = CalendarInputExtraProps & InputHTMLAttributes<HTMLInputElement>

export const CalendarInputInternal: FC<CalendarInputInternalProps> = ({ className, value, onChange, label, ...props }) => {
  // TODO: Runtime validation and push only if the date is correct
  const onChangeWrapper = (e: ChangeEvent<HTMLInputElement>) => {}

  return (
    <TextField<'text'>
      {...props}
      data-test="calendar-input"
      value={value?.toString()}
      onChange={onChangeWrapper}
      inputContainerClassName={cn(styles.calendarInputContainer, className)}
      type="text"
      name="calendar-input"
      label={label}
      inputTrailingIcon={Calendar}
      inputTrailingIconLabel="Calendar Icon"
    />
  )
}

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
