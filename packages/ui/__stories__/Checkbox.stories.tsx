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
      id="default"
      name="default"
      checked={checked}
      label="Label"
      onChange={(e) => {
        setChecked(e.target.checked)
      }}
    />
  )
}

export const Unchecked = () => (
  <Checkbox id="default" checked={false} label="Label" name="default" onChange={(e) => logger.log('change', e.target.checked)} />
)

export const WithDescription = () => (
  <Checkbox
    id="default"
    checked={false}
    label="Label"
    description="Very long description"
    name="default"
    onChange={(e) => logger.log('change', e.target.checked)}
  />
)

export const WithError = () => (
  <Checkbox
    id="default"
    checked={false}
    label="Label"
    description="Very long description"
    error="Something went wrong"
    name="default"
    onChange={(e) => logger.log('change', e.target.checked)}
  />
)

export const Indeterminate = () => (
  <Checkbox
    id="default"
    checked
    label="Indeterminate"
    indeterminate
    name="default"
    onChange={(e) => logger.log('change', e.target.checked)}
  />
)

export const IndeterminateDisabled = () => (
  <Checkbox
    id="default"
    checked
    disabled
    label="Disabled"
    indeterminate
    name="default"
    onChange={(e) => logger.log('change', e.target.checked)}
  />
)

export const CheckedDisabled = () => (
  <Checkbox
    id="default"
    checked
    disabled
    label="Checked Disabled"
    name="default"
    onChange={(e) => logger.log('change', e.target.checked)}
  />
)

export const UncheckedDisabled = () => (
  <Checkbox
    id="default"
    checked={false}
    disabled
    label="Unchecked Disabled"
    name="default"
    onChange={(e) => logger.log('change', e.target.checked)}
  />
)

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=479%3A273',
  },
}
