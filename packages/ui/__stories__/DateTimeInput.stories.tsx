import React from 'react'
import { DateTimeField } from '../src/DateTime/DateTimeField'

import utilsStyles from './utils.scss'

export default {
  title: 'Components/DateTimeInput',
  component: DateTimeField,
}

// Equivalent to `2021-02-08T09:00:00.000Z`
const timestamp = 1612774800000
const onTimestampChange = (t?: number | undefined) => console.log(t)

export const Default = () => (
  <div className={utilsStyles.modalWrapper}>
    <DateTimeField timestamp={timestamp} onTimestampChange={onTimestampChange} />
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
    <DateTimeField disabled timestamp={timestamp} onTimestampChange={onTimestampChange} />
  </div>
)
