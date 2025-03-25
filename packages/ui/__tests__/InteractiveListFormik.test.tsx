import React, { createRef } from 'react'
import { Form, Formik, FormikProps } from 'formik'
import { renderAndCheckA11Y } from '@hazelcast/test-helpers'
import { act, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { List } from 'react-feather'
import * as Yup from 'yup'

import { InteractiveListInputRef } from '../src/InteractiveList'
import { Button, InteractiveListFormik } from '../src'

describe('InteractiveListFormik', () => {
  it('can be used in a form', async () => {
    type Values = {
      ipAddresses: string[]
    }

    const onSubmit = jest.fn()

    const formikBag = createRef<FormikProps<Values>>()

    const TestForm = () => (
      <Formik<Values>
        innerRef={formikBag}
        initialValues={{
          ipAddresses: ['1.2.3.4'],
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <InteractiveListFormik<Values> name="ipAddresses" label="IP Addresses" inputIcon={List} placeholder="Enter IP Address" />
        </Form>
      </Formik>
    )

    const { container } = await renderAndCheckA11Y(<TestForm />)

    expect(formikBag.current?.values).toEqual({
      ipAddresses: ['1.2.3.4'],
    })

    await userEvent.type(container.querySelector('input')!, '127.0.0.1')
    await userEvent.click(screen.getByTestId('interactive-list-add-button'))

    expect(formikBag.current?.values).toEqual({
      ipAddresses: ['1.2.3.4', '127.0.0.1'],
    })

    await act(async () => {
      fireEvent.submit(container.querySelector('form')!)
    })

    expect(onSubmit).toBeCalledTimes(1)
    expect(onSubmit).toBeCalledWith(
      {
        ipAddresses: ['1.2.3.4', '127.0.0.1'],
      },
      expect.anything(),
    )
  })

  it('input value can be changed from outside of the component', async () => {
    const onSubmit = jest.fn()
    const inputRef = React.createRef<InteractiveListInputRef>()
    type Values = {
      ipAddresses: string[]
    }
    const formikBag = createRef<FormikProps<Values>>()

    const TestForm = () => (
      <Formik<Values>
        innerRef={formikBag}
        initialValues={{
          ipAddresses: ['1.2.3.4'],
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <InteractiveListFormik<Values> name="ipAddresses" label="Name" inputIcon={List} inputControlRef={inputRef}>
            <Button onClick={() => inputRef.current?.setValue('127.0.0.1')}>Add Custom IP</Button>
          </InteractiveListFormik>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    )

    const { container } = await renderAndCheckA11Y(<TestForm />)

    await userEvent.type(container.querySelector('input')!, '127.0.0.1')

    await userEvent.click(screen.getByTestId('interactive-list-add-button'))

    expect(formikBag.current?.values).toEqual({
      ipAddresses: ['1.2.3.4', '127.0.0.1'],
    })
  })

  it('an item is added to a list on successful validation', async () => {
    type Values = {
      ipAddresses: string[]
    }

    const onSubmit = jest.fn()

    const formikBag = createRef<FormikProps<Values>>()

    const TestForm = () => (
      <Formik<Values>
        innerRef={formikBag}
        initialValues={{
          ipAddresses: ['1.2.3.4'],
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <InteractiveListFormik<Values> name="ipAddresses" label="IP Addresses" inputIcon={List} placeholder="Enter IP Address" />
        </Form>
      </Formik>
    )

    const { container } = await renderAndCheckA11Y(<TestForm />)

    await userEvent.type(container.querySelector('input')!, '127.0.0.1')
    await userEvent.click(screen.getByTestId('interactive-list-add-button'))

    expect(formikBag.current?.values).toEqual({
      ipAddresses: ['1.2.3.4', '127.0.0.1'],
    })

    expect(screen.queryAllByTestId('interactive-list-item')[1]).toHaveTextContent('127.0.0.1')
  })

  it('the inline error for an input is shown', async () => {
    type Values = {
      ipAddresses: string[]
    }

    const onSubmit = jest.fn()

    const formikBag = createRef<FormikProps<Values>>()

    const TestForm = () => (
      <Formik<Values>
        innerRef={formikBag}
        initialValues={{
          ipAddresses: ['1.2.3.4'],
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <InteractiveListFormik<Values> name="ipAddresses" label="IP Addresses" inputIcon={List} placeholder="Enter IP Address" />
        </Form>
      </Formik>
    )

    const { container } = await renderAndCheckA11Y(<TestForm />)

    expect(screen.queryByText('You need to provide a unique value')).not.toBeInTheDocument()

    await userEvent.type(container.querySelector('input')!, '1.2.3.4')
    await userEvent.click(screen.getByTestId('interactive-list-add-button'))

    expect(screen.queryByText('You need to provide a unique value')).toBeInTheDocument()

    expect(screen.queryByText('You need to provide a non empty value')).not.toBeInTheDocument()

    await userEvent.clear(container.querySelector('input')!)
    await userEvent.type(container.querySelector('input')!, ' ')
    await userEvent.click(screen.getByTestId('interactive-list-add-button'))

    expect(screen.queryByText('You need to provide a non empty value')).toBeInTheDocument()

    expect(formikBag.current?.values).toEqual({
      ipAddresses: ['1.2.3.4'],
    })
  })

  it('yup validation error is shown on submit', async () => {
    type Values = {
      ipAddresses: string[]
    }

    const schema = Yup.object().shape({
      ipAddresses: Yup.array()
        .of(Yup.string().min(3, 'Needs to be at least ${min} character long'))
        .min(2, 'Need at least ${min} IP Addresses'),
    })

    const onSubmit = jest.fn()

    const formikBag = createRef<FormikProps<Values>>()

    const TestForm = () => (
      <Formik<Values>
        validationSchema={schema}
        innerRef={formikBag}
        initialValues={{
          ipAddresses: ['1.2.3.4'],
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <InteractiveListFormik<Values> name="ipAddresses" label="IP Addresses" inputIcon={List} placeholder="Enter IP Address" />
        </Form>
      </Formik>
    )

    const { container } = await renderAndCheckA11Y(<TestForm />)

    await act(async () => {
      fireEvent.submit(container.querySelector('form')!)
    })

    expect(onSubmit).toBeCalledTimes(0)

    expect(screen.queryByText('Need at least 2 IP Addresses')).toBeInTheDocument()
  })

  it('Should remove item', async () => {
    type Values = {
      ipAddresses: string[]
    }

    const schema = Yup.object().shape({
      ipAddresses: Yup.array()
        .of(Yup.string().min(3, 'Needs to be at least ${min} character long'))
        .min(2, 'Need at least ${min} IP Addresses'),
    })

    const onSubmit = jest.fn()

    const formikBag = createRef<FormikProps<Values>>()

    const TestForm = () => (
      <Formik<Values>
        validationSchema={schema}
        innerRef={formikBag}
        initialValues={{
          ipAddresses: ['4.3.2.1', '1.2.3.4', '127.0.0.1'],
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <InteractiveListFormik<Values> name="ipAddresses" label="IP Addresses" inputIcon={List} placeholder="Enter IP Address" />
        </Form>
      </Formik>
    )

    const { container } = await renderAndCheckA11Y(<TestForm />)

    await userEvent.click(screen.getAllByLabelText('Remove Item')[0])

    await act(async () => {
      fireEvent.submit(container.querySelector('form')!)
    })

    expect(onSubmit).toBeCalledTimes(1)

    expect(formikBag.current?.values).toEqual({
      ipAddresses: ['1.2.3.4', '127.0.0.1'],
    })
  })

  it('Should add item', async () => {
    type Values = {
      ipAddresses: string[]
    }

    const schema = Yup.object().shape({
      ipAddresses: Yup.array()
        .of(Yup.string().min(3, 'Needs to be at least ${min} character long'))
        .min(2, 'Need at least ${min} IP Addresses'),
    })

    const onSubmit = jest.fn()

    const formikBag = createRef<FormikProps<Values>>()

    const TestForm = () => (
      <Formik<Values>
        validationSchema={schema}
        innerRef={formikBag}
        initialValues={{
          ipAddresses: ['4.3.2.1', '1.2.3.4'],
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <InteractiveListFormik<Values> name="ipAddresses" label="IP Addresses" inputIcon={List} placeholder="Enter IP Address" />
        </Form>
      </Formik>
    )

    const { container } = await renderAndCheckA11Y(<TestForm />)

    await userEvent.type(container.querySelector('input')!, '127.0.0.1')

    fireEvent.keyDown(container.querySelector('input')!, {
      key: 'Enter',
      charCode: 13,
    })

    await act(async () => {
      fireEvent.submit(container.querySelector('form')!)
    })

    expect(onSubmit).toBeCalledTimes(1)

    expect(formikBag.current?.values).toEqual({
      ipAddresses: ['4.3.2.1', '1.2.3.4', '127.0.0.1'],
    })
  })
})
