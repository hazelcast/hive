import React from 'react'
import { Form, Formik } from 'formik'
import { CheckboxFormik } from '../src/CheckboxFormik'
import { mountAndCheckA11Y, simulateChange } from '@hazelcast/test-helpers'
import { act } from 'react-dom/test-utils'

describe('CheckboxFormik', () => {
  it('Can be used in a form', async () => {
    type Values = {
      tosApproved: boolean
      name: string
    }

    const onSubmit = jest.fn()

    const TestForm = () => (
      <Formik<Values>
        initialValues={{
          tosApproved: false,
          name: 'Yoda',
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <CheckboxFormik<Values> name="tosApproved" label="ToS" />
        </Form>
      </Formik>
    )

    const wrapper = await mountAndCheckA11Y(<TestForm />)

    expect(onSubmit).toBeCalledTimes(0)
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      wrapper.find('form').simulate('submit')
    })

    expect(onSubmit).toBeCalledTimes(1)
    expect(onSubmit).toBeCalledWith(
      {
        tosApproved: false,
        name: 'Yoda',
      },
      expect.anything(),
    )
    expect(wrapper.find('input').props()).toHaveProperty('checked')
  })

  it('Checkbox is changed in a formik scenario', async () => {
    type Values = {
      tosApproved: boolean
      name: string
    }

    const onSubmit = jest.fn()

    const TestForm = () => (
      <Formik<Values>
        initialValues={{
          tosApproved: false,
          name: 'Yoda',
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <CheckboxFormik<Values> name="tosApproved" label="ToS" />
        </Form>
      </Formik>
    )

    const wrapper = await mountAndCheckA11Y(<TestForm />)

    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      simulateChange(wrapper.find('input'), true)
    })

    wrapper.update()

    expect(wrapper.find('input').props()).toHaveProperty('checked', true)
  })

  it('Calls onChange cllback', async () => {
    type Values = {
      tosApproved: boolean
      name: string
    }

    const onSubmit = jest.fn()
    const onChange = jest.fn()

    const TestForm = () => (
      <Formik<Values>
        initialValues={{
          tosApproved: false,
          name: 'Yoda',
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <CheckboxFormik<Values> name="tosApproved" label="ToS" onChange={onChange} />
        </Form>
      </Formik>
    )

    const wrapper = await mountAndCheckA11Y(<TestForm />)

    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      wrapper.find('input').simulate('change', {
        target: {
          name: 'tosApproved',
          checked: true,
        },
      })
    })

    wrapper.update()

    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith(true)
  })
})
