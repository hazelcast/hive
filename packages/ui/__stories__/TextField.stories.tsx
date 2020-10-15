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
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE?node-id=479%3A273',
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

export const Readonly = () => (
  <TextField
    name="name"
    value="Yoda"
    placeholder="Enter the name"
    label="Wisest jedi"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    readOnly
  />
)

export const ReadonlyFocused = () => (
  <TextField
    name="name"
    value="Yoda"
    placeholder="Enter the name"
    label="Wisest jedi"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    readOnly
    className={styles.focus}
  />
)

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

export const WithIconError = () => (
  <TextField
    name="name"
    label="Wisest jedi"
    value="Yoda"
    placeholder="Enter the name"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    inputIcon={Mail}
    error="Dark side"
  />
)

export const WithIconHovered = () => (
  <TextField
    name="name"
    label="Wisest jedi"
    value="Yoda"
    placeholder="Enter the name"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    inputIcon={Mail}
    className={styles.hover}
  />
)

export const WithIconFocused = () => (
  <TextField
    name="name"
    label="Wisest jedi"
    value="Yoda"
    placeholder="Enter the name"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    inputIcon={Mail}
    className={styles.focus}
  />
)

export const WithIconFocusedWithError = () => (
  <TextField
    name="name"
    label="Wisest jedi"
    value="Yoda"
    placeholder="Enter the name"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    inputIcon={Mail}
    error="Dark side"
    className={styles.focus}
  />
)

export const WithIconReadonly = () => (
  <TextField
    name="name"
    label="Wisest jedi"
    value="Yoda"
    placeholder="Enter the name"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    inputIcon={Mail}
    readOnly
  />
)

export const WithIconReadonlyFocused = () => (
  <TextField
    name="name"
    label="Wisest jedi"
    value="Yoda"
    placeholder="Enter the name"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    inputIcon={Mail}
    readOnly
    className={styles.focus}
  />
)

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
