import React from 'react'
import { useUID } from 'react-uid'
import { renderAndCheckA11Y } from '@hazelcast/test-helpers'
import { Options } from 'react-select'
import { screen, within } from '@testing-library/react'
import { Aperture } from 'react-feather'

import { SelectField } from '../../src/Select/SelectField'
import { errorId } from '../../src/Error'
import { SelectFieldOption } from '../../src/Select/helpers'

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
const selectedOption = options[1]
const selectedValue = selectedOption.value

describe('SelectField', () => {
  beforeEach(() => {
    useUIDMock.mockImplementation(() => selectId)
  })

  it('Renders child components with correct props', async () => {
    await renderAndCheckA11Y(
      <SelectField name={selectName} label={selectLabel} options={options} value={selectedValue} onChange={jest.fn()} />,
    )

    const label = screen.queryByTestId('select-field-label')!

    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('for', selectId)
    expect(label).toHaveTextContent(selectLabel)
    expect(label).toHaveClass(styles.label)

    const select = screen.queryByTestId('select-field')!

    expect(select).toBeInTheDocument()

    const input = select.querySelector('.hz-select-field__input')

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('id', selectId)
    expect(input).not.toHaveAttribute('disabled')
    expect(input).toHaveAttribute('aria-invalid', 'false')
    expect(input).not.toHaveAttribute('aria-required')
    expect(input).not.toHaveAttribute('aria-errormessage')

    const valueContainer = select.querySelector('.hz-select-field__value-container') as HTMLElement

    expect(valueContainer).toBeInTheDocument()
    expect(within(valueContainer).queryByText(selectedOption.label)).toBeInTheDocument()

    const error = screen.queryByTestId('select-field-error')!

    expect(error).toBeInTheDocument()
    expect(error).toHaveTextContent('')
    expect(error).toHaveAttribute('id', errorId(selectId))
  })

  it('Renders Error with error message and ReactSelect with [aria-invalid]=true and `aria-errormessage` with correct id', async () => {
    const selectError = 'Dark side'

    await renderAndCheckA11Y(
      <SelectField
        name={selectName}
        label={selectLabel}
        options={options}
        value={selectedValue}
        onChange={jest.fn()}
        error={selectError}
      />,
    )

    const label = screen.queryByTestId('select-field-label')!

    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('for', selectId)
    expect(label).toHaveTextContent(selectLabel)
    expect(label).toHaveClass(styles.label)

    const select = screen.queryByTestId('select-field')!

    expect(select).toBeInTheDocument()

    const input = select.querySelector('.hz-select-field__input')

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('id', selectId)
    expect(input).not.toHaveAttribute('disabled')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).not.toHaveAttribute('aria-required')
    expect(input).toHaveAttribute('aria-errormessage', errorId(selectId))

    const valueContainer = select.querySelector('.hz-select-field__value-container') as HTMLElement

    expect(valueContainer).toBeInTheDocument()
    expect(within(valueContainer).queryByText(selectedOption.label)).toBeInTheDocument()

    const error = screen.queryByTestId('select-field-error')!

    expect(error).toBeInTheDocument()
    expect(error).toHaveTextContent(selectError)
    expect(error).toHaveAttribute('id', errorId(selectId))
  })

  it('Renders ReactSelect with aria-required attribute', async () => {
    await renderAndCheckA11Y(
      <SelectField name={selectName} label={selectLabel} options={options} value={selectedValue} onChange={jest.fn()} required />,
    )

    const label = screen.queryByTestId('select-field-label')!

    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('for', selectId)
    expect(label).toHaveTextContent(selectLabel)
    expect(label).toHaveClass(styles.label)

    const select = screen.queryByTestId('select-field')!

    expect(select).toBeInTheDocument()

    const input = select.querySelector('.hz-select-field__input')

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('id', selectId)
    expect(input).not.toHaveAttribute('disabled')
    expect(input).toHaveAttribute('aria-invalid', 'false')
    expect(input).not.toHaveAttribute('aria-required')
    expect(input).not.toHaveAttribute('aria-errormessage')

    const valueContainer = select.querySelector('.hz-select-field__value-container') as HTMLElement

    expect(valueContainer).toBeInTheDocument()
    expect(within(valueContainer).queryByText(selectedOption.label)).toBeInTheDocument()

    const error = screen.queryByTestId('select-field-error')!

    expect(error).toBeInTheDocument()
    expect(error).toHaveTextContent('')
    expect(error).toHaveAttribute('id', errorId(selectId))
  })

  it('Renders ReactSelect with isDisabled=true prop', async () => {
    await renderAndCheckA11Y(
      <SelectField name={selectName} label={selectLabel} onChange={jest.fn()} options={options} value={selectedValue} disabled />,
    )

    const label = screen.queryByTestId('select-field-label')!

    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('for', selectId)
    expect(label).toHaveTextContent(selectLabel)
    expect(label).toHaveClass(styles.label)

    const select = screen.queryByTestId('select-field')!

    expect(select).toBeInTheDocument()

    const input = select.querySelector('.hz-select-field__input')

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('id', selectId)
    expect(input).toHaveAttribute('disabled')
    expect(input).toHaveAttribute('aria-invalid', 'false')
    expect(input).not.toHaveAttribute('aria-required')
    expect(input).not.toHaveAttribute('aria-errormessage')

    const valueContainer = select.querySelector('.hz-select-field__value-container') as HTMLElement

    expect(valueContainer).toBeInTheDocument()
    expect(within(valueContainer).queryByText(selectedOption.label)).toBeInTheDocument()

    const error = screen.queryByTestId('select-field-error')!

    expect(error).toBeInTheDocument()
    expect(error).toHaveTextContent('')
    expect(error).toHaveAttribute('id', errorId(selectId))
  })

  it('Renders ReactSelect with isClearable=true prop', async () => {
    const onChange = jest.fn()

    const { container } = await renderAndCheckA11Y(
      <SelectField name={selectName} label={selectLabel} value={selectedValue} onChange={onChange} options={options} isClearable />,
    )

    const label = screen.queryByTestId('select-field-label')!

    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('for', selectId)
    expect(label).toHaveTextContent(selectLabel)
    expect(label).toHaveClass(styles.label)

    const select = screen.queryByTestId('select-field')!

    expect(select).toBeInTheDocument()

    const input = select.querySelector('.hz-select-field__input')

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('id', selectId)
    expect(input).not.toHaveAttribute('disabled')
    expect(input).toHaveAttribute('aria-invalid', 'false')
    expect(input).not.toHaveAttribute('aria-required')
    expect(input).not.toHaveAttribute('aria-errormessage')

    const valueContainer = select.querySelector('.hz-select-field__value-container') as HTMLElement

    expect(valueContainer).toBeInTheDocument()
    expect(within(valueContainer).queryByText(selectedOption.label)).toBeInTheDocument()

    const error = screen.queryByTestId('select-field-error')!

    expect(error).toBeInTheDocument()
    expect(error).toHaveTextContent('')
    expect(error).toHaveAttribute('id', errorId(selectId))

    expect(container.querySelector('.hz-select-field__indicators [data-test="icon-button"]')).toBeInTheDocument()
  })

  it('Renders left icon', async () => {
    const iconLeft = Aperture
    const iconLeftAriaLabel = 'Aperture'

    await renderAndCheckA11Y(
      <SelectField
        name={selectName}
        label={selectLabel}
        onChange={jest.fn()}
        options={options}
        value={selectedValue}
        iconLeft={iconLeft}
        iconLeftAriaLabel={iconLeftAriaLabel}
      />,
    )

    const label = screen.queryByTestId('select-field-label')!

    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('for', selectId)
    expect(label).toHaveTextContent(selectLabel)
    expect(label).toHaveClass(styles.label)

    expect(screen.queryByTestId('select-field')).toBeInTheDocument()

    const leftIcon = screen.queryByTestId('select-field-icon-left')!

    expect(leftIcon).toBeInTheDocument()
    expect(leftIcon).toHaveClass(styles.iconLeftContainer)

    const icon = leftIcon.querySelector('svg')

    expect(icon).toBeInTheDocument()
    expect(icon).toHaveAttribute('aria-label', iconLeftAriaLabel)
    expect(icon).toHaveClass(styles.iconLeft)

    const error = screen.queryByTestId('select-field-error')!

    expect(error).toBeInTheDocument()
    expect(error).toHaveTextContent('')
    expect(error).toHaveClass(styles.errorContainer)
    expect(error).toHaveAttribute('id', errorId(selectId))
  })

  it('Hides Label', async () => {
    await renderAndCheckA11Y(
      <SelectField name={selectName} label={selectLabel} onChange={jest.fn()} options={options} value={selectedValue} showAriaLabel />,
    )

    expect(screen.queryByTestId('select-field-label')).not.toBeInTheDocument()

    expect(screen.queryByTestId('select-field')).toBeInTheDocument()

    const error = screen.queryByTestId('select-field-error')!

    expect(error).toBeInTheDocument()
    expect(error).toHaveTextContent('')
    expect(error).toHaveClass(styles.errorContainer)
    expect(error).toHaveAttribute('id', errorId(selectId))
  })

  it('Renders ReactSelectCreatable with correct props', async () => {
    const onChange = jest.fn()

    await renderAndCheckA11Y(
      <SelectField name={selectName} label={selectLabel} value={selectedValue} onChange={onChange} options={options} isCreatable />,
    )

    const label = screen.queryByTestId('select-field-label')!

    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('for', selectId)
    expect(label).toHaveTextContent(selectLabel)
    expect(label).toHaveClass(styles.label)

    const select = screen.queryByTestId('select-field')!

    expect(select).toBeInTheDocument()

    const input = select.querySelector('.hz-select-field__input')

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('id', selectId)
    expect(input).not.toHaveAttribute('disabled')
    expect(input).toHaveAttribute('aria-invalid', 'false')
    expect(input).not.toHaveAttribute('aria-required')
    expect(input).not.toHaveAttribute('aria-errormessage')

    const valueContainer = select.querySelector('.hz-select-field__value-container') as HTMLElement

    expect(valueContainer).toBeInTheDocument()
    expect(within(valueContainer).queryByText(selectedOption.label)).toBeInTheDocument()

    const error = screen.queryByTestId('select-field-error')!

    expect(error).toBeInTheDocument()
    expect(error).toHaveTextContent('')
    expect(error).toHaveAttribute('id', errorId(selectId))
  })
})
