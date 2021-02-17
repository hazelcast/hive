import React, { FC, FormEvent, forwardRef } from 'react'
import cn from 'classnames'
import { Calendar } from 'react-feather'

import { TextField } from '../TextField'

import styles from './Calendar.module.scss'
import styleConsts from '../../styles/constants/export.module.scss'

/* type CalendarInputProps = {
  value: string
  onChange: (dateTime: Date) => void
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> */

export type CalendarInputProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

/*
 * Note: Cannot be typed due to cloneElement nature
 *
 * TODO: Pass the reference to TextField
 * TODO: Go over the props that are spread to TextField and ensure there are no shenanigans going on
 */
export const CalendarInput: FC<CalendarInputProps> = forwardRef(({ className, value, onChange, ...props }, ref) => {
  const onChangeWrapper = (e: FormEvent<HTMLInputElement>) => {}

  return (
    <TextField<'text'>
      {...props}
      data-test="date-picker-input"
      value={value.toString()}
      onChange={onChangeWrapper}
      inputContainerClassName={cn(styles.calendarInputContainer, className)}
      type="text"
      name="date-picker-input"
      label="Date picker input"
      inputTrailingIcon={Calendar}
      inputTrailingIconLabel="Calendar Icon"
      inputTrailingIconColor={styleConsts.colorPrimary}
    />
  )
})

CalendarInput.displayName = 'CalendarInput'
