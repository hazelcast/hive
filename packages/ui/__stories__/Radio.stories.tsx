import React, { useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Radio } from '../src/Radio'
import styles from '../src/Radio.module.scss'
import { logger } from '@hazelcast/services'
import { RadioGroup } from '../src/RadioGroup'
import utilStyles from './utils.scss'

export default {
  title: 'Components/Radio',
  component: Radio,
}

export const DefaultRadio = () => {
  const idRef = useRef(uuid())
  const [value, setValue] = useState<string>('test')
  return (
    <RadioGroup name={idRef.current} onChange={({ target: { value } }) => setValue(value)}>
      <Radio value="test2" label="Test 2" checked={value === 'test2'} />
      <Radio value="test" label="Test" checked={value === 'test'} />
    </RadioGroup>
  )
}

export const RadiosInline = () => {
  const idRef = useRef(uuid())
  const [value, setValue] = useState<string>('test')
  return (
    <RadioGroup
      name={idRef.current}
      onChange={({ target: { value } }) => setValue(value)}
      radioGroupClassName={utilStyles.flexDirectionRow}
    >
      Radio Inline
      <Radio value="test2" label="Test 2" checked={value === 'test2'} />
      <Radio value="test" label="Test" checked={value === 'test'} />
    </RadioGroup>
  )
}

export const RadioFocusedUnchecked = () => {
  const idRef = useRef(uuid())
  return (
    <RadioGroup name={idRef.current} onChange={(e) => logger.log('change', e.target.checked)}>
      <Radio value="test2" label="Test 2" checked={false} className={styles.focus} />
    </RadioGroup>
  )
}

export const RadioFocusedChecked = () => {
  const idRef = useRef(uuid())
  return (
    <RadioGroup name={idRef.current} onChange={(e) => logger.log('change', e.target.checked)}>
      <Radio value="test2" label="Test 2" checked className={styles.focus} />
    </RadioGroup>
  )
}

export const RadioHoveredUnchecked = () => {
  const idRef = useRef(uuid())
  return (
    <RadioGroup name={idRef.current} onChange={(e) => logger.log('change', e.target.checked)}>
      <Radio value="test2" label="Test 2" className={styles.hover} />
    </RadioGroup>
  )
}

export const RadioHoveredChecked = () => {
  const idRef = useRef(uuid())
  return (
    <RadioGroup name={idRef.current} onChange={(e) => logger.log('change', e.target.checked)}>
      <Radio value="test2" checked label="Test 2" className={styles.hover} />
    </RadioGroup>
  )
}

export const RadioHoveredUncheckedDisabled = () => {
  const idRef = useRef(uuid())
  return (
    <RadioGroup name={idRef.current} onChange={(e) => logger.log('change', e.target.checked)}>
      <Radio value="test2" disabled label="Test 2" className={styles.hover} />
    </RadioGroup>
  )
}

export const RadioHoveredCheckedDisabled = () => {
  const idRef = useRef(uuid())
  return (
    <RadioGroup name={idRef.current} onChange={(e) => logger.log('change', e.target.checked)}>
      <Radio value="test2" disabled checked label="Test 2" className={styles.hover} />
    </RadioGroup>
  )
}

export const RadioFocusedCheckedWithHelp = () => {
  const idRef = useRef(uuid())
  return (
    <RadioGroup name={idRef.current} onChange={(e) => logger.log('change', e.target.checked)}>
      <Radio value="test2" label="Test 2" checked helperText="Hello world, this is quite a long helper text." className={styles.focus} />
    </RadioGroup>
  )
}

export const RadioDisabledAll = () => {
  const idRef = useRef(uuid())
  const [value, setValue] = useState<string>('test')
  return (
    <RadioGroup name={idRef.current} onChange={({ target: { value } }) => setValue(value)}>
      <Radio value="test2" label="Test 2" disabled checked={value === 'test2'} />
      <Radio value="test" label="Test" disabled checked={value === 'test'} />
    </RadioGroup>
  )
}
export const RadioDisabledPartially = () => {
  const idRef = useRef(uuid())
  const [value, setValue] = useState<string>('test')
  return (
    <RadioGroup name={idRef.current} onChange={({ target: { value } }) => setValue(value)}>
      <Radio value="test2" label="Test 2" disabled checked={value === 'test2'} />
      <Radio value="test" label="Test" checked={value === 'test'} />
    </RadioGroup>
  )
}

DefaultRadio.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=479%3A273',
  },
}
