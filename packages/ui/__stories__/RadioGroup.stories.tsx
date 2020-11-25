import React, { useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Radio } from '../src/Radio'
import { logger } from '@hazelcast/services'
import { RadioGroup } from '../src/RadioGroup'
import { Form, Formik } from 'formik'
import { RadioGroupFieldFormik } from '../src/RadioGroupFormik'
import { RadioFieldFormik } from '../src/RadioFormik'

export default {
  title: 'Components/RadioGroup',
  component: RadioGroup,
}

export const RadioGroupDefault = () => {
  const idRef = useRef(uuid())
  const [value, setValue] = useState<string>('test')
  return (
    <RadioGroup name={idRef.current} onChange={({ target: { value } }) => setValue(value)}>
      <Radio value="test2" label="Test 2" disabled checked={value === 'test2'} />
      <Radio value="test" label="Test" checked={value === 'test'} />
    </RadioGroup>
  )
}

export const RadioGroupWithDescriptionAndError = () => {
  const idRef = useRef(uuid())
  const [value, setValue] = useState<string>('test')
  return (
    <RadioGroup error="Error message" name={idRef.current} onChange={({ target: { value } }) => setValue(value)}>
      <Radio value="test2" label="Test 2" disabled checked={value === 'test2'} helperText={'Hello, this is a description of test 2'} />
      <Radio value="test" label="Test" checked={value === 'test'} helperText={'Hello, this is a description'} />
    </RadioGroup>
  )
}

export const RadioGroupWrappedInFormik = () => {
  type Values = {
    name: string
  }

  const validateName = (value: string) => (value === 'invalid_name' ? 'Name is invalid' : undefined)

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
  const idRef = useRef(uuid())
  const [value, setValue] = useState<string>('test')
  return (
    <RadioGroup name={idRef.current} error="Error" onChange={({ target: { value } }) => setValue(value)} inline>
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
