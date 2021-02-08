import React, { FC, FormEvent, forwardRef } from 'react'
import cn from 'classnames'
import { Calendar } from 'react-feather'

import { TextField } from '../TextField'

import styles from './DateTimeInput.module.scss'
import styleConsts from '../styles/constants/export.module.scss'

/* type DateTimeInputProps = {
  value: string
  onChange: (dateTime: Date) => void
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> */

type DateTimeInputProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

/*
 * Note: Cannot be typed due to cloneElement nature
 *
 * TODO: Pass the reference to TextField
 * TODO: Go over the props that are spread to TextField and ensure there are no shenanigans going on
 */
export const DateTimeInput: FC<DateTimeInputProps> = forwardRef(({ className, value, onChange, ...props }, ref) => {
  const onChangeWrapper = (e: FormEvent<HTMLInputElement>) => {}

  return (
    <TextField<'text'>
      {...props}
      data-test="date-picker-input"
      value={value as string}
      onChange={onChangeWrapper}
      inputContainerClassName={cn(styles.dateTimeCustomInputContainer, className)}
      type="text"
      name="date-picker-input"
      label="Date picker input"
      inputTrailingIcon={Calendar}
      inputTrailingIconLabel="Calendar Icon"
      inputTrailingIconColor={styleConsts.colorPrimary}
    />
  )
})

DateTimeInput.displayName = 'DateTimeInput'
