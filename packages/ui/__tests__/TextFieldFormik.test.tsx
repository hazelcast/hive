import React from 'react'
import { Formik, Form } from 'formik'
import { mountAndCheckA11Y, simulateChange } from '@hazelcast/test-helpers'
import { act } from 'react-dom/test-utils'

import { TextFieldFormik } from '../src'

describe('TextFieldFormik', () => {
  it('Can be used in a form', async () => {
    type Values = {
      name: string
    }

    const onSubmit = jest.fn()

    const TestForm = () => (
      <Formik<Values>
        initialValues={{
          name: 'Yoda',
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <TextFieldFormik<Values> name="name" placeholder="Enter the name" label="test" />
        </Form>
      </Formik>
    )

    const wrapper = await mountAndCheckA11Y(<TestForm />)

    expect(onSubmit).toBeCalledTimes(0)

    // We need the `async` call here to wait for processing of the asynchronous 'submit'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      wrapper.find('form').simulate('submit')
    })

    expect(onSubmit).toBeCalledTimes(1)
    expect(onSubmit).toBeCalledWith(
      {
        name: 'Yoda',
      },
      expect.anything(),
    )
  })

  it('Calls onChange callback', async () => {
    type Values = {
      name: string
    }

    const onSubmit = jest.fn()
    const onChange = jest.fn()

    const TestForm = () => (
      <Formik<Values>
        initialValues={{
          name: 'Yoda',
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <TextFieldFormik<Values> name="name" placeholder="Enter the name" label="test" onChange={onChange} />
        </Form>
      </Formik>
    )

    const wrapper = await mountAndCheckA11Y(<TestForm />)

    // We need the `async` call here to wait for processing of the asynchronous 'submit'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      simulateChange(wrapper.find('input'), 'new value')
    })

    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith('new value')
  })
})
