import React from 'react'
import { useUID } from 'react-uid'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import ReactSelect from 'react-select'
import ReactSelectCreatable from 'react-select/creatable'
import { X } from 'react-feather'

import { getSelectedOptionFromValue, SelectField, SelectFieldOption } from '../src/SelectField'
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
      <SelectField name={selectName} label={selectLabel} options={selectOptions} value="selectValue0" onChange={onChange} />,
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
        value="selectValue0"
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
      <SelectField name={selectName} label={selectLabel} options={selectOptions} value="selectValue0" onChange={onChange} required />,
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
      <SelectField name={selectName} label={selectLabel} value="selectValue0" onChange={onChange} options={selectOptions} disabled />,
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
      <SelectField name={selectName} label={selectLabel} value="selectValue0" onChange={onChange} options={selectOptions} isClearable />,
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

    const value = [selectOptions[0].value, selectOptions[1].value]
    const wrapper = await mountAndCheckA11Y(
      <SelectField name={selectName} label={selectLabel} isMulti={true} options={selectOptions} value={value} onChange={onChange} />,
    )

    expect(wrapper.find('.hz-select-field__multi-value')).toHaveLength(2)

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
      value: [selectOptions[0], selectOptions[1]],
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
      inputId: selectId,
    })
  })

  it('Renders creatable select correct props', async () => {
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <SelectField
        name={selectName}
        label={selectLabel}
        value="selectValue0"
        onChange={onChange}
        options={selectOptions}
        isClearable
        isCreatable
      />,
    )

    expect(wrapper.find(Label).props()).toEqual({
      id: selectId,
      label: selectLabel,
    })

    expect(wrapper.find(ReactSelectCreatable).props()).toMatchObject({
      inputId: selectId,
      name: selectName,
      'aria-invalid': false,
      'aria-required': undefined,
      'aria-errormessage': undefined,
      isDisabled: undefined,
      isClearable: true,
      isMulti: false,
      isSearchable: true,
      options: selectOptions,
      value: selectValue,
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
      inputId: selectId,
    })

    expect(wrapper.find(IconButton).prop('icon')).toBe(X)
  })
})

describe('SelectField - getSelectedOptionFromValue', () => {
  const colors = [
    {
      value: 'blue',
      label: 'Blue',
    },
    {
      value: 'green',
      label: 'Green',
    },
    {
      value: 'red',
      label: 'Red',
    },
  ]

  it("single mode: transforms value to react-field's value object", () => {
    expect(
      getSelectedOptionFromValue({
        value: 'blue',
        options: colors,
        isMulti: false,
      }),
    ).toEqual({
      value: 'blue',
      label: 'Blue',
    })
  })

  it("single mode: transforms `null` to react-field's value object", () => {
    expect(
      getSelectedOptionFromValue({
        value: null,
        options: colors,
        isMulti: false,
      }),
    ).toEqual(null)
  })

  it("single mode/creatable: - value that is not in options is transformed into valid react-field's value object", () => {
    expect(
      getSelectedOptionFromValue({
        value: 'hello world',
        options: colors,
        isMulti: false,
      }),
    ).toEqual({
      value: 'hello world',
      label: 'hello world',
    })
  })

  it("multiple mode: transforms a value to react-field's value object", () => {
    expect(
      getSelectedOptionFromValue({
        value: ['blue'],
        options: colors,
        isMulti: true,
      }),
    ).toEqual([
      {
        value: 'blue',
        label: 'Blue',
      },
    ])
  })

  it("multiple mode: transforms `null` to react-field's value object", () => {
    expect(
      getSelectedOptionFromValue({
        value: null,
        options: colors,
        isMulti: true,
      }),
    ).toEqual([])
  })

  it("multiple mode/creatable: - value that is not in options is transformed into valid react-field's value object", () => {
    expect(
      getSelectedOptionFromValue({
        value: ['black', 'red', 'blue', 'gray'],
        options: colors,
        isMulti: true,
      }),
    ).toEqual([
      {
        value: 'black',
        label: 'black',
      },
      {
        value: 'red',
        label: 'Red',
      },
      {
        value: 'blue',
        label: 'Blue',
      },
      {
        value: 'gray',
        label: 'gray',
      },
    ])
  })
})
