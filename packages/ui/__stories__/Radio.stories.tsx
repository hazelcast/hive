import React, { useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Radio } from '../src/Radio'
import styles from '../src/Radio.module.scss'
import { logger } from '@hazelcast/services'
import { RadioGroup } from '../src/RadioGroup'

export default {
  title: 'Components/Radio',
  component: Radio,
}

export const DefaultRadio = () => {
  const idRef = useRef(uuid())
  const [value, setValue] = useState<string>('test')
  return (
    <div>
      Some text
      <Radio
        name={idRef.current}
        value="test2"
        label="Test 2"
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
    </div>
  )
}

export const RadioFocusedUnchecked = () => {
  const idRef = useRef(uuid())
  return (
    <div>
      <Radio
        name={idRef.current}
        value="test2"
        label="Test 2"
        checked={false}
        classNameLabel={styles.focus}
        onChange={(e) => logger.log('change', e.target.checked)}
      />
    </div>
  )
}

export const RadioFocusedChecked = () => {
  const idRef = useRef(uuid())
  return (
    <div>
      <Radio
        name={idRef.current}
        value="test2"
        label="Test 2"
        checked
        classNameLabel={styles.focus}
        onChange={(e) => logger.log('change', e.target.checked)}
      />
    </div>
  )
}
export const RadioDisabledAll = () => {
  const idRef = useRef(uuid())
  const [value, setValue] = useState<string>('test')
  return (
    <div>
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
        disabled
        checked={value === 'test'}
        onChange={({ target: { value } }) => setValue(value)}
      />
    </div>
  )
}
export const RadioDisabledPartially = () => {
  const idRef = useRef(uuid())
  const [value, setValue] = useState<string>('test')
  return (
    <div>
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
    </div>
  )
}

export const RadioWithDescription = () => {
  const idRef = useRef(uuid())
  const [value, setValue] = useState<string>('test')
  return (
    <RadioGroup helperText={'Hello, this is a description'}>
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

export const RadioWithDescriptionAndError = () => {
  const idRef = useRef(uuid())
  const [value, setValue] = useState<string>('test')
  return (
    <RadioGroup helperText={'Hello, this is a description'} error="Error message">
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

DefaultRadio.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=479%3A273',
  },
}
