import React, { createRef } from 'react'
import { Formik, Form, FormikProps } from 'formik'
import { axeDefaultOptions, mountAndCheckA11Y } from '@hazelcast/test-helpers'
import { act } from 'react-dom/test-utils'

import { SegmentedControlFormik } from '../src/SegmentedControlFormik'
import { SegmentedControl, SegmentedControlOption } from '../src/SegmentedControl'
import { RadioGroup } from '@headlessui/react'

const options: SegmentedControlOption[] = [
  { value: 'darth_vader', label: 'Darth Vader' },
  { value: 'luke_skywalker', label: 'Luke Skywalker' },
  { value: 'obi', label: 'Obi-Wan Kenobi' },
  { value: 'yoda', label: 'Yoda' },
]

describe('SegmentedControlFormik', () => {
  it('can be used in a form', async () => {
    type Values = {
      character: string
    }

    const onSubmit = jest.fn()

    const formikBag = createRef<FormikProps<Values>>()

    const TestForm = () => (
      <Formik<Values>
        innerRef={formikBag}
        initialValues={{
          character: 'luke_skywalker',
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <SegmentedControlFormik name="character" options={options} label="test" />
        </Form>
      </Formik>
    )

    const wrapper = await mountAndCheckA11Y(<TestForm />, {
      axeOptions: {
        rules: {
          ...axeDefaultOptions?.rules,
          // RadioGroup.Label is passed role="none" which is appratently wrong
          'aria-allowed-role': { enabled: false },
        },
      },
    })

    expect(formikBag.current?.values).toEqual({
      character: 'luke_skywalker',
    })

    // We need the `async` call here to wait for processing of the asynchronous 'change'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      wrapper.find(SegmentedControl).find(RadioGroup.Option).at(2).simulate('click')
    })
    wrapper.update()

    expect(formikBag.current?.values).toEqual({
      character: 'obi',
    })
  })
})
