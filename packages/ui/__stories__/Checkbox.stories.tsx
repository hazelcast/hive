import React, { useState } from 'react'
import { logger } from '@hazelcast/services'

import { Checkbox } from '../src/Checkbox'

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
}

export const Default = () => {
  const [checked, setChecked] = useState<boolean>(true)
  return (
    <Checkbox
      name="default"
      checked={checked}
      label="Label"
      onChange={(e) => {
        setChecked(e.target.checked)
      }}
    />
  )
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=479%3A273',
  },
}

export const Unchecked = () => (
  <Checkbox checked={false} label="Label" name="default" onChange={(e) => logger.log('change', e.target.checked)} />
)

export const WithDescription = () => (
  <Checkbox
    checked={false}
    label="Label"
    helperText="Very long description"
    name="default"
    onChange={(e) => logger.log('change', e.target.checked)}
  />
)

export const WithError = () => (
  <Checkbox
    checked={false}
    label="Label"
    helperText="Very long description"
    error="Something went wrong"
    name="default"
    onChange={(e) => logger.log('change', e.target.checked)}
  />
)

export const Indeterminate = () => (
  <Checkbox checked label="Indeterminate" indeterminate name="default" onChange={(e) => logger.log('change', e.target.checked)} />
)

export const IndeterminateDisabled = () => (
  <Checkbox checked disabled label="Disabled" indeterminate name="default" onChange={(e) => logger.log('change', e.target.checked)} />
)

export const CheckedDisabled = () => (
  <Checkbox checked disabled label="Checked Disabled" name="default" onChange={(e) => logger.log('change', e.target.checked)} />
)

export const UncheckedDisabled = () => (
  <Checkbox checked={false} disabled label="Unchecked Disabled" name="default" onChange={(e) => logger.log('change', e.target.checked)} />
)
