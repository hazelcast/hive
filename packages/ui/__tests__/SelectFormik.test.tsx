import React, { createRef } from 'react'
import { Formik, Form, FormikProps } from 'formik'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import { act } from 'react-dom/test-utils'
import Select, { ValueType } from 'react-select'

import { SelectFormik } from '../src/SelectFormik'
import { Error } from '../src/Error'

type OptionType = { label: string; value: string }

const options = [
  { value: 'selectValue0', label: 'selectValue0' },
  { value: 'selectValue1', label: 'selectValue1' },
]

describe('SelectFormik', () => {
  it('can be used in a form', async () => {
    type Values = {
      name?: ValueType<OptionType>
    }

    const onSubmit = jest.fn()

    const formikBag = createRef<FormikProps<Values>>()

    const TestForm = () => (
      <Formik<Values> innerRef={formikBag} initialValues={{}} onSubmit={onSubmit}>
        <Form>
          <SelectFormik<Values> name="name" options={options} label="test" />
        </Form>
      </Formik>
    )

    const wrapper = await mountAndCheckA11Y(<TestForm />)
    const selectInstance = wrapper.find(Select).instance() as Select

    expect(formikBag.current?.values).toEqual({})

    // We need the `async` call here to wait for processing of the asynchronous 'change'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      selectInstance.props.onChange!(options[1], { action: 'select-option' })
    })
    wrapper.update()

    expect(formikBag.current?.values).toEqual({
      name: options[1],
    })

    // We need the `async` call here to wait for processing of the asynchronous 'change'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      selectInstance.props.onChange!(options[0], { action: 'select-option' })
    })
    wrapper.update()

    expect(formikBag.current?.values).toEqual({
      name: options[0],
    })
  })

  it('the error is displayed', async () => {
    type Values = {
      name?: ValueType<OptionType>
    }

    const validate = jest.fn().mockImplementation(() => 'error')

    const TestForm = () => (
      <Formik<Values> initialValues={{}} onSubmit={jest.fn()}>
        <Form>
          <SelectFormik<Values> name="name" options={options} label="test" validate={validate} />
        </Form>
      </Formik>
    )

    const wrapper = await mountAndCheckA11Y(<TestForm />)
    const selectInstance = wrapper.find(Select).instance() as Select

    expect(wrapper.find(Error).prop('error')).toBe(undefined)

    // We need the `async` call here to wait for processing of the asynchronous 'change'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      selectInstance.props.onChange!(options[1], { action: 'select-option' })
    })
    wrapper.update()

    // The error is displayed only when the input becomes dirty
    expect(wrapper.find(Error).prop('error')).toBe('error')
  })
})
