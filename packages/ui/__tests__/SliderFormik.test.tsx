import React, { createRef } from 'react'
import { Form, Formik, FormikProps } from 'formik'
import { renderAndCheckA11Y } from '@hazelcast/test-helpers'
import { act, fireEvent } from '@testing-library/react'

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

    const { container } = await renderAndCheckA11Y(<TestForm />)

    expect(formikBag.current?.values).toEqual({
      ram: 42,
    })

    await act(async () => {
      fireEvent.change(container.querySelector('input')!, { target: { value: 30 } })
    })

    expect(formikBag.current?.values).toEqual({
      ram: 30,
    })
  })
})
