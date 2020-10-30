import React, { useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Radio } from '../src/Radio'
import styles from '../src/Radio.module.scss'
import { logger } from '@hazelcast/services'

export default {
  title: 'Components/Radio',
  component: Radio,
}

export const DefaultRadio = () => {
  const idRef = useRef(uuid())
  const [value, setValue] = useState<string>('test')
  return (
    <div>
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

export const RadioHoveredUnchecked = () => {
  const idRef = useRef(uuid())
  return (
    <div>
      <Radio
        name={idRef.current}
        value="test2"
        label="Test 2"
        classNameLabel={styles.hover}
        onChange={(e) => logger.log('change', e.target.checked)}
      />
    </div>
  )
}

export const RadioFocusedCheckedWithHelp = () => {
  const idRef = useRef(uuid())
  return (
    <div>
      <Radio
        name={idRef.current}
        value="test2"
        label="Test 2"
        checked
        helperText="Hello world, this is quite a long helper text."
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

DefaultRadio.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=479%3A273',
  },
}
