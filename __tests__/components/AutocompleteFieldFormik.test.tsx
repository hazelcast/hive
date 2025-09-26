import React, { createRef } from 'react'
import { Formik, Form, FormikProps } from 'formik'
import { renderAndCheckA11Y } from '../../src'
import { fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { AutocompleteFieldFormik } from '../../src/components/AutocompleteFieldFormik'
import { AutocompleteFieldOption } from '../../src/components/AutocompleteField'

const options: AutocompleteFieldOption[] = [
  { value: 'selectValue0', label: 'selectValue0' },
  { value: 'selectValue1', label: 'selectValue1' },
]

describe('AutocompleteFieldFormik', () => {
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
          <AutocompleteFieldFormik name="name" options={options} label="test" isClearable />
        </Form>
      </Formik>
    )

    const { container } = await renderAndCheckA11Y(<TestForm />)

    expect(formikBag.current?.values).toEqual({
      name: null,
    })

    fireEvent.mouseDown(container.querySelector('.hz-autocomplete-field__indicators')!, { button: 0 })
    await userEvent.click(screen.getByRole('option', { name: options[1].label }))

    expect(formikBag.current?.values).toEqual({
      name: options[1].value,
    })

    fireEvent.mouseDown(container.querySelector('.hz-autocomplete-field__indicators')!, { button: 0 })
    await userEvent.click(screen.getByRole('option', { name: options[0].label }))

    expect(formikBag.current?.values).toEqual({
      name: options[0].value,
    })
  })

  it('the error is displayed', async () => {
    type Values = {
      name: string | null
    }

    const validate = jest.fn().mockImplementation(() => 'error')

    const TestForm = () => (
      <Formik<Values> initialValues={{ name: null }} onSubmit={jest.fn()}>
        <Form>
          <AutocompleteFieldFormik name="name" options={options} label="test" validate={validate} isClearable />
        </Form>
      </Formik>
    )

    const { container } = await renderAndCheckA11Y(<TestForm />)

    expect(screen.queryByTestId('autocomplete-field-error')).toHaveTextContent('')

    fireEvent.mouseDown(container.querySelector('.hz-autocomplete-field__indicators')!, { button: 0 })
    await userEvent.click(screen.getByRole('option', { name: options[1].label }))

    expect(screen.queryByTestId('autocomplete-field-error')).toHaveTextContent('error')
  })

  it('Calls onChange callback', async () => {
    type Values = {
      name: string | null
    }

    const onSubmit = jest.fn()
    const onChange = jest.fn()

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
          <AutocompleteFieldFormik name="name" options={options} label="test" isClearable onChange={onChange} />
        </Form>
      </Formik>
    )

    const { container } = await renderAndCheckA11Y(<TestForm />)

    fireEvent.mouseDown(container.querySelector('.hz-autocomplete-field__indicators')!, { button: 0 })
    await userEvent.click(screen.getByRole('option', { name: options[1].label }))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(options[1].value)
  })
})
