import React from 'react'
import { DateTimeInput } from '../src/DateTimeInput'

import utilsStyles from './utils.scss'

export default {
  title: 'Components/DateTimeInput',
  component: DateTimeInput,
}

export const Default = () => (
  <div className={utilsStyles.modalWrapper}>
    <DateTimeInput />
  </div>
)

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=479%3A273',
  },
}
