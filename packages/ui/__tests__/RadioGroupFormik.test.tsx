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
            <RadioFieldFormik value="aragorn" helperText="The king" label={'Aragorn'} />
            <RadioFieldFormik value="gandalf" helperText="The wizard" label={'Gandalf'} />
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

  it("Server validation throws an error, DOM element contains an error and disappears once it's valid again", async () => {
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
        initialErrors={{
          name: 'Server Error: Invalid name',
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <RadioGroupFieldFormik<Values> name="name">
            <RadioFieldFormik value="aragorn" helperText="The king" label={'Aragorn'} />
            <RadioFieldFormik value="gandalf" helperText="The wizard" label={'Gandalf'} />
          </RadioGroupFieldFormik>
        </Form>
      </Formik>
    )

    const wrapper = await mountAndCheckA11Y(<TestForm />)

    expect(wrapper.find('div').contains('Server Error: Invalid name')).toBeTruthy()

    // let's click other valid option
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      wrapper.find("input[value='gandalf']").simulate('change')
    })

    wrapper.update()
    expect(wrapper.find('div').contains('Server Error: Invalid name')).toBeFalsy()
  })

  it("Server validation throws an error, DOM element contains a client's error once it's invalid again", async () => {
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
        initialErrors={{
          name: 'Server Error: Invalid name',
        }}
        validate={(values) => {
          const errors: Partial<{ [key in keyof Values]: string }> = {
            // we'll make gandalf invalid
            name: values.name === 'gandalf' ? 'Aragorn is stronger!' : undefined,
          }

          return errors
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <RadioGroupFieldFormik<Values> name="name">
            <RadioFieldFormik value="aragorn" helperText="The king" label={'Aragorn'} />
            <RadioFieldFormik value="gandalf" helperText="The wizard" label={'Gandalf'} />
          </RadioGroupFieldFormik>
        </Form>
      </Formik>
    )

    const wrapper = await mountAndCheckA11Y(<TestForm />)

    expect(wrapper.find('div').contains('Server Error: Invalid name')).toBeTruthy()

    // let's click other valid option
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      wrapper.find("input[value='gandalf']").simulate('change')
    })

    wrapper.update()
    expect(wrapper.find('div').contains('Server Error: Invalid name')).toBeFalsy()
    expect(wrapper.find('div').contains('Aragorn is stronger!')).toBeTruthy()
  })
})
