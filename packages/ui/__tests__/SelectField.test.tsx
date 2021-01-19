import React from 'react'
import { useUID } from 'react-uid'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import ReactSelect from 'react-select'
import { X } from 'react-feather'

import { SelectField, SelectFieldOption } from '../src/SelectField'
import { Label } from '../src/Label'
import { Error, errorId } from '../src/Error'
import { IconButton } from '../src/IconButton'

import styles from '../src/SelectField.module.scss'

jest.mock('react-uid')

const useUIDMock = useUID as jest.Mock<ReturnType<typeof useUID>>

const selectId = 'selectId'
const selectName = 'selectName'
const selectValue: SelectFieldOption<string> = { value: 'selectValue0', label: 'selectValue0' }
const selectLabel = 'selectLabel'

const selectOptions: SelectFieldOption<string>[] = [
  selectValue,
  { value: 'selectValue1', label: 'selectValue1' },
  { value: 'selectValue2', label: 'selectValue2' },
]

describe('SelectField', () => {
  beforeEach(() => {
    useUIDMock.mockImplementation(() => selectId)
  })

  it('Renders the default with correct props', async () => {
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <SelectField name={selectName} label={selectLabel} options={selectOptions} value={selectValue} onChange={onChange} />,
    )

    expect(wrapper.find(Label).props()).toEqual({
      id: selectId,
      label: selectLabel,
    })

    expect(wrapper.find(ReactSelect).props()).toMatchObject({
      inputId: selectId,
      name: selectName,
      'aria-invalid': false,
      'aria-required': undefined,
      'aria-errormessage': undefined,
      isClearable: false,
      isDisabled: undefined,
      isMulti: false,
      isSearchable: true,
      options: selectOptions,
      value: selectValue,
      onChange,
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
      inputId: selectId,
    })
  })

  it('Renders error with correct props', async () => {
    const selectError = 'selectError'
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <SelectField
        name={selectName}
        label={selectLabel}
        options={selectOptions}
        value={selectValue}
        onChange={onChange}
        error={selectError}
      />,
    )

    expect(wrapper.find(Label).props()).toEqual({
      id: selectId,
      label: selectLabel,
    })

    expect(wrapper.find(ReactSelect).props()).toMatchObject({
      inputId: selectId,
      name: selectName,
      'aria-invalid': true,
      'aria-required': undefined,
      'aria-errormessage': errorId(selectId),
      isClearable: false,
      isDisabled: undefined,
      isMulti: false,
      isSearchable: true,
      options: selectOptions,
      value: selectValue,
      onChange,
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: selectError,
      className: styles.errorContainer,
      inputId: selectId,
    })
  })

  it('Renders required with correct props', async () => {
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <SelectField name={selectName} label={selectLabel} options={selectOptions} value={selectValue} onChange={onChange} required />,
    )

    expect(wrapper.find(Label).props()).toEqual({
      id: selectId,
      label: selectLabel,
    })

    expect(wrapper.find(ReactSelect).props()).toMatchObject({
      inputId: selectId,
      name: selectName,
      'aria-invalid': false,
      'aria-required': true,
      'aria-errormessage': undefined,
      isClearable: false,
      isDisabled: undefined,
      isMulti: false,
      isSearchable: true,
      options: selectOptions,
      value: selectValue,
      onChange,
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
      inputId: selectId,
    })
  })

  it('Renders disabled with correct props', async () => {
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <SelectField name={selectName} label={selectLabel} value={selectValue} onChange={onChange} options={selectOptions} disabled />,
    )

    expect(wrapper.find(Label).props()).toEqual({
      id: selectId,
      label: selectLabel,
    })

    expect(wrapper.find(ReactSelect).props()).toMatchObject({
      inputId: selectId,
      name: selectName,
      'aria-invalid': false,
      'aria-required': undefined,
      'aria-errormessage': undefined,
      isClearable: false,
      isDisabled: true,
      isMulti: false,
      isSearchable: true,
      options: selectOptions,
      value: selectValue,
      onChange,
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
      inputId: selectId,
    })
  })

  it('Renders clearable with correct props', async () => {
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <SelectField name={selectName} label={selectLabel} value={selectValue} onChange={onChange} options={selectOptions} isClearable />,
    )

    expect(wrapper.find(Label).props()).toEqual({
      id: selectId,
      label: selectLabel,
    })

    expect(wrapper.find(ReactSelect).props()).toMatchObject({
      inputId: selectId,
      name: selectName,
      'aria-invalid': false,
      'aria-required': undefined,
      'aria-errormessage': undefined,
      isClearable: true,
      isDisabled: undefined,
      isMulti: false,
      isSearchable: true,
      options: selectOptions,
      value: selectValue,
      onChange,
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
      inputId: selectId,
    })

    expect(wrapper.find(IconButton).prop('icon')).toBe(X)
  })

  it('Renders multiple selections with correct props', async () => {
    const onChange = jest.fn()

    const value = [selectOptions[0], selectOptions[1]]
    const wrapper = await mountAndCheckA11Y(
      <SelectField name={selectName} label={selectLabel} isMulti={true} options={selectOptions} value={value} onChange={onChange} />,
      {
        // xxx axeOptions: SELECT_FIELD_AXE_OPTIONS,
      },
    )

    expect(wrapper.find('.hz-select-field__multi-value')).toHaveLength(2);

    expect(wrapper.find(Label).props()).toEqual({
      id: selectId,
      label: selectLabel,
    })

    expect(wrapper.find(ReactSelect).props()).toMatchObject({
      inputId: selectId,
      name: selectName,
      'aria-invalid': false,
      'aria-required': undefined,
      'aria-errormessage': undefined,
      isClearable: false,
      isDisabled: undefined,
      isMulti: true,
      isSearchable: true,
      options: selectOptions,
      value,
      onChange,
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
      inputId: selectId,
    })
  })

})
