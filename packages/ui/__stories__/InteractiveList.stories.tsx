import React from 'react'
import { Button } from '../src/Button'
import InteractiveList from '../src/InteractiveList'
import { Form, Formik } from 'formik'
import { logger } from '@hazelcast/services'
import { InteractiveListFormik } from '../src/InteractiveListFormik'
import { List } from 'react-feather'

export default {
  title: 'Components/InteractiveList',
  component: InteractiveList,
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 500,
    },
  },
}

const CustomAddIpButton = ({ setValue }: { setValue: (value: string) => void }) => {
  return <Button onClick={() => setValue('127.0.0.1')}>Add Custom IP</Button>
}

export const Default = () => {
  type Values = {
    ipAddresses: string[]
  }

  const validateIPAddress = (value: string) => {
    return value[0] === '3' ? "Cant' start with 3" : undefined
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
          <InteractiveListFormik<Values>
            name="ipAddresses"
            label="Name"
            validate={validateIPAddress}
            inputIcon={List}
            customAddElement={CustomAddIpButton}
          />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  )

  return <TestForm />
}
