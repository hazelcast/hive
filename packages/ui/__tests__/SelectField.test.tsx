import React from 'react'
import { useUID } from 'react-uid'
import { axeDefaultOptions, mountAndCheckA11Y, MountOptions } from '@hazelcast/test-helpers'
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

export const SELECT_FIELD_MOUNT_OPTIONS: MountOptions = {
  axeOptions: {
    ...axeDefaultOptions,
    rules: {
      ...axeDefaultOptions?.rules,
      'autocomplete-valid': { enabled: false },
    },
  },
}

describe('SelectField', () => {
  beforeEach(() => {
    useUIDMock.mockImplementation(() => selectId)
  })

  it('Renders the default with correct props', async () => {
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <SelectField name={selectName} label={selectLabel} options={selectOptions} value={selectValue} onChange={onChange} />,
      SELECT_FIELD_MOUNT_OPTIONS,
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
      SELECT_FIELD_MOUNT_OPTIONS,
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
      SELECT_FIELD_MOUNT_OPTIONS,
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
      SELECT_FIELD_MOUNT_OPTIONS,
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
      SELECT_FIELD_MOUNT_OPTIONS,
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
})
