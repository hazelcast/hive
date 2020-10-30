import React, { useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Radio } from '../src/Radio'
import { RadioGroup } from '../src/RadioGroup'
import { Form, Formik } from 'formik'
import { RadioGroupFieldFormik } from '../src/RadioGroupFormik'
import { RadioFieldFormik } from '../src/RadioFormik'
import { logger } from '@hazelcast/services'

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

export const RadioGroupWrappedInFormik = () => {
  type Values = {
    name: string
  }

  const TestForm = () => (
    <Formik<Values>
      initialValues={{
        name: 'invalid_name',
      }}
      initialErrors={{
        name: 'Server Error: Invalid name',
      }}
      validate={(values) => {
        const errors: Partial<Values> = {
          name: values.name === 'invalid_name' ? 'Name is invalid' : undefined,
        }

        return errors
      }}
      onSubmit={(values) => logger.log('submit', values)}
    >
      {({ values }) => (
        <Form>
          Values: {JSON.stringify(values)}
          <RadioGroupFieldFormik<Values> name="name">
            <RadioFieldFormik<Values>
              value="invalid_name"
              name="name"
              helperText="This field contains invalid value"
              label={'Invalid Name'}
            />
            <RadioFieldFormik<Values> value="joey" name="name" helperText="Joey is the best!" label={'Joey'} />
          </RadioGroupFieldFormik>
        </Form>
      )}
    </Formik>
  )

  return <TestForm />
}

RadioGroupWithDescription.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=479%3A273',
  },
}
