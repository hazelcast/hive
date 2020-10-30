import React from 'react'
import { Form, Formik } from 'formik'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import { act } from 'react-dom/test-utils'
import { RadioGroupFieldFormik } from '../src/RadioGroupFormik'
import { RadioFieldFormik } from '../src/RadioFormik'

describe('RadioGroupFormik', () => {
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
          <RadioGroupFieldFormik<Values> name="name">
            <RadioFieldFormik<Values> value="aragorn" name="name" helperText="The king" label={'Aragorn'} />
            <RadioFieldFormik<Values> value="gandalf" name="name" helperText="The wizard" label={'Gandalf'} />
          </RadioGroupFieldFormik>
        </Form>
      </Formik>
    )

    const wrapper = await mountAndCheckA11Y(<TestForm />)

    expect(onSubmit).toBeCalledTimes(0)
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      wrapper.find("input[value='aragorn']").simulate('change')
      wrapper.find('form').simulate('submit')
    })

    expect(onSubmit).toBeCalledTimes(1)
    expect(onSubmit).toBeCalledWith(
      {
        tosApproved: false,
        name: 'aragorn',
      },
      expect.anything(),
    )
  })
})
