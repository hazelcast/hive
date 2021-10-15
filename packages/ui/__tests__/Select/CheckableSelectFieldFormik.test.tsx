import React, { createRef } from 'react'
import { Formik, Form, FormikProps } from 'formik'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import { act } from 'react-dom/test-utils'

import { SelectFieldOption } from '../../src/Select/helpers'
import { CheckableSelectFieldFormik } from '../../src'

const options: SelectFieldOption<string>[] = [
  { value: 'selectValue0', label: 'selectValue0' },
  { value: 'selectValue1', label: 'selectValue1' },
]

describe('CheckableSelectFieldFormik', () => {
  it('can be used in a form', async () => {
    type Values = {
      names: string[]
    }

    const onSubmit = jest.fn()

    const formikBag = createRef<FormikProps<Values>>()

    const TestForm = () => (
      <Formik<Values>
        innerRef={formikBag}
        initialValues={{
          names: [],
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <CheckableSelectFieldFormik<Values, string> name="names" options={options} label="test" data-test="test" />
        </Form>
      </Formik>
    )

    const wrapper = await mountAndCheckA11Y(<TestForm />)

    expect(formikBag.current?.values).toEqual({
      names: [],
    })

    act(() => {
      wrapper.findDataTest('test-opener').find('input').simulate('click')
    })
    wrapper.update()

    // We need the `async` call here to wait for processing of the asynchronous 'change'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      wrapper.findDataTest('test-option').at(1).simulate('click')
    })
    wrapper.update()

    expect(formikBag.current?.values).toEqual({
      names: [options[1].value],
    })
  })

  it('displays error', async () => {
    type Values = {
      names: string[]
    }

    const validate = jest.fn().mockImplementation(() => 'error')

    const TestForm = () => (
      <Formik<Values> initialValues={{ names: [] }} onSubmit={jest.fn()}>
        <Form>
          <CheckableSelectFieldFormik<Values> data-test="test" name="names" options={options} label="test" validate={validate} />
        </Form>
      </Formik>
    )

    const wrapper = await mountAndCheckA11Y(<TestForm />)

    expect(wrapper.findDataTest('test-opener').find('input').prop('error')).toBe(undefined)

    act(() => {
      wrapper.findDataTest('test-opener').find('input').simulate('click')
    })
    wrapper.update()

    // We need the `async` call here to wait for processing of the asynchronous 'change'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      wrapper.findDataTest('test-option').at(1).simulate('click')
    })
    wrapper.update()

    // The error is displayed only when the input becomes dirty
    expect(wrapper.findDataTest('test-opener').at(0).prop('error')).toBe('error')
  })

  it('Calls onChange callback', async () => {
    type Values = {
      names: string[]
    }

    const onSubmit = jest.fn()
    const onChange = jest.fn()

    const formikBag = createRef<FormikProps<Values>>()

    const TestForm = () => (
      <Formik<Values>
        innerRef={formikBag}
        initialValues={{
          names: [],
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <CheckableSelectFieldFormik<Values, string> data-test="test" name="names" options={options} label="test" onChange={onChange} />
        </Form>
      </Formik>
    )

    const wrapper = await mountAndCheckA11Y(<TestForm />)

    expect(formikBag.current?.values).toEqual({
      names: [],
    })

    act(() => {
      wrapper.findDataTest('test-opener').find('input').simulate('click')
    })
    wrapper.update()

    // We need the `async` call here to wait for processing of the asynchronous 'change'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      wrapper.findDataTest('test-option').at(1).simulate('click')
    })
    wrapper.update()

    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith([options[1].value])
  })
})
