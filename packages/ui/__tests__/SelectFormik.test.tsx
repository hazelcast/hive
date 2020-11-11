import React, { createRef } from 'react'
import { Formik, Form, FormikProps } from 'formik'
import { mountAndCheckA11Y, simulateChange } from '@hazelcast/test-helpers'
import { act } from 'react-dom/test-utils'

import { SelectFormik } from '../src/SelectFormik'
import { SelectOption } from '../src/Select'

const options: SelectOption[] = [
  { value: 'selectValue0', text: 'selectValue0', disabled: false },
  { value: 'selectValue1', text: 'selectValue1', disabled: false },
  { value: 'selectValue2', text: 'selectValue2', disabled: false },
]

describe('SelectFormik', () => {
  it('can be used in a form', async () => {
    type Values = {
      name: string
    }

    const onSubmit = jest.fn()

    const formikBag = createRef<FormikProps<Values>>()

    const TestForm = () => (
      <Formik<Values>
        innerRef={formikBag}
        initialValues={{
          name: 'selectValue0',
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <SelectFormik<Values> name="name" options={options} label="test" />
        </Form>
      </Formik>
    )

    const wrapper = await mountAndCheckA11Y(<TestForm />)

    expect(formikBag.current?.values).toEqual({
      name: 'selectValue0',
    })

    // We need the `async` call here to wait for processing of the asynchronous 'change'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      simulateChange(wrapper.find('select'), 'selectValue1')
    })
    wrapper.update()

    expect(formikBag.current?.values).toEqual({
      name: 'selectValue1',
    })

    // We need the `async` call here to wait for processing of the asynchronous 'change'
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      simulateChange(wrapper.find('select'), 'selectValue0')
    })
    wrapper.update()

    expect(formikBag.current?.values).toEqual({
      name: 'selectValue0',
    })
  })
})
