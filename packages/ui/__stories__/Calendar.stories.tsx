import React, { useState } from 'react'
import { Meta, Story } from '@storybook/react'
import cn from 'classnames'

import { Calendar, CalendarProps } from '../src/Calendar/Calendar'

import utilsStyles from './utils.scss'
import storyStyles from './Calendar.stories.module.scss'

export default {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE-Hazelcast-Design-System?node-id=9858%3A347',
    },
  },
  args: {
    date: new Date(2020, 11, 20),
    inputLabel: 'Choose Date',
    containerClassName: storyStyles.field,
  },
} as Meta<CalendarProps>

const Template: Story<CalendarProps> = ({ date: initialDate, ...args }) => {
  const [date, setDate] = useState<Date | null | undefined>(initialDate)
  return (
    <div className={cn(storyStyles.container, utilsStyles.row)}>
      <Calendar {...args} date={date} onDateChange={(d: Date) => setDate(d)} />
      <Calendar {...args} date={date} onDateChange={(d: Date) => setDate(d)} size={'small'} />
    </div>
  )
}

export const Default = Template.bind({})

export const Open = Template.bind({})
Open.args = {
  open: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}

export const WithTime = Template.bind({})
WithTime.args = {
  showTimeInput: true,
}

export const OpenWithTime = Template.bind({})
OpenWithTime.args = {
  ...Open.args,
  ...WithTime.args,
  containerClassName: storyStyles.openWithTime,
}
