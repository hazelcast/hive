import React from 'react'
import { useUID } from 'react-uid'
import { renderAndCheckA11Y } from '../../../src'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { CheckableSelectField } from '../../../src/components/Select/CheckableSelectField'
import { SelectFieldOption } from '../../../src/components/Select/helpers'

import styles from '../../../src/components/Select/SelectField.module.scss'

jest.mock('react-uid')

const useUIDMock = useUID as jest.Mock<ReturnType<typeof useUID>>

const selectId = 'selectId'
const selectName = 'selectName'
const selectLabel = 'selectLabel'

const options: SelectFieldOption<string>[] = [
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

describe('CheckableSelectField', () => {
  beforeEach(() => {
    useUIDMock.mockImplementation(() => selectId)
  })

  it('Renders Error with error message', async () => {
    const selectError = 'Dark side'

    await renderAndCheckA11Y(
      <CheckableSelectField
        name={selectName}
        label={selectLabel}
        options={options}
        value={selectedValues}
        onChange={jest.fn()}
        error={selectError}
        data-test="test"
      />,
    )

    const label = screen.queryByText(selectLabel)
    expect(label).toHaveAttribute('for', selectId)
    expect(label).toHaveClass(`${styles.label} ${styles.small}`)

    const error = screen.getByRole('alert')
    expect(within(error).queryByText(selectError)).toBeInTheDocument()
  })

  it('Renders with isDisabled=true prop', async () => {
    await renderAndCheckA11Y(
      <CheckableSelectField
        name={selectName}
        label={selectLabel}
        onChange={jest.fn()}
        data-test="test"
        options={options}
        value={selectedValues}
        disabled
      />,
    )

    const label = screen.queryByText(selectLabel)
    expect(label).toHaveAttribute('for', selectId)
    expect(label).toHaveClass(`${styles.label} ${styles.small}`)

    expect(within(screen.getByTestId('test-opener')).queryByRole('textbox')).toHaveAttribute('disabled')
    expect(screen.getByTestId('test-opener-error')).toHaveTextContent('')
  })

  it('Hides Label', () => {
    render(
      <CheckableSelectField
        name={selectName}
        label={selectLabel}
        onChange={jest.fn()}
        options={options}
        value={selectedValues}
        data-test="test"
        showAriaLabel
      />,
    )

    expect(screen.queryByRole('label')).not.toBeInTheDocument()
    expect(screen.getByTestId('test-opener-error')).toHaveTextContent('')
  })

  it('Toggles value', async () => {
    const onChange = jest.fn()
    await renderAndCheckA11Y(
      <CheckableSelectField
        name={selectName}
        label={selectLabel}
        options={options}
        value={selectedValues}
        onChange={onChange}
        data-test="test"
      />,
    )

    expect(onChange).toBeCalledTimes(0)

    await userEvent.click(within(screen.getByTestId('test-opener')).getByRole('textbox'))
    await userEvent.click(screen.getByTestId('test-select-all'))

    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith(options.map(({ value }) => value))

    await userEvent.click(screen.getByTestId('test-select-none'))

    expect(onChange).toBeCalledTimes(2)
    expect(onChange).toBeCalledWith([])
  })

  it('Options are checkable', async () => {
    const onChange = jest.fn()
    await renderAndCheckA11Y(
      <CheckableSelectField name={selectName} label={selectLabel} options={options} value={[]} onChange={onChange} data-test="test" />,
    )

    expect(onChange).toBeCalledTimes(0)

    await userEvent.click(within(screen.getByTestId('test-opener')).getByRole('textbox'))
    await userEvent.click(screen.queryAllByTestId('test-option')[0])

    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith([options[0].value])
  })

  it('Can not be opened when disabled', async () => {
    const onChange = jest.fn()
    await renderAndCheckA11Y(
      <CheckableSelectField
        disabled
        name={selectName}
        label={selectLabel}
        options={options}
        value={[]}
        onChange={onChange}
        data-test="test"
      />,
    )

    expect(onChange).toBeCalledTimes(0)

    await userEvent.click(within(screen.getByTestId('test-opener')).getByRole('textbox'))

    expect(screen.queryByTestId('test-dropdown')).not.toBeInTheDocument()
  })

  it('"None selected" value when nothing is selected', async () => {
    const onChange = jest.fn()
    await renderAndCheckA11Y(
      <CheckableSelectField
        disabled
        name={selectName}
        label={selectLabel}
        options={options}
        value={[]}
        onChange={onChange}
        data-test="test"
      />,
    )

    expect(within(screen.getByTestId('test-opener')).getByRole('textbox')).toHaveAttribute('value', 'None selected')
  })

  it('"2 selected" value when 2 items are selected', async () => {
    const onChange = jest.fn()
    await renderAndCheckA11Y(
      <CheckableSelectField
        disabled
        name={selectName}
        label={selectLabel}
        options={options}
        value={options.slice(0, 2).map(({ value }) => value)}
        onChange={onChange}
        data-test="test"
      />,
    )

    expect(within(screen.getByTestId('test-opener')).getByRole('textbox')).toHaveAttribute('value', '2 selected')
  })

  it('"All selected" value when 2 items are selected', async () => {
    const onChange = jest.fn()
    await renderAndCheckA11Y(
      <CheckableSelectField
        disabled
        name={selectName}
        label={selectLabel}
        options={options}
        value={options.map(({ value }) => value)}
        onChange={onChange}
        data-test="test"
      />,
    )

    expect(within(screen.getByTestId('test-opener')).getByRole('textbox')).toHaveAttribute('value', 'All selected')
  })

  it('"All selected" value when 2 items are selected', async () => {
    const onChange = jest.fn()
    await renderAndCheckA11Y(
      <CheckableSelectField
        disabled
        name={selectName}
        label={selectLabel}
        options={options}
        value={options.map(({ value }) => value)}
        onChange={onChange}
        data-test="test"
      />,
    )

    expect(within(screen.getByTestId('test-opener')).getByRole('textbox')).toHaveAttribute('value', 'All selected')
  })

  it('Without options', async () => {
    const onChange = jest.fn()
    await renderAndCheckA11Y(
      <CheckableSelectField
        defaultOpen
        name={selectName}
        label={selectLabel}
        options={[]}
        value={[]}
        id={'21313123'}
        onChange={onChange}
        data-test="test"
        noOptionsMessage="There are no options"
      />,
    )

    expect(screen.queryByText('There are no options')).toBeInTheDocument()
  })

  it('Custom search', async () => {
    let id = 0
    const onChange = jest.fn()
    const filterOptions = jest.fn()
    useUIDMock.mockImplementation(() => {
      id += 1
      return id.toString()
    })
    await renderAndCheckA11Y(
      <CheckableSelectField
        defaultOpen
        name={selectName}
        label={selectLabel}
        options={options}
        value={[]}
        id={'21313123'}
        onChange={onChange}
        data-test="test"
        filterOptions={filterOptions}
        noOptionsMessage="There are no options"
      />,
    )

    expect(filterOptions).toHaveBeenCalled()
  })

  it('Renders Adornments', async () => {
    let id = 0
    const onChange = jest.fn()
    useUIDMock.mockImplementation(() => {
      id += 1
      return id.toString()
    })
    await renderAndCheckA11Y(
      <CheckableSelectField
        defaultOpen
        name={selectName}
        label={selectLabel}
        options={options}
        value={[]}
        id={'21313123'}
        onChange={onChange}
        data-test="test"
        searchInputProps={{
          endAdornment: <div data-test="endAdornment" />,
          startAdornment: <div data-test="startAdornment" />,
        }}
        noOptionsMessage="There are no options"
      />,
    )

    expect(screen.queryByTestId('test-dropdown')).toBeInTheDocument()
    expect(screen.queryByTestId('endAdornment')).toBeInTheDocument()
    expect(screen.queryByTestId('startAdornment')).toBeInTheDocument()
  })
})
