import React, { createRef } from 'react'
import { Form, Formik, FormikProps } from 'formik'
import { mountAndCheckA11Y, simulateChange } from '@hazelcast/test-helpers'
import { act } from 'react-dom/test-utils'

import { SliderFormik } from '../src/SliderFormik'

describe('SliderFormik', () => {
  it('can be used in a form', async () => {
    type Values = {
      ram: number
    }

    const onSubmit = jest.fn()

    const formikBag = createRef<FormikProps<Values>>()

    const TestForm = () => (
      <Formik<Values>
        innerRef={formikBag}
        initialValues={{
          ram: 42,
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <SliderFormik<Values> name="ram" label="RAM" min={0} max={100} />
        </Form>
      </Formik>
    )

    const wrapper = await mountAndCheckA11Y(<TestForm />)

    expect(formikBag.current?.values).toEqual({
      ram: 42,
    })

    // We need the `async` call here to wait for processing of the asynchronous 'change'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      simulateChange(wrapper.find('input'), 30)
    })

    expect(formikBag.current?.values).toEqual({
      ram: 30,
    })
  })
})
