import React from 'react'
import { logger } from '@hazelcast/services'
import { Select, SelectOption } from '../src/Select'

import styles from '../src/Select.module.scss'

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

export const Default = () => (
  <Select
    name={name}
    value="Yoda"
    label={label}
    options={options}
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
  />
)
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=479%3A273',
  },
}

export const Error = () => (
  <Select
    name="name"
    value="Yoda"
    label="Character"
    options={options}
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    error="Dark side"
  />
)
Error.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=479%3A273',
  },
}

export const Hovered = () => (
  <Select
    className={styles.hover}
    name="name"
    value="Yoda"
    label="Character"
    options={options}
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
  />
)
Hovered.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=479%3A273',
  },
}

export const Focused = () => (
  <Select
    className={styles.focus}
    name="name"
    value="Yoda"
    label="Character"
    options={options}
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
  />
)
Focused.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=479%3A273',
  },
}

export const FocusedWithError = () => (
  <Select
    className={styles.focus}
    name="name"
    value="Yoda"
    label="Character"
    options={options}
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    error="Dark side"
  />
)

export const Disabled = () => (
  <Select
    name="name"
    value="Yoda"
    label="Character"
    options={options}
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    disabled
  />
)
