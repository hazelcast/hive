import React from 'react'
import { useUID } from 'react-uid'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import ReactSelect, { Options } from 'react-select'
import ReactSelectCreatable from 'react-select/creatable'

import { SelectField } from '../../src/Select/SelectField'
import { Label } from '../../src/Label'
import { Error, errorId } from '../../src/Error'
import { SelectFieldOption } from '../../src/Select/helpers'
import { IconButton } from '../../src/IconButton'

import styles from '../src/SelectField.module.scss'
import { Aperture, X } from 'react-feather'

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
    const wrapper = await mountAndCheckA11Y(
      <SelectField name={selectName} label={selectLabel} options={options} value={selectedValue} onChange={jest.fn()} />,
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
      options: options,
      value: selectedOption,
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
      truncated: true,
    })
  })

  it('Renders Error with error message and ReactSelect with [aria-invalid]=true and `aria-errormessage` with correct id', async () => {
    const selectError = 'Dark side'

    const wrapper = await mountAndCheckA11Y(
      <SelectField
        name={selectName}
        label={selectLabel}
        options={options}
        value={selectedValue}
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
      truncated: true,
    })
  })

  it('Renders ReactSelect with aria-required attribute', async () => {
    const wrapper = await mountAndCheckA11Y(
      <SelectField name={selectName} label={selectLabel} options={options} value={selectedValue} onChange={jest.fn()} required />,
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
      truncated: true,
    })
  })

  it('Renders ReactSelect with isDisabled=true prop', async () => {
    const wrapper = await mountAndCheckA11Y(
      <SelectField name={selectName} label={selectLabel} onChange={jest.fn()} options={options} value={selectedValue} disabled />,
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
      truncated: true,
    })
  })

  it('Renders ReactSelect with isClearable=true prop', async () => {
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <SelectField name={selectName} label={selectLabel} value={selectedValue} onChange={onChange} options={options} isClearable />,
    )

    expect(wrapper.find(Label).props()).toEqual({
      id: selectId,
      label: selectLabel,
      className: styles.label,
    })

    expect(wrapper.find(ReactSelect).props()).toMatchObject({
      isClearable: true,
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
      inputId: selectId,
      truncated: true,
    })

    expect(wrapper.find(IconButton).prop('icon')).toBe(X)
  })

  it('Renders left icon', async () => {
    const iconLeft = Aperture
    const iconLeftAriaLabel = 'Aperture'

    const wrapper = await mountAndCheckA11Y(
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

    expect(wrapper.find(Label).props()).toEqual({
      id: selectId,
      label: selectLabel,
      className: styles.label,
    })

    expect(wrapper.find(ReactSelect).exists()).toBe(true)

    expect(wrapper.findDataTest('select-field-icon-left').props()).toEqual({
      'data-test': 'select-field-icon-left',
      containerClassName: styles.iconLeftContainer,
      icon: iconLeft,
      size: 'medium',
      ariaLabel: iconLeftAriaLabel,
      className: styles.iconLeft,
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
      inputId: selectId,
      truncated: true,
    })
  })

  it('Hides Label', async () => {
    const wrapper = await mountAndCheckA11Y(
      <SelectField name={selectName} label={selectLabel} onChange={jest.fn()} options={options} value={selectedValue} showAriaLabel />,
    )

    expect(wrapper.find(Label).exists()).toBe(false)

    expect(wrapper.find(ReactSelect).exists()).toBe(true)

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
      inputId: selectId,
      truncated: true,
    })
  })

  it('Renders ReactSelectCreatable with correct props', async () => {
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <SelectField name={selectName} label={selectLabel} value={selectedValue} onChange={onChange} options={options} isCreatable />,
    )

    expect(wrapper.find(Label).props()).toEqual({
      id: selectId,
      label: selectLabel,
      className: styles.label,
    })

    expect(wrapper.find(ReactSelectCreatable).props()).toMatchObject({
      isClearable: false,
      isSearchable: true,
      inputId: selectId,
      name: selectName,
      options: options,
      value: selectedOption,
      'aria-invalid': false,
      'aria-required': undefined,
      'aria-errormessage': undefined,
      isDisabled: undefined,
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
      inputId: selectId,
      truncated: true,
    })
  })
})
