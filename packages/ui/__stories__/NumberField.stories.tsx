import React, { ChangeEvent, useState } from 'react'
import { logger } from '@hazelcast/services'

import { NumberField } from '../src/NumberField'
import styles from '../src/TextField.module.scss'

const eventHandlers = {
  onBlur: () => logger.log('blur'),
  onChange: (e: ChangeEvent<HTMLInputElement>) => logger.log('change', e.target.value),
  onIncrement: () => logger.log('increment'),
  onDecrement: () => logger.log('decrement'),
}

export default {
  title: 'Components/NumberField',
  component: NumberField,
}
export const Default = () => {
  const [value, setValue] = useState(42)
  return (
    <NumberField
      name="name"
      value={value}
      placeholder="Enter the name"
      label="Wisest jedi"
      {...eventHandlers}
      onChange={({ target: { value } }) => setValue(parseFloat(value))}
    />
  )
}

export const Empty = () => <NumberField name="name" placeholder="Enter the name" label="Wisest jedi" {...eventHandlers} />

export const Error = () => (
  <NumberField name="name" value={42} placeholder="Enter the name" label="Wisest jedi" error="Dark side" {...eventHandlers} />
)

export const Hovered = () => (
  <NumberField name="name" value={42} placeholder="Enter the name" label="Wisest jedi" className={styles.hover} {...eventHandlers} />
)

export const Focused = () => (
  <NumberField name="name" value={42} placeholder="Enter the name" label="Wisest jedi" className={styles.focus} {...eventHandlers} />
)

export const FocusedWithError = () => (
  <NumberField
    name="name"
    value={42}
    placeholder="Enter the name"
    label="Wisest jedi"
    className={styles.focus}
    error="Dark side"
    {...eventHandlers}
  />
)

export const Disabled = () => (
  <NumberField name="name" value={42} placeholder="Enter the name" label="Wisest jedi" disabled {...eventHandlers} />
)

export const DisabledDecrement = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onDecrement, ...reducedEventHandlers } = eventHandlers
  return <NumberField name="name" value={42} placeholder="Enter the name" label="Wisest jedi" {...reducedEventHandlers} />
}

export const DisabledIncrement = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onIncrement, ...reducedEventHandlers } = eventHandlers
  return <NumberField name="name" value={42} placeholder="Enter the name" label="Wisest jedi" {...reducedEventHandlers} />
}

export const WithHelperText = () => (
  <NumberField
    name="name"
    value={42}
    label="Wisest jedi"
    placeholder="Enter the name"
    helperText="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    {...eventHandlers}
  />
)
