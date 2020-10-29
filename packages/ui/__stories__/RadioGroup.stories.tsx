import React, { useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Radio } from '../src/Radio'
import { RadioGroup } from '../src/RadioGroup'

export default {
  title: 'Components/RadioGroup',
  component: RadioGroup,
}

export const RadioGroupWithDescription = () => {
  const idRef = useRef(uuid())
  const [value, setValue] = useState<string>('test')
  return (
    <RadioGroup>
      <Radio
        name={idRef.current}
        value="test2"
        label="Test 2"
        disabled
        checked={value === 'test2'}
        onChange={({ target: { value } }) => setValue(value)}
      />
      <Radio
        name={idRef.current}
        value="test"
        label="Test"
        checked={value === 'test'}
        onChange={({ target: { value } }) => setValue(value)}
      />
    </RadioGroup>
  )
}

export const RadioGroupWithDescriptionAndError = () => {
  const idRef = useRef(uuid())
  const [value, setValue] = useState<string>('test')
  return (
    <RadioGroup error="Error message">
      <Radio
        name={idRef.current}
        value="test2"
        label="Test 2"
        disabled
        checked={value === 'test2'}
        helperText={'Hello, this is a description of test 2'}
        onChange={({ target: { value } }) => setValue(value)}
      />
      <Radio
        name={idRef.current}
        value="test"
        label="Test"
        checked={value === 'test'}
        helperText={'Hello, this is a description'}
        onChange={({ target: { value } }) => setValue(value)}
      />
    </RadioGroup>
  )
}

RadioGroupWithDescription.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=479%3A273',
  },
}
