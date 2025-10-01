import React from 'react'
import { Formik, Form } from 'formik'
import { renderAndCheckA11Y } from '../../src/test-helpers'
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

    expect(onSubmit).toHaveBeenCalledTimes(0)

    // We need the `async` call here to wait for processing of the asynchronous 'submit'

    await act(async () => {
      fireEvent.submit(container.querySelector('form')!)
    })

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith(
      {
        name: 'Time',
      },
      expect.anything(),
    )
  })
})
