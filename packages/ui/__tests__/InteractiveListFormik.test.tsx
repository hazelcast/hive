import React, { createRef } from 'react'
import { Form, Formik, FormikProps } from 'formik'
import { mountAndCheckA11Y, simulateChange } from '@hazelcast/test-helpers'
import { act } from 'react-dom/test-utils'

import { Button, InteractiveListFormik, InteractiveListInputRef, InteractiveListItem, TextField } from '../src'
import { List } from 'react-feather'
import * as Yup from 'yup'

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

    const wrapper = await mountAndCheckA11Y(<TestForm />)

    expect(formikBag.current?.values).toEqual({
      ipAddresses: ['1.2.3.4'],
    })

    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      simulateChange(wrapper.find('input'), '127.0.0.1')
    })

    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      wrapper.findDataTest('interactive-list-add-button').at(0).simulate('click')
    })
    wrapper.update()

    expect(formikBag.current?.values).toEqual({
      ipAddresses: ['1.2.3.4', '127.0.0.1'],
    })

    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      wrapper.find('form').simulate('submit')
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

    const wrapper = await mountAndCheckA11Y(<TestForm />)

    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      inputRef.current?.setValue('127.0.0.1')
    })

    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      wrapper.findDataTest('interactive-list-add-button').at(0).simulate('click')
    })
    wrapper.update()

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

    const wrapper = await mountAndCheckA11Y(<TestForm />)

    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      simulateChange(wrapper.find('input'), '127.0.0.1')
    })

    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      wrapper.findDataTest('interactive-list-add-button').at(0).simulate('click')
    })
    wrapper.update()

    expect(formikBag.current?.values).toEqual({
      ipAddresses: ['1.2.3.4', '127.0.0.1'],
    })

    expect(wrapper.find(InteractiveListItem).at(1).prop('content')).toBe('127.0.0.1')
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

    const wrapper = await mountAndCheckA11Y(<TestForm />)

    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      simulateChange(wrapper.find('input'), '1.2.3.4')
    })

    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      wrapper.findDataTest('interactive-list-add-button').at(0).simulate('click')
    })
    wrapper.update()

    expect(wrapper.find(TextField).prop('error')).toBe('You need to provide a unique value')

    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      simulateChange(wrapper.find('input'), ' ')
    })

    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      wrapper.findDataTest('interactive-list-add-button').at(0).simulate('click')
    })
    wrapper.update()

    expect(wrapper.find(TextField).prop('error')).toBe('You need to provide a non empty value')

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

    const wrapper = await mountAndCheckA11Y(<TestForm />)

    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      wrapper.find('form').simulate('submit')
    })
    wrapper.update()
    expect(onSubmit).toBeCalledTimes(0)

    expect(wrapper.find(TextField).prop('error')).toBe('Need at least 2 IP Addresses')
  })
})
