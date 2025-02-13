import React from 'react'
import { Form, Formik } from 'formik'
import { renderAndCheckA11Y } from '@hazelcast/test-helpers'
import { act, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

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

    const { container } = await renderAndCheckA11Y(<TestForm />)

    expect(onSubmit).toBeCalledTimes(0)

    await act(async () => {
      await userEvent.click(container.querySelector("input[value='aragorn']")!)
      fireEvent.submit(container.querySelector('form')!)
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

    const { container } = await renderAndCheckA11Y(<TestForm />)

    expect(screen.queryByText('Server Error: Invalid name')).toBeInTheDocument()

    // let's click other valid option
    await act(async () => userEvent.click(container.querySelector("input[value='gandalf']")!))

    expect(screen.queryByText('Server Error: Invalid name')).not.toBeInTheDocument()
  })

  it("Server validation throws an error, DOM element contains a client's error once it's invalid again", async () => {
    type Values = {
      tosApproved: boolean
      name: string
    }

    const onSubmit = jest.fn()

    const validateName = (value: string | undefined) => (value === 'gandalf' ? 'Aragorn is stronger!' : undefined)

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
          <RadioGroupFieldFormik<Values> name="name" validate={validateName}>
            <RadioFieldFormik value="aragorn" helperText="The king" label={'Aragorn'} />
            <RadioFieldFormik value="gandalf" helperText="The wizard" label={'Gandalf'} />
          </RadioGroupFieldFormik>
        </Form>
      </Formik>
    )

    const { container } = await renderAndCheckA11Y(<TestForm />)

    expect(screen.queryByText('Server Error: Invalid name')).toBeInTheDocument()
    expect(screen.queryByText('Aragorn is stronger!')).not.toBeInTheDocument()

    // let's click other valid option
    await act(async () => {
      await userEvent.click(container.querySelector("input[value='gandalf']")!)
      fireEvent.blur(container.querySelector("input[value='gandalf']")!)
    })

    expect(screen.queryByText('Server Error: Invalid name')).not.toBeInTheDocument()
    expect(screen.queryByText('Aragorn is stronger!')).toBeInTheDocument()
  })

  it('Calls onChange callback', async () => {
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
          <RadioGroupFieldFormik<Values> name="name" onChange={onChange}>
            <RadioFieldFormik value="aragorn" helperText="The king" label={'Aragorn'} />
            <RadioFieldFormik value="gandalf" helperText="The wizard" label={'Gandalf'} />
          </RadioGroupFieldFormik>
        </Form>
      </Formik>
    )

    const { container } = await renderAndCheckA11Y(<TestForm />)

    await act(() => userEvent.click(container.querySelector("input[value='aragorn']")!))

    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith('aragorn')
  })
})
