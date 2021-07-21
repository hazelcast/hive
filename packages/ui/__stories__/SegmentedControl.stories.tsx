import React, { useState } from 'react'
import { Meta, Story } from '@storybook/react'

import { SegmentedControl, SegmentedControlOption, SegmentedControlProps } from '../src/SegmentedControl'
import { Form, Formik } from 'formik'
import { logger } from '@hazelcast/services'
import { SegmentedControlFormik } from '../src/SegmentedControlFormik'

const swCharacters = {
  darth_vader: 'Darth Vader',
  luke_skywalker: 'Luke Skywalker',
  obi: 'Obi-Wan Kenobi',
  yoda: 'Yoda',
}

type SWCharacters = keyof typeof swCharacters

const swCharactersOptions: SegmentedControlOption<SWCharacters>[] = (Object.keys(swCharacters) as SWCharacters[]).map((key) => ({
  value: key,
  label: swCharacters[key],
}))

export default {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE-Hazelcast-Design-System?node-id=33450%3A0',
    },
  },
  args: {
    label: 'Star Wars Characters',
    options: swCharactersOptions,
    value: swCharactersOptions[0].value,
  },
} as Meta<Omit<SegmentedControlProps<SWCharacters>, 'onChange'>>

const Template: Story<Omit<SegmentedControlProps<SWCharacters>, 'onChange'>> = ({ value: initialValue, ...args }) => {
  const [value, setValue] = useState<SWCharacters>(initialValue)
  return <SegmentedControl<SWCharacters> value={value} onChange={setValue} {...args} />
}

export const Default = Template.bind({})

export const Small = Template.bind({})
Small.args = {
  size: 'small',
}

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
          <SegmentedControlFormik<Values> name="character" label="Name" options={swCharactersOptions} />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  )

  return <TestForm />
}
