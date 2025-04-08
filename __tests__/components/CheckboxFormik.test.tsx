import React from 'react'
import { Form, Formik } from 'formik'
import { renderAndCheckA11Y } from '../../src'
import { act, fireEvent } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import { CheckboxFormik } from '../../src/components/CheckboxFormik'

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

    const { container } = await renderAndCheckA11Y(<TestForm />)

    expect(onSubmit).toBeCalledTimes(0)

    fireEvent.submit(container.querySelector('form')!)
    await act(async () => {})

    expect(onSubmit).toBeCalledTimes(1)
    expect(onSubmit).toBeCalledWith(
      {
        tosApproved: false,
        name: 'Yoda',
      },
      expect.anything(),
    )
    expect(container.querySelector('input')!).toHaveProperty('checked', false)
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

    const { container } = await renderAndCheckA11Y(<TestForm />)

    await userEvent.click(container.querySelector('input')!)

    expect(container.querySelector('input')!).toHaveProperty('checked', true)
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

    const { container } = await renderAndCheckA11Y(<TestForm />)

    await userEvent.click(container.querySelector('input')!)

    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith(true)
  })
})
