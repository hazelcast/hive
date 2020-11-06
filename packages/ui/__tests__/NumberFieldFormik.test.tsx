import React, { createRef } from 'react'
import { Formik, Form, FormikProps } from 'formik'
import { mountAndCheckA11Y, simulateChange } from '@hazelcast/test-helpers'
import { act } from 'react-dom/test-utils'

import { NumberFieldFormik } from '../src/NumberFieldFormik'
import { Error } from '../src/Error'

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

    const wrapper = await mountAndCheckA11Y(<TestForm />)

    expect(formikBag.current?.values).toEqual({
      name: 42,
    })

    // We need the `async` call here to wait for processing of the asynchronous 'change'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      simulateChange(wrapper.find('input'), '56')
    })
    wrapper.update()

    expect(formikBag.current?.values).toEqual({
      name: 56,
    })

    // We need the `async` call here to wait for processing of the asynchronous 'change'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      wrapper.findDataTest('number-field-decrement').at(0).simulate('click')
    })
    wrapper.update()

    expect(formikBag.current?.values).toEqual({
      name: 55,
    })

    // We need the `async` call here to wait for processing of the asynchronous 'change'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      wrapper.findDataTest('number-field-increment').at(0).simulate('click')
    })
    wrapper.update()

    expect(formikBag.current?.values).toEqual({
      name: 56,
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
        name: 56,
      },
      expect.anything(),
    )
  })

  it('the error is displayed', async () => {
    type Values = {
      name: number
    }

    const validate = jest.fn().mockImplementation(() => 'Dark side')

    const TestForm = () => (
      <Formik<Values>
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

    const wrapper = await mountAndCheckA11Y(<TestForm />)

    expect(wrapper.find(Error).prop('error')).toBe(undefined)

    // We need the `async` call here to wait for processing of the asynchronous 'change'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      simulateChange(wrapper.find('input'), '56')
    })
    wrapper.update()

    // The error is displayed only when the input becomes dirty
    expect(wrapper.find(Error).prop('error')).toBe('Dark side')
  })
})
