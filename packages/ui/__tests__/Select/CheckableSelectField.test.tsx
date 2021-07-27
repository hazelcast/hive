import React from 'react'
import { useUID } from 'react-uid'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import ReactSelect, { OptionsType } from 'react-select'
import ReactSelectCreatable from 'react-select/creatable'
import { act } from 'react-dom/test-utils'

import { CheckableSelectField } from '../../src/Select/CheckableSelectField'
import { Label } from '../../src/Label'
import { Error, errorId } from '../../src/Error'
import { SelectFieldOption } from '../../src/Select/helpers'

import styles from '../src/SelectField.module.scss'

jest.mock('react-uid')

const useUIDMock = useUID as jest.Mock<ReturnType<typeof useUID>>

const selectId = 'selectId'
const selectName = 'selectName'
const selectLabel = 'selectLabel'

const options: OptionsType<SelectFieldOption<string>> = [
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

  it('Renders child components with correct props', async () => {
    const wrapper = await mountAndCheckA11Y(
      <CheckableSelectField name={selectName} label={selectLabel} options={options} value={selectedValues} onChange={jest.fn()} />,
    )

    expect(wrapper.find(Label).props()).toEqual({
      id: selectId,
      label: selectLabel,
      className: styles.label,
    })

    expect(wrapper.find(ReactSelect).props()).toMatchObject({
      inputId: selectId,
      name: selectName,
      isClearable: false,
      isMulti: true,
      options: options,
      value: selectedOptions,
      isSearchable: true,
      'aria-invalid': false,
      'aria-required': undefined,
      'aria-errormessage': undefined,
      isDisabled: undefined,
    })
    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
      inputId: selectId,
    })
  })

  it('Renders Error with error message and ReactSelect with [aria-invalid]=true and `aria-errormessage` with correct id', async () => {
    const selectError = 'Dark side'

    const wrapper = await mountAndCheckA11Y(
      <CheckableSelectField
        name={selectName}
        label={selectLabel}
        options={options}
        value={selectedValues}
        onChange={jest.fn()}
        error={selectError}
      />,
    )

    expect(wrapper.find(Label).props()).toEqual({
      id: selectId,
      label: selectLabel,
      className: styles.label,
    })

    expect(wrapper.find(ReactSelect).props()).toMatchObject({
      'aria-invalid': true,
      'aria-errormessage': errorId(selectId),
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: selectError,
      className: styles.errorContainer,
      inputId: selectId,
    })
  })

  it('Renders ReactSelect with aria-required attribute', async () => {
    const wrapper = await mountAndCheckA11Y(
      <CheckableSelectField name={selectName} label={selectLabel} options={options} value={selectedValues} onChange={jest.fn()} required />,
    )

    expect(wrapper.find(Label).props()).toEqual({
      id: selectId,
      label: selectLabel,
      className: styles.label,
    })

    expect(wrapper.find(ReactSelect).props()).toMatchObject({
      'aria-required': true,
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
      inputId: selectId,
    })
  })

  it('Renders ReactSelect with isDisabled=true prop', async () => {
    const wrapper = await mountAndCheckA11Y(
      <CheckableSelectField name={selectName} label={selectLabel} onChange={jest.fn()} options={options} value={selectedValues} disabled />,
    )

    expect(wrapper.find(Label).props()).toEqual({
      id: selectId,
      label: selectLabel,
      className: styles.label,
    })

    expect(wrapper.find(ReactSelect).props()).toMatchObject({
      isDisabled: true,
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
      inputId: selectId,
    })
  })

  it('Hides Label', async () => {
    const wrapper = await mountAndCheckA11Y(
      <CheckableSelectField
        name={selectName}
        label={selectLabel}
        onChange={jest.fn()}
        options={options}
        value={selectedValues}
        showAriaLabel
      />,
    )

    expect(wrapper.find(Label).exists()).toBe(false)

    expect(wrapper.find(ReactSelect).exists()).toBe(true)

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
      inputId: selectId,
    })
  })

  it('Renders ReactSelectCreatable with correct props', async () => {
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <CheckableSelectField
        name={selectName}
        label={selectLabel}
        value={selectedValues}
        onChange={onChange}
        options={options}
        isCreatable
      />,
    )

    expect(wrapper.find(Label).props()).toEqual({
      id: selectId,
      label: selectLabel,
      className: styles.label,
    })

    expect(wrapper.find(ReactSelectCreatable).props()).toMatchObject({
      isMulti: true,
      isClearable: false,
      isSearchable: true,
      inputId: selectId,
      name: selectName,
      options: options,
      value: selectedOptions,
      'aria-invalid': false,
      'aria-required': undefined,
      'aria-errormessage': undefined,
      isDisabled: undefined,
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
      inputId: selectId,
    })
  })

  it('Toggles value', async () => {
    const onChange = jest.fn()
    const wrapper = await mountAndCheckA11Y(
      <CheckableSelectField
        menuIsOpen
        name={selectName}
        label={selectLabel}
        options={options}
        value={selectedValues}
        onChange={onChange}
      />,
    )

    expect(onChange).toBeCalledTimes(0)

    act(() => {
      wrapper.findDataTest('checkable-select-select-all').simulate('click')
    })
    wrapper.update()

    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith(options.map(({ value }) => value))

    act(() => {
      wrapper.findDataTest('checkable-select-select-none').simulate('click')
    })
    wrapper.update()

    expect(onChange).toBeCalledTimes(2)
    expect(onChange).toBeCalledWith([])
  })
})
