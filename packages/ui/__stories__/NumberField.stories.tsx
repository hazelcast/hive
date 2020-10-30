import React from 'react'
import { logger } from '@hazelcast/services'

import { NumberField } from '../src/NumberField'
import styles from '../src/TextField.module.scss'

export default {
  title: 'Components/NumberField',
  component: NumberField,
}
export const Default = () => (
  <NumberField
    name="name"
    value="Yoda"
    placeholder="Enter the name"
    label="Wisest jedi"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
  />
)

export const Empty = () => (
  <NumberField
    name="name"
    placeholder="Enter the name"
    label="Wisest jedi"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
  />
)

export const Error = () => (
  <NumberField
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
  <NumberField
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
  <NumberField
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
  <NumberField
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

export const Disabled = () => (
  <NumberField
    name="name"
    value="Yoda"
    placeholder="Enter the name"
    label="Wisest jedi"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    disabled
  />
)

export const WithHelperText = () => (
  <NumberField
    name="name"
    value="Yoda"
    label="Wisest jedi"
    placeholder="Enter the name"
    onBlur={() => logger.log('blur')}
    onChange={(e) => logger.log('change', e.target.value)}
    helperText="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  />
)
