import React from 'react'
import { Form, Formik } from 'formik'
import { renderAndCheckA11Y } from '../../src'
import { act, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { RadioGroupFieldFormik } from '../../src/components/RadioGroupFormik'
import { RadioFieldFormik } from '../../src/components/RadioFormik'

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

    expect(onSubmit).toHaveBeenCalledTimes(0)

    await userEvent.click(container.querySelector("input[value='aragorn']")!)
    await act(async () => {
      fireEvent.submit(container.querySelector('form')!)
    })

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith(
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
    await userEvent.click(container.querySelector("input[value='gandalf']")!)

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
    await userEvent.click(container.querySelector("input[value='gandalf']")!)
    await act(async () => {
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

    await userEvent.click(container.querySelector("input[value='aragorn']")!)

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith('aragorn')
  })
})
