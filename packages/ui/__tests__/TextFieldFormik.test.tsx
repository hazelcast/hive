import React from 'react'
import { Formik, Form } from 'formik'
import { renderAndCheckA11Y } from '@hazelcast/test-helpers'
import { act, fireEvent } from '@testing-library/react'

import { TextFieldFormik } from '../src'

describe('TextFieldFormik', () => {
  it('Can be used in a form', async () => {
    type Values = {
      name: string
    }

    const onSubmit = jest.fn()

    const TestForm = () => (
      <Formik<Values>
        initialValues={{
          name: 'Yoda',
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <TextFieldFormik<Values> name="name" placeholder="Enter the name" label="test" />
        </Form>
      </Formik>
    )

    const { container } = await renderAndCheckA11Y(<TestForm />)

    expect(onSubmit).toBeCalledTimes(0)

    // We need the `async` call here to wait for processing of the asynchronous 'submit'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      fireEvent.submit(container.querySelector('form')!)
    })

    expect(onSubmit).toBeCalledTimes(1)
    expect(onSubmit).toBeCalledWith(
      {
        name: 'Yoda',
      },
      expect.anything(),
    )
  })

  it('Calls onChange callback', async () => {
    type Values = {
      name: string
    }

    const onSubmit = jest.fn()
    const onChange = jest.fn()

    const TestForm = () => (
      <Formik<Values>
        initialValues={{
          name: 'Yoda',
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <TextFieldFormik<Values> name="name" placeholder="Enter the name" label="test" onChange={onChange} />
        </Form>
      </Formik>
    )

    const { container } = await renderAndCheckA11Y(<TestForm />)

    // We need the `async` call here to wait for processing of the asynchronous 'submit'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      fireEvent.change(container.querySelector('input')!, { target: { value: 'new value' } })
    })

    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith('new value')
  })
})
