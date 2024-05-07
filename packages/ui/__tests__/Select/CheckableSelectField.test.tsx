import React from 'react'
import { useUID } from 'react-uid'
import { mountAndCheckA11Y, simulateChange } from '@hazelcast/test-helpers'
import { act } from 'react-dom/test-utils'

import { CheckableSelectField } from '../../src/Select/CheckableSelectField'
import { Label } from '../../src/Label'
import { Error } from '../../src/Error'
import { SelectFieldOption } from '../../src/Select/helpers'

import styles from '../src/SelectField.module.scss'
import { mount } from 'enzyme'

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

    const wrapper = await mountAndCheckA11Y(
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

    expect(wrapper.find(Label).props()).toEqual({
      id: selectId,
      label: selectLabel,
      variant: 'primary',
      className: `${styles.label} ${styles.small}`,
    })

    expect(wrapper.find(Error).exists()).toBeTruthy()
  })

  it('Renders with isDisabled=true prop', async () => {
    const wrapper = await mountAndCheckA11Y(
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

    expect(wrapper.find(Label).props()).toEqual({
      id: selectId,
      label: selectLabel,
      variant: 'primary',
      className: `${styles.label} ${styles.small}`,
    })

    expect(wrapper.findDataTest('test-opener').at(0).prop('disabled')).toBeTruthy()

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
      inputId: selectId,
      truncated: true,
      tooltipPlacement: 'top',
    })
  })

  it('Hides Label', () => {
    const wrapper = mount(
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

    expect(wrapper.find(Label).exists()).toBe(false)

    expect(wrapper.findDataTest('test-opener').exists()).toBe(true)

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
      inputId: selectId,
      truncated: true,
      tooltipPlacement: 'top',
    })
  })

  it('Toggles value', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(
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

    wrapper.findDataTest('test-opener').find('input').simulate('click')
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      wrapper.update()
    })

    act(() => {
      wrapper.findDataTestFirst('test-select-all').simulate('click')
    })
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      wrapper.update()
    })

    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith(options.map(({ value }) => value))

    act(() => {
      wrapper.findDataTestFirst('test-select-none').simulate('click')
    })
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      wrapper.update()
    })

    expect(onChange).toBeCalledTimes(2)
    expect(onChange).toBeCalledWith([])
  })

  it('Options are checkable', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(
      <CheckableSelectField name={selectName} label={selectLabel} options={options} value={[]} onChange={onChange} data-test="test" />,
    )

    expect(onChange).toBeCalledTimes(0)

    // We need the `async` call here to wait for processing of the asynchronous 'change'
    // eslint-disable-next-line @typescript-eslint/require-await
    // await act(async () => {
    wrapper.findDataTest('test-opener').find('input').simulate('click')
    // })
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      wrapper.update()
    })

    act(() => {
      wrapper.findDataTest('test-option').at(0).simulate('click')
    })
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      wrapper.update()
    })

    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith([options[0].value])
  })

  it('Can not be opened when disabled', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(
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

    act(() => {
      wrapper.findDataTest('test-opener').at(0).simulate('click')
    })
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      wrapper.update()
    })

    expect(wrapper.findDataTest('test-dropdown').exists()).toBeFalsy()
  })

  it('"None selected" value when nothing is selected', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(
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

    expect(wrapper.findDataTest('test-opener').at(0).prop('value')).toBe('None selected')
  })

  it('"2 selected" value when 2 items are selected', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(
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

    expect(wrapper.findDataTest('test-opener').at(0).prop('value')).toBe('2 selected')
  })

  it('"All selected" value when 2 items are selected', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(
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

    expect(wrapper.findDataTest('test-opener').at(0).prop('value')).toBe('All selected')
  })

  it('"All selected" value when 2 items are selected', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(
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

    expect(wrapper.findDataTest('test-opener').at(0).prop('value')).toBe('All selected')
  })

  it('Without options', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(
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

    expect(wrapper.findDataTest('test-no-options-message').exists()).toBeTruthy()
    expect(wrapper.findDataTest('test-no-options-message').text()).toBe('There are no options')
  })

  it('Custom search', async () => {
    let id = 0
    const onChange = jest.fn()
    const filterOptions = jest.fn()
    useUIDMock.mockImplementation(() => {
      id += 1
      return id.toString()
    })
    const wrapper = await mountAndCheckA11Y(
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

    const searchInput = wrapper.findDataTestFirst('test-search').find('input')

    expect(searchInput).toBeTruthy()
    act(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      simulateChange(searchInput, 'Luke')
    })

    expect(filterOptions).toHaveBeenCalledTimes(0)

    act(() => {
      wrapper.findDataTestFirst('test-toggle-custom-search').find('input').simulate('change')
    })

    act(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      simulateChange(searchInput, 'Luke2')
    })

    expect(filterOptions).toHaveBeenCalled()
  })
})
