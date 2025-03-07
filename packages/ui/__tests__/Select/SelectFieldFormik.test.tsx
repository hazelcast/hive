import React, { createRef } from 'react'
import { Formik, Form, FormikProps } from 'formik'
import { renderAndCheckA11Y } from '@hazelcast/test-helpers'
import { act, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { SelectFieldFormik } from '../../src/Select/SelectFieldFormik'
import { SelectFieldOption } from '../../src/Select/helpers'

const options: SelectFieldOption<string>[] = [
  { value: 'selectValue0', label: 'selectValue0' },
  { value: 'selectValue1', label: 'selectValue1' },
]

describe('SelectFieldFormik', () => {
  it('can be used in a form', async () => {
    type Values = {
      name: string | null
    }

    const onSubmit = jest.fn()

    const formikBag = createRef<FormikProps<Values>>()

    const TestForm = () => (
      <Formik<Values>
        innerRef={formikBag}
        initialValues={{
          name: null,
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <SelectFieldFormik<Values, string> name="name" options={options} label="test" isClearable />
        </Form>
      </Formik>
    )

    const { container } = await renderAndCheckA11Y(<TestForm />)

    expect(formikBag.current?.values).toEqual({
      name: null,
    })
    // We need the `async` call here to wait for processing of the asynchronous 'change'

    await act(async () => {
      fireEvent.mouseDown(container.querySelector('.hz-select-field__indicators')!, { button: 0 })
    })
    await userEvent.click(screen.getByRole('option', { name: options[1].label }))

    expect(formikBag.current?.values).toEqual({
      name: options[1].value,
    })

    // We need the `async` call here to wait for processing of the asynchronous 'change'

    await act(async () => {
      fireEvent.mouseDown(container.querySelector('.hz-select-field__indicators')!, { button: 0 })
    })
    await userEvent.click(screen.getByRole('option', { name: options[0].label }))

    expect(formikBag.current?.values).toEqual({
      name: options[0].value,
    })
  })

  it('displays error', async () => {
    type Values = {
      name: string | null
    }

    const validate = jest.fn().mockImplementation(() => 'error')

    const TestForm = () => (
      <Formik<Values> initialValues={{ name: null }} onSubmit={jest.fn()}>
        <Form>
          <SelectFieldFormik<Values> name="name" options={options} label="test" validate={validate} isClearable />
        </Form>
      </Formik>
    )

    const { container } = await renderAndCheckA11Y(<TestForm />)

    expect(screen.queryByTestId('select-field-error')).toHaveTextContent('')

    // We need the `async` call here to wait for processing of the asynchronous 'change'

    await act(async () => {
      fireEvent.mouseDown(container.querySelector('.hz-select-field__indicators')!, { button: 0 })
    })
    await userEvent.click(screen.getByRole('option', { name: options[1].label }))

    expect(screen.queryByTestId('select-field-error')).toHaveTextContent('error')
  })

  it('calls onChnage callback', async () => {
    type Values = {
      name: string | null
    }
    const onChange = jest.fn()

    const TestForm = () => (
      <Formik<Values> initialValues={{ name: null }} onSubmit={jest.fn()}>
        <Form>
          <SelectFieldFormik<Values> name="name" options={options} label="test" onChange={onChange} />
        </Form>
      </Formik>
    )

    const { container } = await renderAndCheckA11Y(<TestForm />)

    // We need the `async` call here to wait for processing of the asynchronous 'change'

    await act(async () => {
      fireEvent.mouseDown(container.querySelector('.hz-select-field__indicators')!, { button: 0 })
    })
    await userEvent.click(screen.getByRole('option', { name: options[1].label }))

    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith(options[1].value)
  })
})
