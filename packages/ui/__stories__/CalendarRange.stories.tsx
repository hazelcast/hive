import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'
import cn from 'classnames'

import { CalendarRange, CalendarRangeProps } from '../src/Calendar/CalendarRange'

import utilsStyles from './utils.scss'
import storyStyles from './Calendar.stories.module.scss'

export default {
  title: 'Components/CalendarRange',
  component: CalendarRange,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE-Hazelcast-Design-System?node-id=9858%3A347',
    },
  },
  args: {
    startDate: new Date(2022, 11, 20),
    endDate: new Date(2022, 11, 21),
    startInputLabel: 'Choose Date',
    endInputLabel: 'Choose Date',
  },
} as Meta<CalendarRangeProps>

const Template: Story<CalendarRangeProps> = ({ startDate: initialStartDate, endDate: initialEndDate, ...args }) => {
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate)
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate)
  return (
    <div className={cn(storyStyles.container, utilsStyles.row)}>
      <CalendarRange
        {...args}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={(d: Date) => setStartDate(d)}
        onEndDateChange={(d: Date) => setEndDate(d)}
      />
    </div>
  )
}

export const Default = Template.bind({})

export const WithoutLabel = Template.bind({})
WithoutLabel.args = {
  startInputLabel: '',
  endInputLabel: '',
}

export const Open = Template.bind({})
Open.args = {
  startOpen: true,
  endOpen: true,
}

export const WithTime = Template.bind({})
WithTime.args = {
  showTimeInput: true,
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
}

export const Vertical = Template.bind({})
Vertical.args = {
  variant: 'vertical',
}
