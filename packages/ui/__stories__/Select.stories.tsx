import React from 'react'
import { Select, SelectOption } from '../src/Select'

export default {
  title: 'Components/Select',
  component: Select,
}

const name = 'Character'
const label = 'Character'
const options: SelectOption[] = [
  { value: 'Darth Vader', text: 'Darth Vader' },
  { value: 'Luke Skywalker', text: 'Luke Skywalker' },
  { value: 'Obi-Wan Kenobi', text: 'Obi-Wan Kenobi' },
  { value: 'Yoda', text: 'Yoda' },
  { value: 'Han Solo', text: 'Han Solo' },
  { value: 'Boba Fett', text: 'Boba Fett' },
  { value: 'Jar Jar Binks', text: 'Jar Jar Binks' },
]

export const Default = () => <Select name={name} label={label} options={options} />
