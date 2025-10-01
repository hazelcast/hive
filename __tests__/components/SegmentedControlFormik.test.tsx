import React, { createRef } from 'react'
import { Formik, Form, FormikProps } from 'formik'
import { axeDefaultOptions, renderAndCheckA11Y } from '../../src/test-helpers'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { SegmentedControlFormik } from '../../src/components/SegmentedControlFormik'
import { SegmentedControlOption } from '../../src/components/SegmentedControl'

const swCharacters = {
  darth_vader: 'Darth Vader',
  luke_skywalker: 'Luke Skywalker',
  obi: 'Obi-Wan Kenobi',
  yoda: 'Yoda',
}

type SWCharacters = keyof typeof swCharacters

const swCharactersOptions: SegmentedControlOption<SWCharacters>[] = (Object.keys(swCharacters) as SWCharacters[]).map((key) => ({
  value: key,
  label: swCharacters[key],
}))

describe('SegmentedControlFormik', () => {
  it('can be used in a form', async () => {
    type Values = {
      character: string
    }

    const onSubmit = jest.fn()

    const formikBag = createRef<FormikProps<Values>>()

    const TestForm = () => (
      <Formik<Values>
        innerRef={formikBag}
        initialValues={{
          character: 'luke_skywalker',
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <SegmentedControlFormik<Values> name="character" options={swCharactersOptions} label="test" />
        </Form>
      </Formik>
    )
    const rules = axeDefaultOptions?.rules ?? {}
    await renderAndCheckA11Y(<TestForm />, {
      axeOptions: {
        rules: {
          ...rules,
          // RadioGroup.Label is passed role="none" which is appratently wrong
          'aria-allowed-role': { enabled: false },
        },
      },
    })

    expect(formikBag.current?.values).toEqual({
      character: 'luke_skywalker',
    })

    await userEvent.click(screen.getByTestId(`segmented-${swCharactersOptions[2].value}`))

    expect(formikBag.current?.values).toEqual({
      character: 'obi',
    })
  })
})
