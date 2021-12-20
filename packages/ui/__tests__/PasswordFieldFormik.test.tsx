import React, { createRef } from 'react'
import { Formik, Form, FormikProps } from 'formik'
import { mountAndCheckA11Y, simulateBlur, simulateChange } from '@hazelcast/test-helpers'
import { act } from 'react-dom/test-utils'

import { PasswordFieldFormik } from '../src/PasswordFieldFormik'
import { Error } from '../src/Error'

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

    const wrapper = await mountAndCheckA11Y(<TestForm />)

    expect(formikBag.current?.values).toEqual({
      password: '',
    })

    // We need the `async` call here to wait for processing of the asynchronous 'change'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      simulateChange(wrapper.find('input'), 'yoda')
    })
    wrapper.update()

    expect(formikBag.current?.values).toEqual({
      password: 'yoda',
    })

    expect(onSubmit).toBeCalledTimes(0)

    // We need the `async` call here to wait for processing of the asynchronous 'submit'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      wrapper.find('form').simulate('submit')
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

    const wrapper = await mountAndCheckA11Y(<TestForm />)

    expect(wrapper.find(Error).prop('error')).toBe('Dark side 1')

    // We need the `async` call here to wait for processing of the asynchronous 'change'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      simulateChange(wrapper.find('input'), 'yoda')
    })
    wrapper.update()

    // Before `blur` the input is not dirty yet
    expect(wrapper.find(Error).prop('error')).toBe(undefined)

    // We need the `async` call here to wait for processing of the asynchronous 'blur'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      simulateBlur(wrapper.find('input'))
    })
    wrapper.update()

    // The error is displayed only when the input becomes dirty
    expect(wrapper.find(Error).prop('error')).toBe('Dark side 2')
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

    const wrapper = await mountAndCheckA11Y(<TestForm />)

    // We need the `async` call here to wait for processing of the asynchronous 'change'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      simulateChange(wrapper.find('input'), 'yoda')
    })
    wrapper.update()

    expect(onCnange).toBeCalledTimes(1)
    expect(onCnange).toBeCalledWith('yoda')
  })
})
