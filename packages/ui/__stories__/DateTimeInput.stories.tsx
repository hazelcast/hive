import React from 'react'
import { DateTimeInput } from '../src/DateTimeInput'

import utilsStyles from './utils.scss'

export default {
  title: 'Components/DateTimeInput',
  component: DateTimeInput,
}

// Equivalent to `2021-02-08T09:00:00.000Z`
const timestamp = 1612774800000
const onTimestampChange = (t?: number | undefined) => console.log(t)

export const Default = () => (
  <div className={utilsStyles.modalWrapper}>
    <DateTimeInput timestamp={timestamp} onTimestampChange={onTimestampChange} />
  </div>
)

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=479%3A273',
  },
}

export const Disabled = () => (
  <div className={utilsStyles.modalWrapper}>
    <DateTimeInput disabled timestamp={timestamp} onTimestampChange={onTimestampChange} />
  </div>
)
