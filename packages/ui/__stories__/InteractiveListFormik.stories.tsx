import React, { useRef } from 'react'
import { Button } from '../src'
import { InteractiveListInputRef } from '../src/InteractiveList'
import { Form, Formik } from 'formik'
import { logger } from '@hazelcast/services'
import { InteractiveListFormik } from '../src/InteractiveListFormik'
import { List } from 'react-feather'
import * as Yup from 'yup'

export default {
  title: 'Components/InteractiveListFormik',
  component: InteractiveListFormik,
}

export const Default = () => {
  type Values = {
    ipAddresses: string[]
  }

  const TestForm = () => (
    <Formik<Values>
      initialValues={{
        ipAddresses: ['1.2.3.4'],
      }}
      initialErrors={{
        ipAddresses: 'Server Error: Invalid IP Address',
      }}
      onSubmit={(values) => logger.log('submit', values)}
    >
      {({ values }) => (
        <Form>
          Values: {JSON.stringify(values)}
          <InteractiveListFormik<Values> name="ipAddresses" label="IP Addresses" inputIcon={List} />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  )

  return <TestForm />
}

export const WithCustomAddButton = () => {
  type Values = {
    ipAddresses: string[]
  }
  const inputRef = useRef<InteractiveListInputRef>(null)

  const TestForm = () => (
    <Formik<Values>
      initialValues={{
        ipAddresses: ['1.2.3.4'],
      }}
      initialErrors={{
        ipAddresses: 'Server Error: Invalid IP Address',
      }}
      onSubmit={(values) => logger.log('submit', values)}
    >
      {({ values }) => (
        <Form>
          <div>Values: {JSON.stringify(values)}</div>
          <InteractiveListFormik<Values> name="ipAddresses" label="Name" inputIcon={List} inputControlRef={inputRef}>
            <Button onClick={() => inputRef.current?.setValue('127.0.0.1')}>Add Custom IP</Button>
          </InteractiveListFormik>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  )

  return <TestForm />
}

export const DefaultWithYupValidation = () => {
  type Values = {
    ipAddresses: string[]
  }

  const schema = Yup.object().shape({
    ipAddresses: Yup.array()
      .of(Yup.string().min(3, 'Needs to be at least ${min} character long'))
      .min(1, 'Need at least ${min} IP Address'),
  })

  const validateIPAddress = (value: string) => {
    return value[0] === '3' ? "Can't start with 3" : undefined
  }

  const TestForm = () => (
    <Formik<Values>
      validationSchema={schema}
      initialValues={{
        ipAddresses: ['1.2.3.4'],
      }}
      initialErrors={{
        ipAddresses: 'Server Error: Invalid IP Address',
      }}
      onSubmit={(values) => logger.log('submit', values)}
    >
      {({ values, errors }) => (
        <Form>
          <div>Values: {JSON.stringify(values)}</div>
          <div>Errors: {JSON.stringify(errors)}</div>
          <InteractiveListFormik<Values>
            name="ipAddresses"
            label="Name"
            validate={validateIPAddress}
            inputIcon={List}
            placeholder="Type a value starting with 3"
          />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  )

  return <TestForm />
}
