import React from 'react'
import { useUID } from 'react-uid'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import ReactSelect from 'react-select'
import { X } from 'react-feather'

import { getSelectedOptionFromValue, AutocompleteField, AutocompleteFieldOption, highlightOptionText } from '../src/AutocompleteField'
import { Label } from '../src/Label'
import { Error, errorId } from '../src/Error'
import { IconButton } from '../src/IconButton'

import styles from '../src/AutocompleteField.module.scss'
import { shallow } from 'enzyme'

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

    const wrapper = await mountAndCheckA11Y(
      <AutocompleteField name={selectName} label={selectLabel} options={selectOptions} value="selectValue0" onChange={onChange} />,
    )

    expect(wrapper.find(Label).props()).toEqual({
      id: selectId,
      label: selectLabel,
      className: styles.label,
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
    expect(wrapper.findDataTest('select-field-icons-left').exists()).toBe(false)
    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
      inputId: selectId,
      truncated: true,
    })
  })

  it('Renders correctly without label prop', () => {
    const onChange = jest.fn()

    const wrapper = shallow(<AutocompleteField name={selectName} options={selectOptions} value="selectValue0" onChange={onChange} />)

    expect(wrapper.prop('label')).toBeUndefined()
  })

  it('Renders error with correct props', async () => {
    const selectError = 'selectError'
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <AutocompleteField
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
      className: styles.label,
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
      truncated: true,
    })
  })

  it('Renders required with correct props', async () => {
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <AutocompleteField name={selectName} label={selectLabel} options={selectOptions} value="selectValue0" onChange={onChange} required />,
    )

    expect(wrapper.find(Label).props()).toEqual({
      id: selectId,
      label: selectLabel,
      className: styles.label,
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
      truncated: true,
    })
  })

  it('Renders disabled with correct props', async () => {
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <AutocompleteField name={selectName} label={selectLabel} value="selectValue0" onChange={onChange} options={selectOptions} disabled />,
    )

    expect(wrapper.find(Label).props()).toEqual({
      id: selectId,
      label: selectLabel,
      className: styles.label,
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
      truncated: true,
    })
  })

  it('Renders clearable with correct props', async () => {
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <AutocompleteField
        name={selectName}
        label={selectLabel}
        value="selectValue0"
        onChange={onChange}
        options={selectOptions}
        isClearable
      />,
    )

    expect(wrapper.find(Label).props()).toEqual({
      id: selectId,
      label: selectLabel,
      className: styles.label,
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
      truncated: true,
    })

    expect(wrapper.find(IconButton).prop('icon')).toBe(X)
  })
})

describe('AutocompleteField - highlightOptionText', () => {
  it('Highlights matched chars in options', async () => {
    const optionText = highlightOptionText('Dart Vader', 'va')

    const wrapper = await mountAndCheckA11Y(<>{optionText}</>)
    expect(wrapper.exists('.hz-autocomplete-field__matched-option-text')).toBe(true)
    expect(wrapper.find('.hz-autocomplete-field__matched-option-text').text()).toBe('Va')
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
