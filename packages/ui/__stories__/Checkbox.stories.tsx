import React, { useState } from 'react'
import { logger } from '@hazelcast/services'

import { Checkbox } from '../src/Checkbox'

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
}
export const Default = () => {
  const [checked, setChecked] = useState<boolean>(false)
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

export const Unchecked = () => (
  <Checkbox checked={false} label="Label" name="default" onChange={(e) => logger.log('change', e.target.checked)} />
)

export const WithDescription = () => (
  <Checkbox
    checked={false}
    label="Label"
    description="Very long description"
    name="default"
    onChange={(e) => logger.log('change', e.target.checked)}
  />
)

export const Indeterminate = () => (
  <Checkbox checked label="Indeterminate" indeterminate name="default" onChange={(e) => logger.log('change', e.target.checked)} />
)

Default.parameters = {
  design: {
    type: 'figma',
    url: '',
  },
}
