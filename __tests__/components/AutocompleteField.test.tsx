import React from 'react'
import { useUID } from 'react-uid'
import { renderAndCheckA11Y } from '../../src'
import { render, screen, within } from '@testing-library/react'

import {
  getSelectedOptionFromValue,
  AutocompleteField,
  AutocompleteFieldOption,
  highlightOptionText,
} from '../../src/components/AutocompleteField'
import { errorId } from '../../src/components/Error'

import styles from '../../src/components/AutocompleteField.module.scss'

jest.mock('react-uid')

const useUIDMock = useUID as jest.Mock<ReturnType<typeof useUID>>

const selectId = 'selectId'
const selectName = 'selectName'
const selectValue: AutocompleteFieldOption = { value: 'selectValue0', label: 'selectValue0' }
const selectLabel = 'selectLabel'

const selectOptions: AutocompleteFieldOption[] = [
  selectValue,
  { value: 'selectValue1', label: 'selectValue1' },
  { value: 'selectValue2', label: 'selectValue2' },
]

describe('AutocompleteField', () => {
  beforeEach(() => {
    useUIDMock.mockImplementation(() => selectId)
  })

  it('Renders the default with correct props', async () => {
    const onChange = jest.fn()
    const selectValue = 'selectValue0'

    await renderAndCheckA11Y(
      <AutocompleteField name={selectName} label={selectLabel} options={selectOptions} value={selectValue} onChange={onChange} />,
    )

    const label = screen.queryByTestId('autocomplete-field-label')!

    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('for', selectId)
    expect(label).toHaveTextContent(selectLabel)
    expect(label).toHaveClass(styles.label)

    const select = screen.queryByTestId('autocomplete-field')!

    expect(select).toBeInTheDocument()

    const input = select.querySelector('.hz-autocomplete-field__input')

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('id', selectId)
    expect(input).not.toHaveAttribute('disabled')
    expect(input).toHaveAttribute('aria-invalid', 'false')
    expect(input).not.toHaveAttribute('aria-required')
    expect(input).not.toHaveAttribute('aria-errormessage')

    const valueContainer = select.querySelector('.hz-autocomplete-field__value-container') as HTMLElement

    expect(valueContainer).toBeInTheDocument()
    expect(within(valueContainer).queryByText(selectValue)).toBeInTheDocument()

    const error = screen.queryByTestId('autocomplete-field-error')!

    expect(error).toBeInTheDocument()
    expect(error).toHaveTextContent('')
    expect(error).toHaveClass(styles.errorContainer)
    expect(error).toHaveAttribute('id', errorId(selectId))
  })

  it('Renders correctly without label prop', () => {
    const onChange = jest.fn()

    render(<AutocompleteField name={selectName} options={selectOptions} value="selectValue0" onChange={onChange} />)

    expect(screen.queryByTestId('autocomplete-field-label')).not.toBeInTheDocument()
  })

  it('Renders error with correct props', async () => {
    const selectError = 'selectError'
    const onChange = jest.fn()
    const selectValue = 'selectValue0'

    await renderAndCheckA11Y(
      <AutocompleteField
        name={selectName}
        label={selectLabel}
        options={selectOptions}
        value={selectValue}
        onChange={onChange}
        error={selectError}
      />,
    )

    const label = screen.queryByTestId('autocomplete-field-label')!

    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('for', selectId)
    expect(label).toHaveTextContent(selectLabel)
    expect(label).toHaveClass(styles.label)

    const select = screen.queryByTestId('autocomplete-field')!

    expect(select).toBeInTheDocument()

    const input = select.querySelector('.hz-autocomplete-field__input')

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('id', selectId)
    expect(input).not.toHaveAttribute('disabled')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).not.toHaveAttribute('aria-required')
    expect(input).toHaveAttribute('aria-errormessage', errorId(selectId))

    const valueContainer = select.querySelector('.hz-autocomplete-field__value-container') as HTMLElement

    expect(valueContainer).toBeInTheDocument()
    expect(within(valueContainer).queryByText(selectValue)).toBeInTheDocument()

    const error = screen.queryByTestId('autocomplete-field-error')!

    expect(error).toBeInTheDocument()
    expect(error).toHaveTextContent(selectError)
    expect(error).toHaveClass(styles.errorContainer)
    expect(error).toHaveAttribute('id', errorId(selectId))
  })

  it('Renders required with correct props', async () => {
    const onChange = jest.fn()
    const selectValue = 'selectValue0'

    await renderAndCheckA11Y(
      <AutocompleteField name={selectName} label={selectLabel} options={selectOptions} value={selectValue} onChange={onChange} required />,
    )

    const label = screen.queryByTestId('autocomplete-field-label')!

    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('for', selectId)
    expect(label).toHaveTextContent(selectLabel)
    expect(label).toHaveClass(styles.label)

    const select = screen.queryByTestId('autocomplete-field')!

    expect(select).toBeInTheDocument()

    const input = select.querySelector('.hz-autocomplete-field__input')

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('id', selectId)
    expect(input).not.toHaveAttribute('disabled')
    expect(input).toHaveAttribute('aria-invalid', 'false')
    expect(input).not.toHaveAttribute('aria-required')
    expect(input).not.toHaveAttribute('aria-errormessage')

    const valueContainer = select.querySelector('.hz-autocomplete-field__value-container') as HTMLElement

    expect(valueContainer).toBeInTheDocument()
    expect(within(valueContainer).queryByText(selectValue)).toBeInTheDocument()

    const error = screen.queryByTestId('autocomplete-field-error')!

    expect(error).toBeInTheDocument()
    expect(error).toHaveTextContent('')
    expect(error).toHaveClass(styles.errorContainer)
    expect(error).toHaveAttribute('id', errorId(selectId))
  })

  it('Renders disabled with correct props', async () => {
    const onChange = jest.fn()
    const selectValue = 'selectValue0'

    await renderAndCheckA11Y(
      <AutocompleteField name={selectName} label={selectLabel} value={selectValue} onChange={onChange} options={selectOptions} disabled />,
    )

    const label = screen.queryByTestId('autocomplete-field-label')!

    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('for', selectId)
    expect(label).toHaveTextContent(selectLabel)
    expect(label).toHaveClass(styles.label)

    const select = screen.queryByTestId('autocomplete-field')!

    expect(select).toBeInTheDocument()

    const input = select.querySelector('.hz-autocomplete-field__input')

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('id', selectId)
    expect(input).toHaveAttribute('disabled')
    expect(input).toHaveAttribute('aria-invalid', 'false')
    expect(input).not.toHaveAttribute('aria-required')
    expect(input).not.toHaveAttribute('aria-errormessage')

    const valueContainer = select.querySelector('.hz-autocomplete-field__value-container') as HTMLElement

    expect(valueContainer).toBeInTheDocument()
    expect(within(valueContainer).queryByText(selectValue)).toBeInTheDocument()

    const error = screen.queryByTestId('autocomplete-field-error')!

    expect(error).toBeInTheDocument()
    expect(error).toHaveTextContent('')
    expect(error).toHaveClass(styles.errorContainer)
    expect(error).toHaveAttribute('id', errorId(selectId))
  })

  it('Renders clearable with correct props', async () => {
    const onChange = jest.fn()
    const selectValue = 'selectValue0'

    const { container } = await renderAndCheckA11Y(
      <AutocompleteField
        name={selectName}
        label={selectLabel}
        value={selectValue}
        onChange={onChange}
        options={selectOptions}
        isClearable
      />,
    )

    const label = screen.queryByTestId('autocomplete-field-label')!

    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('for', selectId)
    expect(label).toHaveTextContent(selectLabel)
    expect(label).toHaveClass(styles.label)

    const select = screen.queryByTestId('autocomplete-field')!

    expect(select).toBeInTheDocument()

    const input = select.querySelector('.hz-autocomplete-field__input')

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('id', selectId)
    expect(input).not.toHaveAttribute('disabled')
    expect(input).toHaveAttribute('aria-invalid', 'false')
    expect(input).not.toHaveAttribute('aria-required')
    expect(input).not.toHaveAttribute('aria-errormessage')

    const valueContainer = select.querySelector('.hz-autocomplete-field__value-container') as HTMLElement

    expect(valueContainer).toBeInTheDocument()
    expect(within(valueContainer).queryByText(selectValue)).toBeInTheDocument()

    const error = screen.queryByTestId('autocomplete-field-error')!

    expect(error).toBeInTheDocument()
    expect(error).toHaveTextContent('')
    expect(error).toHaveClass(styles.errorContainer)
    expect(error).toHaveAttribute('id', errorId(selectId))

    expect(container.querySelector('.hz-autocomplete-field__indicators [data-test="icon-button"]')).toBeInTheDocument()
  })
})

describe('AutocompleteField - highlightOptionText', () => {
  it('Highlights matched chars in options', async () => {
    const optionText = highlightOptionText('Dart Vader', 'va')

    const { container } = await renderAndCheckA11Y(<>{optionText}</>)
    expect(container.querySelector('.hz-autocomplete-field__matched-option-text')).toBeInTheDocument()
    expect(container.querySelector('.hz-autocomplete-field__matched-option-text')).toHaveTextContent('Va')
  })
})

describe('AutocompleteField - getSelectedOptionFromValue', () => {
  const colors = {
    blue: {
      value: 'blue',
      label: 'Blue',
    },
    green: {
      value: 'green',
      label: 'Green',
    },
    red: {
      value: 'red',
      label: 'Red',
    },
  }

  it("transforms value to react-field's value object", () => {
    expect(
      getSelectedOptionFromValue({
        value: 'blue',
        optionsMap: colors,
      }),
    ).toEqual({
      value: 'blue',
      label: 'Blue',
    })
  })

  it("transforms `null` to react-field's value object", () => {
    expect(
      getSelectedOptionFromValue({
        value: null,
        optionsMap: colors,
      }),
    ).toEqual(null)
  })
})
