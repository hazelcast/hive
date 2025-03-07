import React, { createRef } from 'react'
import { Formik, Form, FormikProps } from 'formik'
import { renderAndCheckA11Y } from '@hazelcast/test-helpers'
import userEvent from '@testing-library/user-event'
import { screen, act, fireEvent } from '@testing-library/react'

import { MultiSelectFieldFormik } from '../../src/Select/MultiSelectFieldFormik'
import { SelectFieldOption } from '../../src/Select/helpers'

const options: SelectFieldOption<string>[] = [
  { value: 'selectValue0', label: 'selectValue0' },
  { value: 'selectValue1', label: 'selectValue1' },
]

describe('MultiSelectFieldFormik', () => {
  it('can be used in a form', async () => {
    type Values = {
      names: string[]
    }

    const onSubmit = jest.fn()

    const formikBag = createRef<FormikProps<Values>>()

    const TestForm = () => (
      <Formik<Values>
        innerRef={formikBag}
        initialValues={{
          names: [],
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <MultiSelectFieldFormik<Values, string> name="names" options={options} label="test" />
        </Form>
      </Formik>
    )

    const { container } = await renderAndCheckA11Y(<TestForm />)

    expect(formikBag.current?.values).toEqual({
      names: [],
    })

    await act(async () => {
      fireEvent.mouseDown(container.querySelector('.hz-select-field__indicators')!, { button: 0 })
    })
    await userEvent.click(screen.getByRole('option', { name: options[1].label }))

    expect(formikBag.current?.values).toEqual({
      names: [options[1].value],
    })

    // We need the `async` call here to wait for processing of the asynchronous 'change'

    await act(async () => {
      fireEvent.mouseDown(container.querySelector('.hz-select-field__indicators')!, { button: 0 })
    })
    await userEvent.click(screen.getByRole('option', { name: options[0].label }))

    expect(formikBag.current?.values).toEqual({
      names: [options[1].value, options[0].value],
    })
  })

  it('displays error', async () => {
    type Values = {
      names: string[]
    }

    const validate = jest.fn().mockImplementation(() => 'error')

    const TestForm = () => (
      <Formik<Values> initialValues={{ names: [] }} onSubmit={jest.fn()}>
        <Form>
          <MultiSelectFieldFormik<Values> name="names" options={options} label="test" validate={validate} />
        </Form>
      </Formik>
    )

    const { container } = await renderAndCheckA11Y(<TestForm />)

    expect(screen.queryByTestId('multi-select-field-error')).toHaveTextContent('')

    // We need the `async` call here to wait for processing of the asynchronous 'change'

    await act(async () => {
      fireEvent.mouseDown(container.querySelector('.hz-select-field__indicators')!, { button: 0 })
    })
    await userEvent.click(screen.getByRole('option', { name: options[1].label }))

    expect(screen.queryByTestId('multi-select-field-error')).toHaveTextContent('error')
  })

  it('Calls onChange callback', async () => {
    type Values = {
      names: string[]
    }

    const onSubmit = jest.fn()
    const onChange = jest.fn()

    const formikBag = createRef<FormikProps<Values>>()

    const TestForm = () => (
      <Formik<Values>
        innerRef={formikBag}
        initialValues={{
          names: [],
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <MultiSelectFieldFormik<Values, string> name="names" options={options} label="test" onChange={onChange} />
        </Form>
      </Formik>
    )

    const { container } = await renderAndCheckA11Y(<TestForm />)

    expect(formikBag.current?.values).toEqual({
      names: [],
    })

    // We need the `async` call here to wait for processing of the asynchronous 'change'

    await act(async () => {
      fireEvent.mouseDown(container.querySelector('.hz-select-field__indicators')!, { button: 0 })
    })
    await userEvent.click(screen.getByRole('option', { name: options[1].label }))

    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith([options[1].value])
  })
})
