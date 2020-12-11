import React, { useState } from 'react'
import { logger } from '@hazelcast/services'
import { Form, Formik } from 'formik'

import { RadioGroupFieldFormik } from '../src/RadioGroupFormik'
import { RadioFieldFormik } from '../src/RadioFormik'
import { RadioGroup } from '../src/RadioGroup'
import { Radio } from '../src/Radio'
import { formDecorator } from './decorators'

export default {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  decorators: [formDecorator],
}

export const RadioGroupDefault = () => {
  const [value, setValue] = useState<string>('test')
  return (
    <RadioGroup name="jedi" onChange={({ target: { value } }) => setValue(value)}>
      <Radio value="test2" label="Test 2" disabled checked={value === 'test2'} />
      <Radio value="test" label="Test" checked={value === 'test'} />
    </RadioGroup>
  )
}

export const RadioGroupWithDescriptionAndError = () => {
  const [value, setValue] = useState<string>('test')
  return (
    <RadioGroup error="Error message" name="jedi" onChange={({ target: { value } }) => setValue(value)}>
      <Radio value="test2" label="Test 2" disabled checked={value === 'test2'} helperText={'Hello, this is a description of test 2'} />
      <Radio value="test" label="Test" checked={value === 'test'} helperText={'Hello, this is a description'} />
    </RadioGroup>
  )
}

export const RadioGroupWrappedInFormik = () => {
  type Values = {
    name: string
  }

  const validateName = (value: string | undefined) => (value === 'invalid_name' ? 'Name is invalid' : undefined)

  const TestForm = () => (
    <Formik<Values>
      initialValues={{
        name: 'invalid_name',
      }}
      initialErrors={{
        name: 'Server Error: Invalid name',
      }}
      onSubmit={(values) => logger.log('submit', values)}
    >
      {({ values }) => (
        <Form>
          Values: {JSON.stringify(values)}
          <RadioGroupFieldFormik<Values> name="name" validate={validateName}>
            <RadioFieldFormik value="invalid_name" helperText="This field contains invalid value" label={'Invalid Name'} />
            <RadioFieldFormik value="joey" helperText="Joey is the best!" label={'Joey'} />
          </RadioGroupFieldFormik>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  )

  return <TestForm />
}

export const RadiosInline = () => {
  const [value, setValue] = useState<string>('test')
  return (
    <RadioGroup name="jedi" error="Error" onChange={({ target: { value } }) => setValue(value)} inline>
      <Radio value="test2" label="Test 2" checked={value === 'test2'} />
      <Radio value="test" label="Test" checked={value === 'test'} />
    </RadioGroup>
  )
}

RadioGroupDefault.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=479%3A273',
  },
}
