import React, { useState } from 'react'
import { logger } from '@hazelcast/services'

import { SelectFieldOption } from '../src/SelectField'
import { MultiSelect } from '../src'

export default {
  title: 'Components/MultiSelect',
  component: MultiSelect,
}

const name = 'Character'
const label = 'Character'
const options: SelectFieldOption<string>[] = [
  { value: 'Darth Vader', label: 'Darth Vader' },
  { value: 'Luke Skywalker', label: 'Luke Skywalker' },
  { value: 'Obi-Wan Kenobi', label: 'Obi-Wan Kenobi' },
  { value: 'Yoda', label: 'Yoda' },
  { value: 'Han Solo', label: 'Han Solo' },
  { value: 'Boba Fett', label: 'Boba Fett' },
  { value: 'Jar Jar Binks', label: 'Jar Jar Binks' },
]
const value = options[1]

export const Default = () => {
  const [currentValue, setValue] = useState(value)
  return (
    <MultiSelect name={name} value={currentValue} label={label} options={options} onBlur={() => logger.log('blur')} onChange={setValue} />
  )
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE-Hazelcast-Design-System?node-id=10187%3A30',
  },
}
