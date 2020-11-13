import React, { createRef } from 'react'
import { Formik, Form, FormikProps } from 'formik'
import { mountAndCheckA11Y, simulateChange } from '@hazelcast/test-helpers'
import { act } from 'react-dom/test-utils'

import { SelectFormik } from '../src/SelectFormik'
import { SelectOption } from '../src/Select'
import { Error } from '../src/Error'

const options: SelectOption[] = [
  { value: 'selectValue0', text: 'selectValue0', disabled: false },
  { value: 'selectValue1', text: 'selectValue1', disabled: false },
]

describe('SelectFormik', () => {
  it('can be used in a form', async () => {
    type Values = {
      name?: string
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

    expect(formikBag.current?.values).toEqual({})

    // We need the `async` call here to wait for processing of the asynchronous 'change'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      simulateChange(wrapper.find('select'), 'selectValue0')
    })
    wrapper.update()

    expect(formikBag.current?.values).toEqual({
      name: 'selectValue0',
    })

    // We need the `async` call here to wait for processing of the asynchronous 'change'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      simulateChange(wrapper.find('select'), 'selectValue1')
    })
    wrapper.update()

    expect(formikBag.current?.values).toEqual({
      name: 'selectValue1',
    })
  })

  it('the error is displayed', async () => {
    type Values = {
      name?: string
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

    expect(wrapper.find(Error).prop('error')).toBe(undefined)

    // We need the `async` call here to wait for processing of the asynchronous 'change'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      simulateChange(wrapper.find('select'), 'selectValue0')
    })
    wrapper.update()

    // The error is displayed only when the input becomes dirty
    expect(wrapper.find(Error).prop('error')).toBe('error')
  })
})
