import React from 'react'
import { Form, Formik } from 'formik'
import { CheckboxFieldFormik } from '../src/CheckboxFormik'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
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
          <CheckboxFieldFormik<Values> name="tosApproved" id="tosApproved" label="ToS" />
        </Form>
      </Formik>
    )

    const wrapper = await mountAndCheckA11Y(<TestForm />)

    expect(onSubmit).toBeCalledTimes(0)
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      wrapper.find('label').simulate('click')
    })

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
  })
})
