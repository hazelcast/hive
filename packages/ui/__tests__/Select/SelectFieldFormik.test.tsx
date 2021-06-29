import React, { createRef } from 'react'
import { Formik, Form, FormikProps } from 'formik'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import { act } from 'react-dom/test-utils'
import Select from 'react-select'

import { SelectFieldFormik } from '../../src/Select/SelectFieldFormik'
import { SelectFieldOption } from '../../src/Select/helpers'
import { Error } from '../../src/Error'

const options: SelectFieldOption<string>[] = [
  { value: 'selectValue0', label: 'selectValue0' },
  { value: 'selectValue1', label: 'selectValue1' },
]

describe('SelectFieldFormik', () => {
  it('can be used in a form', async () => {
    type Values = {
      name: string | null
    }

    const onSubmit = jest.fn()

    const formikBag = createRef<FormikProps<Values>>()

    const TestForm = () => (
      <Formik<Values>
        innerRef={formikBag}
        initialValues={{
          name: null,
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <SelectFieldFormik<Values, string> name="name" options={options} label="test" isClearable />
        </Form>
      </Formik>
    )

    const wrapper = await mountAndCheckA11Y(<TestForm />)
    const selectInstance = wrapper.find(Select).instance() as Select

    expect(formikBag.current?.values).toEqual({
      name: null,
    })

    // We need the `async` call here to wait for processing of the asynchronous 'change'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      selectInstance.props.onChange?.(options[1], { action: 'select-option' })
    })
    wrapper.update()

    expect(formikBag.current?.values).toEqual({
      name: options[1].value,
    })

    // We need the `async` call here to wait for processing of the asynchronous 'change'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      selectInstance.props.onChange?.(options[0], { action: 'select-option' })
    })
    wrapper.update()

    expect(formikBag.current?.values).toEqual({
      name: options[0].value,
    })
  })

  it('displays error', async () => {
    type Values = {
      name: string | null
    }

    const validate = jest.fn().mockImplementation(() => 'error')

    const TestForm = () => (
      <Formik<Values> initialValues={{ name: null }} onSubmit={jest.fn()}>
        <Form>
          <SelectFieldFormik<Values> name="name" options={options} label="test" validate={validate} isClearable />
        </Form>
      </Formik>
    )

    const wrapper = await mountAndCheckA11Y(<TestForm />)
    const selectInstance = wrapper.find(Select).instance() as Select

    expect(wrapper.find(Error).prop('error')).toBe(undefined)

    // We need the `async` call here to wait for processing of the asynchronous 'change'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      selectInstance.props.onChange?.(options[1], { action: 'select-option' })
    })
    wrapper.update()

    // The error is displayed only when the input becomes dirty
    expect(wrapper.find(Error).prop('error')).toBe('error')
  })

  it('calls onChnage callback', async () => {
    type Values = {
      name: string | null
    }
    const onChange = jest.fn()

    const TestForm = () => (
      <Formik<Values> initialValues={{ name: null }} onSubmit={jest.fn()}>
        <Form>
          <SelectFieldFormik<Values> name="name" options={options} label="test" onChange={onChange} />
        </Form>
      </Formik>
    )

    const wrapper = await mountAndCheckA11Y(<TestForm />)
    const selectInstance = wrapper.find(Select).instance() as Select

    // We need the `async` call here to wait for processing of the asynchronous 'change'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      selectInstance.props.onChange?.(options[1], { action: 'select-option' })
    })
    wrapper.update()

    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith(options[1].value)
  })
})
