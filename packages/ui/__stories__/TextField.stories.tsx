import React from 'react'
import { logger } from '@hazelcast/services'
import { Mail } from 'react-feather'

import { TextField } from '../src/TextField'
import styles from '../src/TextField.module.scss'

export default {
  title: 'Components/TextField',
  component: TextField,
}
export const Default = () => (
  <TextField
    name="name"
    value="Yoda"
    placeholder="Enter the name"
    label="Wisest jedi"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
  />
)
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%93%90-Management-Center-Design-System?node-id=0%3A1952',
  },
}

export const Empty = () => (
  <TextField
    name="name"
    placeholder="Enter the name"
    label="Wisest jedi"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
  />
)
Empty.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%93%90-Management-Center-Design-System?node-id=0%3A1952',
  },
}

export const Error = () => (
  <TextField
    name="name"
    value="Yoda"
    placeholder="Enter the name"
    label="Wisest jedi"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    error="Dark side"
  />
)
Error.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%93%90-Management-Center-Design-System?node-id=0%3A2182',
  },
}

export const Hovered = () => (
  <TextField
    name="name"
    value="Yoda"
    placeholder="Enter the name"
    label="Wisest jedi"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    className={styles.hover}
  />
)
Hovered.parameters = {
  design: {
    type: 'figma',
    url: '', // TODO: Fill me
  },
}

export const Focused = () => (
  <TextField
    name="name"
    value="Yoda"
    placeholder="Enter the name"
    label="Wisest jedi"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    className={styles.focus}
  />
)
Focused.parameters = {
  design: {
    type: 'figma',
    url: '', // TODO: Fill me
  },
}

export const FocusedWithError = () => (
  <TextField
    name="name"
    value="Yoda"
    placeholder="Enter the name"
    label="Wisest jedi"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    // eslint-disable-next-line jsx-a11y/no-autofocus
    className={styles.focus}
    error="Dark side"
  />
)
FocusedWithError.parameters = {
  design: {
    type: 'figma',
    url: '', // TODO: Fill me
  },
}

export const Disabled = () => (
  <TextField
    name="name"
    value="Yoda"
    placeholder="Enter the name"
    label="Wisest jedi"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    disabled
  />
)
Disabled.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%93%90-Management-Center-Design-System?node-id=0%3A2213',
  },
}

export const WithHelperText = () => (
  <TextField
    name="name"
    value="Yoda"
    label="Wisest jedi"
    placeholder="Enter the name"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    helperText="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  />
)
WithHelperText.parameters = {
  design: {
    type: 'figma',
    url: '', // TODO: Fill me
  },
}

export const WithIconDefault = () => (
  <TextField
    name="name"
    value="Yoda"
    label="Wisest jedi"
    placeholder="Enter the name"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    inputIcon={Mail}
  />
)
WithIconDefault.parameters = {
  design: {
    type: 'figma',
    url: '', // TODO: Fill me
  },
}

export const WithIconEmpty = () => (
  <TextField
    name="name"
    label="Wisest jedi"
    placeholder="Enter the name"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    inputIcon={Mail}
  />
)
WithIconEmpty.parameters = {
  design: {
    type: 'figma',
    url: '', // TODO: Fill me
  },
}

export const WithIconError = () => (
  <TextField
    name="name"
    label="Wisest jedi"
    placeholder="Enter the name"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    inputIcon={Mail}
    error="Dark side"
  />
)
WithIconError.parameters = {
  design: {
    type: 'figma',
    url: '', // TODO: Fill me
  },
}

export const WithIconHovered = () => (
  <TextField
    name="name"
    label="Wisest jedi"
    placeholder="Enter the name"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    inputIcon={Mail}
    className={styles.hover}
  />
)
WithIconHovered.parameters = {
  design: {
    type: 'figma',
    url: '', // TODO: Fill me
  },
}

export const WithIconFocused = () => (
  <TextField
    name="name"
    label="Wisest jedi"
    placeholder="Enter the name"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    inputIcon={Mail}
    className={styles.focus}
  />
)
WithIconFocused.parameters = {
  design: {
    type: 'figma',
    url: '', // TODO: Fill me
  },
}

export const WithIconFocusedWithError = () => (
  <TextField
    name="name"
    label="Wisest jedi"
    placeholder="Enter the name"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    inputIcon={Mail}
    error="Dark side"
    className={styles.focus}
  />
)
WithIconFocusedWithError.parameters = {
  design: {
    type: 'figma',
    url: '', // TODO: Fill me
  },
}

export const WithIconDisabled = () => (
  <TextField
    name="name"
    label="Wisest jedi"
    placeholder="Enter the name"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    inputIcon={Mail}
    disabled
  />
)
WithIconDisabled.parameters = {
  design: {
    type: 'figma',
    url: '', // TODO: Fill me
  },
}

export const WithIconWithHelperText = () => (
  <TextField
    name="name"
    value="Yoda"
    label="Wisest jedi"
    placeholder="Enter the name"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    helperText="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    inputIcon={Mail}
  />
)
WithIconWithHelperText.parameters = {
  design: {
    type: 'figma',
    url: '', // TODO: Fill me
  },
}
