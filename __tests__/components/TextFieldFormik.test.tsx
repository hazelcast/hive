import React from 'react'
import { Formik, Form } from 'formik'
import { renderAndCheckA11Y } from '../../src/test-helpers'
import { TextFieldFormik } from '../../src'
import { act, fireEvent } from '@testing-library/react'

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

    expect(onSubmit).toHaveBeenCalledTimes(0)

    // We need the `async` call here to wait for processing of the asynchronous 'submit'

    await act(async () => {
      fireEvent.submit(container.querySelector('form')!)
    })

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith(
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

    await act(async () => {
      fireEvent.change(container.querySelector('input')!, { target: { value: 'new value' } })
    })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith('new value')
  })
})
