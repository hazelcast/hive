import React, { createRef } from 'react'
import { Formik, Form, FormikProps } from 'formik'
import { renderAndCheckA11Y } from '@hazelcast/test-helpers'
import { act, fireEvent, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { PasswordFieldFormik } from '../src/PasswordFieldFormik'

describe('PasswordFieldFormik', () => {
  it('can be used in a form', async () => {
    type Values = {
      password: string
    }

    const onSubmit = jest.fn()

    const formikBag = createRef<FormikProps<Values>>()

    const TestForm = () => (
      <Formik<Values>
        innerRef={formikBag}
        initialValues={{
          password: '',
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <PasswordFieldFormik<Values> name="password" label="test" />
        </Form>
      </Formik>
    )

    const { container } = await renderAndCheckA11Y(<TestForm />)

    expect(formikBag.current?.values).toEqual({
      password: '',
    })

    const input = container.querySelector('input')!

    expect(input).toBeInTheDocument()

    await act(() => userEvent.type(input, 'yoda'))

    expect(formikBag.current?.values).toEqual({
      password: 'yoda',
    })

    expect(onSubmit).toBeCalledTimes(0)

    // We need the `async` call here to wait for processing of the asynchronous 'submit'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      fireEvent.submit(container.querySelector('form')!)
    })

    expect(onSubmit).toBeCalledTimes(1)
    expect(onSubmit).toBeCalledWith(
      {
        password: 'yoda',
      },
      expect.anything(),
    )
  })

  it('the error is displayed', async () => {
    type Values = {
      password: string
    }

    const validate = jest.fn().mockImplementation(() => 'Dark side 2')

    const TestForm = () => (
      <Formik<Values>
        initialValues={{
          password: '',
        }}
        initialErrors={{
          password: 'Dark side 1',
        }}
        onSubmit={jest.fn()}
      >
        <Form>
          <PasswordFieldFormik<Values> name="password" label="test" validate={validate} />
        </Form>
      </Formik>
    )

    const { container } = await renderAndCheckA11Y(<TestForm />)

    expect(within(container).queryByText('Dark side 1')).toBeInTheDocument()

    const input = container.querySelector('input')!

    expect(input).toBeInTheDocument()

    await act(() => userEvent.type(input, 'yoda'))

    // Before `blur` the input is not dirty yet
    expect(within(container).queryByText('Dark side 1')).not.toBeInTheDocument()

    // We need the `async` call here to wait for processing of the asynchronous 'blur'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      fireEvent.blur(input)
    })

    // The error is displayed only when the input becomes dirty
    expect(within(container).queryByText('Dark side 2')).toBeInTheDocument()
  })

  it('Calls onChange callback', async () => {
    type Values = {
      password: string
    }

    const onSubmit = jest.fn()
    const onCnange = jest.fn()

    const formikBag = createRef<FormikProps<Values>>()

    const TestForm = () => (
      <Formik<Values>
        innerRef={formikBag}
        initialValues={{
          password: '',
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <PasswordFieldFormik<Values> name="password" label="test" onChange={onCnange} />
        </Form>
      </Formik>
    )

    const { container } = await renderAndCheckA11Y(<TestForm />)

    const input = container.querySelector('input')!

    expect(input).toBeInTheDocument()

    // We need the `async` call here to wait for processing of the asynchronous 'change'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      fireEvent.change(input, { target: { value: 'yoda' } })
    })

    expect(onCnange).toBeCalledTimes(1)
    expect(onCnange).toBeCalledWith('yoda')
  })
})
