import React, { useState } from 'react'
import { Button } from '../src/Button'
import InteractiveList from '../src/InteractiveList'
import { Form, Formik } from 'formik'
import { logger } from '@hazelcast/services'
import { InteractiveListFormik } from '../src/InteractiveListFormik'

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

export const Default = () => {
  const [value, setValue] = useState<string[]>(['3.3.3.3', '4.4.4.4'])
  return <InteractiveList label="IP Address" name="ip-address" value={value} onChange={setValue} />
}

const CustomAddIpButton = ({ setValue }: { setValue: (value: string) => void }) => {
  return <Button onClick={() => setValue('.....')}>Add Custom IP</Button>
}

export const DefaultWithCustomButton = () => (
  <InteractiveList
    label="IP Address"
    name="ip-address"
    value={['3.3.3.3', '4.4.4.4']}
    onChange={() => {}}
    customAddElement={CustomAddIpButton}
  />
)

export const InteractiveFieldInFormik = () => {
  type Values = {
    ipAddresses: string[]
  }

  const validateIPAddresses = (value: string[]) => (value.some((x) => x[0] === '3') ? "IP can't start with 3" : undefined)

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
          <InteractiveListFormik<Values> name="ipAddresses" label="Name" validate={validateIPAddresses} />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  )

  return <TestForm />
}
