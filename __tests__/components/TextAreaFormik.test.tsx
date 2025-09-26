import React from 'react'
import { Formik, Form } from 'formik'
import { renderAndCheckA11Y } from '../../src'
import { act, fireEvent } from '@testing-library/react'

import { TextAreaFormik } from '../../src/components/TextAreaFormik'

const description =
  'Yoda, a Force-sensitive male being belonging to a mysterious species, was a legendary Jedi Master who witnessed the rise and fall of the Galactic Republic, followed by the rise of the Galactic Empire. Small in stature but revered for his wisdom and power, Yoda trained generations of Jedi, ultimately serving as the Grand Master of the Jedi Order. Having lived through nine centuries of galactic history, he played integral roles in the Clone Wars, the rebirth of the Jedi through Luke Skywalker, and unlocking the path to immortality.'

describe('TextAreaFormik', () => {
  it('Can be used in a form', async () => {
    type Values = {
      description: string
    }

    const onSubmit = jest.fn()

    const TestForm = () => (
      <Formik<Values>
        initialValues={{
          description,
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <TextAreaFormik<Values> name="description" placeholder="Describe the character" label="test" />
        </Form>
      </Formik>
    )

    const { container } = await renderAndCheckA11Y(<TestForm />)

    expect(onSubmit).toHaveBeenCalledTimes(0)

    // We need the `async` call here to wait for processing of the asynchronous 'submit'

    await act(async () => {
      fireEvent.submit(container.querySelector('form')!)
    })

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith(
      {
        description,
      },
      expect.anything(),
    )
  })
})
