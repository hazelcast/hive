import React, { useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import cn from 'classnames'

import { Calendar, CalendarProps } from '../src/components/Calendar/Calendar'

import utilsStyles from './utils.module.scss'
import storyStyles from './Calendar.stories.module.scss'

type Story = StoryObj<typeof Calendar>

const Component = ({ date: initialDate, ...args }: CalendarProps) => {
  const [date, setDate] = useState<Date | null>(initialDate)
  return (
    <div className={cn(storyStyles.container, utilsStyles.row)}>
      <Calendar {...args} date={date} onDateChange={(d: Date) => setDate(d)} />
      <Calendar {...args} date={date} onDateChange={(d: Date) => setDate(d)} size={'small'} />
    </div>
  )
}

export default {
  title: 'Components/Calendar',
  component: Component,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE-Hazelcast-Design-System?node-id=9858%3A347',
    },
  },
  args: {
    date: new Date(2022, 11, 20),
    inputLabel: 'Choose Date',
    containerClassName: storyStyles.field,
  },
} as Meta<CalendarProps>

export const Default: Story = {}

export const WithoutLabel: Story = {
  args: {
    inputLabel: undefined,
  },
}

export const Open: Story = {
  args: {
    open: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const WithTime: Story = {
  args: {
    showTimeInput: true,
  },
}

export const OpenWithTime: Story = {
  args: {
    ...Open.args,
    ...WithTime.args,
    containerClassName: storyStyles.openWithTime,
  },
}
