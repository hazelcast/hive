import React from 'react'
import { useUID } from 'react-uid'
import { renderAndCheckA11Y } from '../../../src'
import { screen, within } from '@testing-library/react'
import { Options } from 'react-select'

import { MultiSelectField } from '../../../src/components/Select/MultiSelectField'
import { errorId } from '../../../src/components/Error'
import { getOptionsMap, SelectFieldOption } from '../../../src/components/Select/helpers'

import styles from '../../src/Select/SelectField.module.scss'

jest.mock('react-uid')

const useUIDMock = useUID as jest.Mock<ReturnType<typeof useUID>>

const selectId = 'selectId'
const selectName = 'selectName'
const selectLabel = 'selectLabel'

const options: Options<SelectFieldOption<string>> = [
  { value: 'darth_vader', label: 'Darth Vader' },
  { value: 'luke_skywalker', label: 'Luke Skywalker' },
  { value: 'obi', label: 'Obi-Wan Kenobi' },
  { value: 'yoda', label: 'Yoda' },
  { value: 'han_solo', label: 'Han Solo' },
  { value: 'boba_fett', label: 'Boba Fett' },
  { value: 'jar_jar_binks', label: 'Jar Jar Binks' },
]
const selectedOptions = [options[1]]
const selectedValues = selectedOptions.map(({ value }) => value)

describe('MultiSelectField', () => {
  beforeEach(() => {
    useUIDMock.mockImplementation(() => selectId)
  })

  it('Renders child components with correct props', async () => {
    await renderAndCheckA11Y(
      <MultiSelectField name={selectName} label={selectLabel} options={options} value={selectedValues} onChange={jest.fn()} />,
    )

    const label = screen.queryByText(selectLabel)
    expect(label).toHaveAttribute('for', selectId)
    expect(label).toHaveClass(styles.label)

    expect(screen.getByTestId('multi-select-field-error')).toHaveTextContent('')

    const root = screen.getByTestId('multi-select-field')
    const valueContainer = root.querySelector('.hz-select-field__value-container')
    const input = root.querySelector('.hz-select-field__input')

    expect(valueContainer).toBeInTheDocument()
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('aria-invalid', 'false')
    expect(input).not.toHaveAttribute('aria-errormessage')

    const optionsMap = getOptionsMap(options)

    selectedValues.forEach((value) => {
      expect(within(valueContainer as HTMLElement).queryByText(optionsMap[value].label)).toBeInTheDocument()
    })
  })

  it('Renders Error with error message and ReactSelect with [aria-invalid]=true and `aria-errormessage` with correct id', async () => {
    const selectError = 'Dark side'

    await renderAndCheckA11Y(
      <MultiSelectField
        name={selectName}
        label={selectLabel}
        options={options}
        value={selectedValues}
        onChange={jest.fn()}
        error={selectError}
      />,
    )

    const root = screen.getByTestId('multi-select-field')
    const label = screen.queryByText(selectLabel)
    expect(label).toHaveAttribute('for', selectId)
    expect(label).toHaveClass(styles.label)

    const input = root.querySelector('.hz-select-field__input')

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute('aria-errormessage', errorId(selectId))

    expect(screen.getByTestId('multi-select-field-error')).toHaveTextContent(selectError)
  })

  it('Renders ReactSelect with aria-required attribute', async () => {
    await renderAndCheckA11Y(
      <MultiSelectField name={selectName} label={selectLabel} options={options} value={[]} onChange={jest.fn()} required />,
    )

    const label = screen.queryByText(selectLabel)
    expect(label).toHaveAttribute('for', selectId)
    expect(label).toHaveClass(styles.label)

    const root = screen.getByTestId('multi-select-field')
    const input = root.querySelector('.hz-select-field__input')

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('aria-required')

    expect(screen.getByTestId('multi-select-field-error')).toHaveTextContent('')
  })

  it('Renders ReactSelect with isDisabled=true prop', async () => {
    await renderAndCheckA11Y(
      <MultiSelectField name={selectName} label={selectLabel} onChange={jest.fn()} options={options} value={selectedValues} disabled />,
    )

    const label = screen.queryByText(selectLabel)
    expect(label).toHaveAttribute('for', selectId)
    expect(label).toHaveClass(styles.label)

    const root = screen.getByTestId('multi-select-field')
    const input = root.querySelector('.hz-select-field__input')

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('disabled')

    expect(screen.getByTestId('multi-select-field-error')).toHaveTextContent('')
  })

  it('Hides Label', async () => {
    await renderAndCheckA11Y(
      <MultiSelectField
        name={selectName}
        label={selectLabel}
        onChange={jest.fn()}
        options={options}
        value={selectedValues}
        showAriaLabel
      />,
    )

    expect(screen.queryByText(selectLabel)).not.toBeInTheDocument()
  })

  it('Renders ReactSelectCreatable with correct props', async () => {
    const onChange = jest.fn()

    await renderAndCheckA11Y(
      <MultiSelectField name={selectName} label={selectLabel} value={selectedValues} onChange={onChange} options={options} isCreatable />,
    )

    const label = screen.queryByText(selectLabel)
    expect(label).toHaveAttribute('for', selectId)
    expect(label).toHaveClass(styles.label)

    expect(screen.getByTestId('multi-select-field-error')).toHaveTextContent('')

    const root = screen.getByTestId('multi-select-field')
    const valueContainer = root.querySelector('.hz-select-field__value-container')
    const input = root.querySelector('.hz-select-field__input')

    expect(valueContainer).toBeInTheDocument()
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('aria-invalid', 'false')
    expect(input).not.toHaveAttribute('aria-errormessage')
  })
})
