import React, { useState } from 'react'
import { Meta, Story } from '@storybook/react'

import { SegmentedControl, SegmentedControlOption, SegmentedControlProps } from '../src/SegmentedControl'
import { Form, Formik } from 'formik'
import { logger } from '@hazelcast/services'
import { SegmentedControlFormik } from '../src/SegmentedControlFormik'

const options: SegmentedControlOption[] = [
  { value: 'darth_vader', label: 'Darth Vader' },
  { value: 'luke_skywalker', label: 'Luke Skywalker' },
  { value: 'obi', label: 'Obi-Wan Kenobi' },
  { value: 'yoda', label: 'Yoda' },
]

export default {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=33450%3A0',
    },
  },
  args: {
    label: 'Star Wars Characters',
    options,
    value: options[0].value,
  },
} as Meta<Omit<SegmentedControlProps, 'onChange'>>

const Template: Story<Omit<SegmentedControlProps, 'onChange'>> = ({ value: initialValue, ...args }) => {
  const [value, setValue] = useState<string>(initialValue)
  return <SegmentedControl value={value} onChange={setValue} {...args} />
}

export const Default = Template.bind({})

export const WrappedInFormik = () => {
  type Values = {
    character: string
  }

  const TestForm = () => (
    <Formik<Values>
      initialValues={{
        character: 'darth_vader',
      }}
      onSubmit={(values) => logger.log('submit', values)}
    >
      {({ values }) => (
        <Form>
          Values: {JSON.stringify(values)}
          <SegmentedControlFormik<Values> name="character" label="Name" options={options} />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  )

  return <TestForm />
}
