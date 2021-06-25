import React, { createRef } from 'react'
import { Formik, Form, FormikProps } from 'formik'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import { act } from 'react-dom/test-utils'
import Select from 'react-select'

import { MultiSelectFieldFormik } from '../../src/Select/MultiSelectFieldFormik'
import { SelectFieldOption } from '../../src/Select/helpers'
import { Error } from '../../src/Error'

const options: SelectFieldOption<string>[] = [
  { value: 'selectValue0', label: 'selectValue0' },
  { value: 'selectValue1', label: 'selectValue1' },
]

describe('MultiSelectFieldFormik', () => {
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
          <MultiSelectFieldFormik<Values, string> name="names" options={options} label="test" />
        </Form>
      </Formik>
    )

    const wrapper = await mountAndCheckA11Y(<TestForm />)
    const selectInstance = wrapper.find(Select).instance() as Select

    expect(formikBag.current?.values).toEqual({
      names: [],
    })

    // We need the `async` call here to wait for processing of the asynchronous 'change'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      selectInstance.props.onChange?.([options[1]], { action: 'select-option' })
    })
    wrapper.update()

    expect(formikBag.current?.values).toEqual({
      names: [options[1].value],
    })

    // We need the `async` call here to wait for processing of the asynchronous 'change'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      selectInstance.props.onChange?.([options[1], options[0]], { action: 'select-option' })
    })
    wrapper.update()

    expect(formikBag.current?.values).toEqual({
      names: [options[1].value, options[0].value],
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
          <MultiSelectFieldFormik<Values> name="names" options={options} label="test" validate={validate} />
        </Form>
      </Formik>
    )

    const wrapper = await mountAndCheckA11Y(<TestForm />)
    const selectInstance = wrapper.find(Select).instance() as Select

    expect(wrapper.find(Error).prop('error')).toBe(undefined)

    // We need the `async` call here to wait for processing of the asynchronous 'change'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      selectInstance.props.onChange?.([options[1]], { action: 'select-option' })
    })
    wrapper.update()

    // The error is displayed only when the input becomes dirty
    expect(wrapper.find(Error).prop('error')).toBe('error')
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
          <MultiSelectFieldFormik<Values, string> name="names" options={options} label="test" onChange={onChange} />
        </Form>
      </Formik>
    )

    const wrapper = await mountAndCheckA11Y(<TestForm />)
    const selectInstance = wrapper.find(Select).instance() as Select

    expect(formikBag.current?.values).toEqual({
      names: [],
    })

    // We need the `async` call here to wait for processing of the asynchronous 'change'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      selectInstance.props.onChange?.([options[1]], { action: 'select-option' })
    })
    wrapper.update()

    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith([options[1].value])
  })
})
