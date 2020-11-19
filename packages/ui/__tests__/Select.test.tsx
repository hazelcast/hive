import React from 'react'
import { v4 as uuid } from 'uuid'
// import { act } from 'react-dom/test-utils'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import ReactSelect from 'react-select'

import { Select } from '../src/Select'
import { Label } from '../src/Label'
import { Error, errorId } from '../src/Error'

import styles from '../src/TextField.module.scss'

jest.mock('uuid')

const uuidMock = uuid as jest.Mock<ReturnType<typeof uuid>>

const selectId = 'selectId'
const selectName = 'selectName'
const selectValue = { value: 'selectValue0', label: 'selectValue0' }
const selectLabel = 'selectLabel'

const selectOptions = [selectValue, { value: 'selectValue1', label: 'selectValue1' }, { value: 'selectValue2', label: 'selectValue2' }]

describe('Select', () => {
  beforeEach(() => {
    uuidMock.mockImplementation(() => selectId)
  })

  it('Renders the default with correct props', async () => {
    const wrapper = await mountAndCheckA11Y(<Select name={selectName} label={selectLabel} options={selectOptions} />)

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
      isSearchable: false,
      options: selectOptions,
      value: undefined,
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
      inputId: selectId,
    })
  })

  it('Renders error with correct props', async () => {
    const selectError = 'selectError'

    const wrapper = await mountAndCheckA11Y(<Select name={selectName} label={selectLabel} options={selectOptions} error={selectError} />)

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
      isSearchable: false,
      options: selectOptions,
      value: undefined,
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: selectError,
      className: styles.errorContainer,
      inputId: selectId,
    })
  })

  it('Renders required with correct props', async () => {
    const wrapper = await mountAndCheckA11Y(<Select name={selectName} label={selectLabel} options={selectOptions} required />)

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
      isSearchable: false,
      options: selectOptions,
      value: undefined,
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
      inputId: selectId,
    })
  })

  it('Renders isDisabled with correct props', async () => {
    const wrapper = await mountAndCheckA11Y(<Select name={selectName} label={selectLabel} options={selectOptions} isDisabled />)

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
      isSearchable: false,
      options: selectOptions,
      value: undefined,
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
      inputId: selectId,
    })
  })
})
