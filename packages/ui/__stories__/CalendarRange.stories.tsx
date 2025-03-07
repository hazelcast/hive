import { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import cn from 'classnames'

import { CalendarRange, CalendarRangeProps } from '../src/Calendar/CalendarRange'

import utilsStyles from './utils.module.scss'
import storyStyles from './Calendar.stories.module.scss'

type Story = StoryObj<typeof CalendarRange>

const Component = ({ startDate: initialStartDate, endDate: initialEndDate, ...args }: CalendarRangeProps) => {
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

export default {
  title: 'Components/CalendarRange',
  component: Component,
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

export const Default: Story = {}

export const WithoutLabel: Story = {
  args: {
    startInputLabel: '',
    endInputLabel: '',
  },
}

export const Open: Story = {
  args: {
    startOpen: true,
    endOpen: true,
  },
}

export const WithTime: Story = {
  args: {
    showTimeInput: true,
  },
}

export const Small: Story = {
  args: {
    size: 'small',
  },
}

export const Vertical: Story = {
  args: {
    variant: 'vertical',
  },
}
