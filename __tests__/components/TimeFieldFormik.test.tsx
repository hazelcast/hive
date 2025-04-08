import React from 'react'
import { Formik, Form } from 'formik'
import { renderAndCheckA11Y } from '../../src'
import { act, fireEvent } from '@testing-library/react'

import { TimeFieldFormik } from '../../src/components/TimeFieldFormik'

describe('TimeFieldFormik', () => {
  it('Can be used in a form', async () => {
    type Values = {
      name: string
    }

    const onSubmit = jest.fn()

    const TestForm = () => (
      <Formik<Values>
        initialValues={{
          name: 'Time',
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <TimeFieldFormik<Values> name="name" label="Time" />
        </Form>
      </Formik>
    )

    const { container } = await renderAndCheckA11Y(<TestForm />)

    expect(onSubmit).toBeCalledTimes(0)

    // We need the `async` call here to wait for processing of the asynchronous 'submit'

    await act(async () => {
      fireEvent.submit(container.querySelector('form')!)
    })

    expect(onSubmit).toBeCalledTimes(1)
    expect(onSubmit).toBeCalledWith(
      {
        name: 'Time',
      },
      expect.anything(),
    )
  })
})
