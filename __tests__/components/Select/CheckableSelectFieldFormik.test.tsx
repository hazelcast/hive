import React, { createRef, act } from 'react'
import { Formik, Form, FormikProps } from 'formik'
import { renderAndCheckA11Y } from '../../../src'
import { fireEvent, screen, within, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { SelectFieldOption } from '../../../src/components/Select/helpers'
import { CheckableSelectFieldFormik } from '../../../src'

const options: SelectFieldOption<string>[] = [
  { value: 'selectValue0', label: 'selectValue0' },
  { value: 'selectValue1', label: 'selectValue1' },
]

describe('CheckableSelectFieldFormik', () => {
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
          <CheckableSelectFieldFormik<Values, string> name="names" options={options} label="test" data-test="test" defaultOpen />
        </Form>
      </Formik>
    )

    await renderAndCheckA11Y(<TestForm />)

    expect(formikBag.current?.values).toEqual({
      names: [],
    })

    await act(async () => {
      fireEvent.click(screen.queryAllByTestId('test-option')[1])
    })

    await waitFor(() => {
      expect(formikBag.current?.values).toEqual({
        names: [options[1].value],
      })
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
          <CheckableSelectFieldFormik<Values> data-test="test" name="names" options={options} label="test" validate={validate} />
        </Form>
      </Formik>
    )

    await renderAndCheckA11Y(<TestForm />)

    expect(screen.getByTestId('test-opener-error')).toHaveTextContent('')

    await userEvent.click(within(screen.getByTestId('test-opener')).getByRole('textbox'))

    await act(async () => {
      fireEvent.click(screen.queryAllByTestId('test-option')[1])
    })

    expect(screen.getByTestId('test-opener-error')).toHaveTextContent('error')
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
          <CheckableSelectFieldFormik<Values, string> data-test="test" name="names" options={options} label="test" onChange={onChange} />
        </Form>
      </Formik>
    )

    await renderAndCheckA11Y(<TestForm />)

    expect(formikBag.current?.values).toEqual({
      names: [],
    })

    await userEvent.click(within(screen.getByTestId('test-opener')).getByRole('textbox'))

    await act(async () => {
      fireEvent.click(screen.queryAllByTestId('test-option')[1])
    })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith([options[1].value])
  })
})
