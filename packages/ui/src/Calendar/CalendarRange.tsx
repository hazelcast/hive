import React, { FC } from 'react'
import { ArrowRight } from 'react-feather'
import cn from 'classnames'

import { Icon } from '../Icon'
import { Calendar, CalendarProps } from './Calendar'

import styles from './CalendarRange.module.scss'

export type CalendarRangeVariant = 'horizontal' | 'vertical'
export type CalendarRangeProps = {
  startDate: CalendarProps['date']
  startInputLabel?: string
  startOpen?: boolean
  onStartDateChange: CalendarProps['onDateChange']
  endDate: CalendarProps['date']
  endInputLabel?: string
  endOpen?: boolean
  variant?: CalendarRangeVariant
  onEndDateChange: CalendarProps['onDateChange']
  insidePopover?: boolean
} & Omit<CalendarProps, 'onDateChange' | 'date' | 'inputLabel'>

export const CalendarRange: FC<CalendarRangeProps> = ({
  startDate,
  startInputLabel = 'From',
  startOpen,
  onStartDateChange,
  endDate,
  endInputLabel = 'To',
  endOpen,
  onEndDateChange,
  size,
  insidePopover = false,
  variant = 'horizontal',
  ...rest
}) => {
  return (
    <div className={cn(styles.container, { [styles.vertical]: variant === 'vertical' })}>
      <Calendar
        data-test="calendar-range-start"
        date={startDate}
        onDateChange={onStartDateChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        inputLabel={startInputLabel}
        open={startOpen}
        size={size}
        insidePopover={insidePopover}
        {...rest}
      />
      {variant === 'horizontal' && (
        <Icon
          data-test="calendar-range-icon"
          className={cn(styles.arrowRight, { [styles.small]: size === 'small' })}
          icon={ArrowRight}
          ariaLabel="Arrow Right"
        />
      )}
      <Calendar
        data-test="calendar-range-end"
        date={endDate}
        onDateChange={onEndDateChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        inputLabel={endInputLabel}
        open={endOpen}
        size={size}
        insidePopover={insidePopover}
        {...rest}
      />
    </div>
  )
}
