import React from 'react'
import { logger } from '@hazelcast/services'
import { Select } from '../src/Select'

import styles from '../src/Select.module.scss'

export default {
  title: 'Components/Select',
  component: Select,
}

const name = 'Character'
const label = 'Character'
const options = [
  { value: 'Darth Vader', label: 'Darth Vader' },
  { value: 'Luke Skywalker', label: 'Luke Skywalker' },
  { value: 'Obi-Wan Kenobi', label: 'Obi-Wan Kenobi' },
  { value: 'Yoda', label: 'Yoda' },
  { value: 'Han Solo', label: 'Han Solo' },
  { value: 'Boba Fett', label: 'Boba Fett' },
  { value: 'Jar Jar Binks', label: 'Jar Jar Binks' },
]
const value = options[1]

export const Default = () => (
  <Select
    menuPortalTarget={document.body}
    name={name}
    value={value}
    label={label}
    options={options}
    onBlur={() => logger.log('blur')}
    onChange={(val) => logger.log('change', val)}
  />
)
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=479%3A273',
  },
}

export const NotSelected = () => (
  <Select
    menuPortalTarget={document.body}
    name="name"
    label="Character"
    options={options}
    onBlur={() => logger.log('blur')}
    onChange={(val) => logger.log('change', val)}
  />
)

export const Error = () => (
  <Select
    menuPortalTarget={document.body}
    name="name"
    value={value}
    label="Character"
    options={options}
    onBlur={() => logger.log('blur')}
    onChange={(val) => logger.log('change', val)}
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
    menuPortalTarget={document.body}
    className={styles.hover}
    name="name"
    value={value}
    label="Character"
    options={options}
    onBlur={() => logger.log('blur')}
    onChange={(val) => logger.log('change', val)}
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
    menuPortalTarget={document.body}
    className={styles.focus}
    name="name"
    value={value}
    label="Character"
    options={options}
    onBlur={() => logger.log('blur')}
    onChange={(val) => logger.log('change', val)}
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
    menuPortalTarget={document.body}
    className={styles.focus}
    name="name"
    value={value}
    label="Character"
    options={options}
    onBlur={() => logger.log('blur')}
    onChange={(val) => logger.log('change', val)}
    error="Dark side"
  />
)

export const Disabled = () => (
  <Select
    menuPortalTarget={document.body}
    name="name"
    value={value}
    label="Character"
    options={options}
    onBlur={() => logger.log('blur')}
    onChange={(val) => logger.log('change', val)}
    disabled
  />
)

export const CustomPlaceholder = () => (
  <Select
    menuPortalTarget={document.body}
    name="name"
    value={undefined}
    label="Character"
    options={options}
    onBlur={() => logger.log('blur')}
    onChange={(val) => logger.log('change', val)}
    notSelectedPlaceholder="This is a custom placeholder"
  />
)
