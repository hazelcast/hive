import React, { useState } from 'react'
import { logger } from '@hazelcast/services'
import { Check } from 'react-feather'

import { RadioGroup } from '../src/RadioGroup'
import { formDecorator } from './decorators'
import { Radio } from '../src/Radio'

import styles from '../src/Radio.module.scss'

export default {
  title: 'Components/Radio',
  component: Radio,
  decorators: [formDecorator],
}

export const DefaultRadio = () => {
  const [value, setValue] = useState<string>('test')
  return (
    <RadioGroup name="jedi" onChange={({ target: { value } }) => setValue(value)}>
      <Radio value="test2" label="Test 2" checked={value === 'test2'} />
      <Radio value="test" label="Test" checked={value === 'test'} />
    </RadioGroup>
  )
}

export const RadioFocusedUnchecked = () => (
  <RadioGroup name="jedi" onChange={(e) => logger.log('change', e.target.checked)}>
    <Radio value="test2" label="Test 2" checked={false} className={styles.focus} />
  </RadioGroup>
)

export const RadioFocusedChecked = () => (
  <RadioGroup name="jedi" onChange={(e) => logger.log('change', e.target.checked)}>
    <Radio value="test2" label="Test 2" checked className={styles.focus} />
  </RadioGroup>
)

export const RadioHoveredUnchecked = () => (
  <RadioGroup name="jedi" onChange={(e) => logger.log('change', e.target.checked)}>
    <Radio value="test2" label="Test 2" className={styles.hover} checked={false} />
  </RadioGroup>
)

export const RadioHoveredChecked = () => (
  <RadioGroup name="jedi" onChange={(e) => logger.log('change', e.target.checked)}>
    <Radio value="test2" checked label="Test 2" className={styles.hover} />
  </RadioGroup>
)

export const RadioHoveredUncheckedDisabled = () => (
  <RadioGroup name="jedi" onChange={(e) => logger.log('change', e.target.checked)}>
    <Radio value="test2" disabled label="Test 2" className={styles.hover} />
  </RadioGroup>
)
export const RadioHoveredCheckedDisabled = () => (
  <RadioGroup name="jedi" onChange={(e) => logger.log('change', e.target.checked)}>
    <Radio value="test2" disabled checked label="Test 2" className={styles.hover} />
  </RadioGroup>
)

export const RadioFocusedCheckedWithHelp = () => (
  <RadioGroup name="jedi" onChange={(e) => logger.log('change', e.target.checked)}>
    <Radio value="test2" label="Test 2" checked helperText="Hello world, this is quite a long helper text." className={styles.focus} />
  </RadioGroup>
)

export const RadioDisabledAll = () => {
  const [value, setValue] = useState<string>('test')
  return (
    <RadioGroup name="jedi" onChange={({ target: { value } }) => setValue(value)}>
      <Radio value="test2" label="Test 2" disabled checked={value === 'test2'} />
      <Radio value="test" label="Test" disabled checked={value === 'test'} />
    </RadioGroup>
  )
}
export const RadioDisabledPartially = () => {
  const [value, setValue] = useState<string>('test')
  return (
    <RadioGroup name="jedi" onChange={({ target: { value } }) => setValue(value)}>
      <Radio value="test2" label="Test 2" disabled checked={value === 'test2'} />
      <Radio value="test" label="Test" checked={value === 'test'} />
    </RadioGroup>
  )
}
export const RadioCustomCheckmark = () => {
  const [value, setValue] = useState<string>('test')
  const renderCheckmark = (isChecked: boolean) =>
    isChecked ? (
      <Check
        size={16}
        color="green"
        style={{
          order: -1,
        }}
      />
    ) : (
      <div
        style={{
          width: '16px',
          order: -1,
        }}
      />
    )
  return (
    <RadioGroup name="jedi" onChange={({ target: { value } }) => setValue(value)}>
      <Radio
        renderCheckmark={() => renderCheckmark(value === 'test2')}
        value="test2"
        label={
          <span>
            <b>Bold</b> Test 2
          </span>
        }
        checked={value === 'test2'}
      />
      <Radio renderCheckmark={() => renderCheckmark(value === 'test')} value="test" label="Test" checked={value === 'test'} />
    </RadioGroup>
  )
}

DefaultRadio.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=479%3A273',
  },
}
