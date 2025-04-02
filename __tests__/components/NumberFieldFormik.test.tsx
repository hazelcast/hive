import React, { createRef } from 'react'
import { Form, Formik, FormikProps } from 'formik'
import { renderAndCheckA11Y } from '../../src'
import { act, screen, fireEvent } from '@testing-library/react'

import { NumberFieldFormik } from '../../src/components/NumberFieldFormik'

describe('NumberFieldFormik', () => {
  it('can be used in a form', async () => {
    type Values = {
      name: number
    }

    const onSubmit = jest.fn()

    const formikBag = createRef<FormikProps<Values>>()

    const TestForm = () => (
      <Formik<Values>
        innerRef={formikBag}
        initialValues={{
          name: 42,
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <NumberFieldFormik<Values> name="name" placeholder="Enter the name" label="test" />
        </Form>
      </Formik>
    )

    const { container } = await renderAndCheckA11Y(<TestForm />)

    expect(formikBag.current?.values).toEqual({
      name: 42,
    })

    await act(async () => {
      fireEvent.change(container.querySelector('input')!, { target: { value: 56 } })
    })

    expect(formikBag.current?.values).toEqual({
      name: 56,
    })

    await act(async () => {
      fireEvent.click(screen.getByTestId('number-field-decrement'))
    })

    expect(formikBag.current?.values).toEqual({
      name: 55,
    })

    await act(async () => {
      fireEvent.click(screen.getByTestId('number-field-increment'))
    })
    expect(formikBag.current?.values).toEqual({
      name: 56,
    })

    expect(onSubmit).toBeCalledTimes(0)

    await act(async () => {
      fireEvent.submit(container.querySelector('form')!)
    })

    expect(onSubmit).toBeCalledTimes(1)
    expect(onSubmit).toBeCalledWith(
      {
        name: 56,
      },
      expect.anything(),
    )
  })

  it('the error is displayed', async () => {
    type Values = {
      name: number
    }

    const validate = jest.fn().mockImplementation(() => 'Client side validation')
    const formikBag = createRef<FormikProps<Values>>()

    const TestForm = () => (
      <Formik<Values>
        innerRef={formikBag}
        initialValues={{
          name: 42,
        }}
        initialErrors={{
          name: 'Dark side',
        }}
        onSubmit={jest.fn()}
      >
        <Form>
          <NumberFieldFormik<Values> name="name" placeholder="Enter the name" label="test" validate={validate} />
        </Form>
      </Formik>
    )

    const { container } = await renderAndCheckA11Y(<TestForm />)

    expect(screen.queryByText('Dark side')).toBeInTheDocument()

    await act(async () => {
      fireEvent.change(container.querySelector('input')!, { target: { value: 56 } })
    })

    expect(screen.queryByText('Client side validation')).toBeInTheDocument()

    // the error should remain if the user clears the input (undefined is set as the value in this case)
    // and submits the form. Handles the issue https://github.com/formium/formik/issues/2332

    await act(async () => {
      fireEvent.change(container.querySelector('input')!, { target: { value: '' } })
    })

    await act(async () => {
      fireEvent.submit(container.querySelector('form')!)
    })

    expect(screen.queryByText('Client side validation')).toBeInTheDocument()
  })

  it('Calls onChange callback', async () => {
    type Values = {
      name: number
    }

    const onSubmit = jest.fn()
    const onChange = jest.fn()

    const TestForm = () => (
      <Formik<Values>
        initialValues={{
          name: 42,
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <NumberFieldFormik<Values> name="name" placeholder="Enter the name" label="test" onChange={onChange} />
        </Form>
      </Formik>
    )

    const { container } = await renderAndCheckA11Y(<TestForm />)

    // We need the `async` call here to wait for processing of the asynchronous 'change'

    await act(async () => {
      fireEvent.change(container.querySelector('input')!, { target: { value: '56' } })
    })

    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith(56)
  })
})
