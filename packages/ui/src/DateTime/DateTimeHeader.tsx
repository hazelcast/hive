import React, { FC } from 'react'
import { ReactDatePickerProps } from 'react-datepicker'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { format } from 'date-fns'

import { IconButton } from '../IconButton'

import styles from './DateTimeInput.module.scss'
import styleConsts from '../styles/constants/export.module.scss'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExtractFnArgumentType<T> = T extends (arg: infer U) => any ? U : never

/*
 * Note:
 * react-datepicker does expose header props type as "renderCustomHeader", however the property is defined
 * as a render-prop.
 * This way we can pick the argument type from the render function and convert the property
 * to use a regular component, rather than a render-prop.
 *
 * There is no significant benefit other than readability and potentially couple of saved renders.
 */
type DateTimeHeaderProps = ExtractFnArgumentType<ReactDatePickerProps['renderCustomHeader']>

export const DateTimeHeader: FC<DateTimeHeaderProps> = ({ date, decreaseMonth, increaseMonth }) => {
  return (
    <div data-test="date-picker-header" className={styles.headerContainer}>
      <IconButton
        data-test="date-picker-header-icon-previous"
        icon={ChevronLeft}
        ariaLabel="Previous month"
        iconColor={styleConsts.colorPrimary}
        onClick={decreaseMonth}
      />
      <div className={styles.headerMonthAndYear}>{format(date, 'MMMM y')}</div>
      <IconButton
        data-test="date-picker-header-icon-next"
        icon={ChevronRight}
        ariaLabel="Next month"
        iconColor={styleConsts.colorPrimary}
        onClick={increaseMonth}
      />
    </div>
  )
}
