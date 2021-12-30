import React, { createRef } from 'react'
import { Form, Formik, FormikProps } from 'formik'
import { mountAndCheckA11Y, simulateChange } from '@hazelcast/test-helpers'
import { act } from 'react-dom/test-utils'

import { NumberFieldFormik } from '../src/NumberFieldFormik'
import { NumberField } from '../src/NumberField'

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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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

    const wrapper = await mountAndCheckA11Y(<TestForm />)

    expect(wrapper.find(NumberField).prop('error')).toBe('Dark side')

    // We need the `async` call here to wait for processing of the asynchronous 'change'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      simulateChange(wrapper.find('input'), 56)
    })

    expect(wrapper.update().find(NumberField).prop('error')).toBe('Client side validation')

    // the error should remain if the user clears the input (undefined is set as the value in this case)
    // and submits the form. Handles the issue https://github.com/formium/formik/issues/2332
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      simulateChange(wrapper.find('input'), '')
    })

    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      wrapper.find('form').simulate('submit')
    })

    expect(wrapper.update().find(NumberField).prop('error')).toBe('Client side validation')
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

    const wrapper = await mountAndCheckA11Y(<TestForm />)

    // We need the `async` call here to wait for processing of the asynchronous 'change'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      simulateChange(wrapper.find('input'), '56')
    })
    wrapper.update()

    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith(56)
  })
})
