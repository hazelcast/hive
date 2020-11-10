import React from 'react'
import { v4 as uuid } from 'uuid'
import { act } from 'react-dom/test-utils'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'

import { Select, SelectOption } from '../src/Select'
import { Label } from '../src/Label'
import { Error, errorId } from '../src/Error'

import styles from '../src/TextField.module.scss'

jest.mock('uuid')

const uuidMock = uuid as jest.Mock<ReturnType<typeof uuid>>

const selectId = 'selectId'
const selectName = 'selectName'
const selectValue = 'selectValue0'
const selectLabel = 'selectLabel'

const selectOptions: SelectOption[] = [
  { value: selectValue, text: selectValue, disabled: false },
  { value: 'selectValue1', text: 'selectValue1', disabled: false },
  { value: 'selectValue2', text: 'selectValue2', disabled: false },
]

describe('Select', () => {
  beforeEach(() => {
    uuidMock.mockImplementation(() => selectId)
  })

  it('Renders the default with correct props', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <Select name={selectName} value={selectValue} label={selectLabel} onBlur={onBlur} onChange={onChange} options={selectOptions} />,
    )

    expect(wrapper.find(Label).props()).toEqual({
      id: selectId,
      label: selectLabel,
    })

    expect(wrapper.find('select').props()).toMatchObject({
      id: selectId,
      value: selectValue,
      name: selectName,
      onChange,
      onBlur,
      'aria-invalid': false,
      'aria-required': undefined,
      'aria-errormessage': undefined,
      required: undefined,
      disabled: undefined,
    })
    wrapper.find('select>option').forEach((option, oI) => {
      const { text, ...props } = selectOptions[oI]
      expect(option.props()).toMatchObject(props)
      expect(option.text()).toBe(text)
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
      inputId: selectId,
    })
  })

  it('onChange works', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <Select name={selectName} value={selectValue} label={selectLabel} onBlur={onBlur} onChange={onChange} options={selectOptions} />,
    )

    const testEvent = { target: { value: selectValue } }

    expect(onChange).toBeCalledTimes(0)

    const select = wrapper.find('select')
    act(() => {
      select.simulate('change', testEvent)
    })

    expect(onChange).toBeCalledTimes(1)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(onChange.mock.calls[0][0]).toMatchObject(testEvent)
  })

  it('onBlur works', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <Select name={selectName} value={selectValue} label={selectLabel} onBlur={onBlur} onChange={onChange} options={selectOptions} />,
    )

    expect(onBlur).toBeCalledTimes(0)

    const select = wrapper.find('select')
    act(() => {
      select.simulate('blur')
    })

    expect(onBlur).toBeCalledTimes(1)
  })

  it('Renders error with correct props', async () => {
    const selectError = 'selectError'

    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <Select
        name={selectName}
        value={selectValue}
        label={selectLabel}
        onBlur={onBlur}
        onChange={onChange}
        options={selectOptions}
        error={selectError}
      />,
    )

    expect(wrapper.find(Label).props()).toEqual({
      id: selectId,
      label: selectLabel,
    })

    expect(wrapper.find('select').props()).toMatchObject({
      id: selectId,
      value: selectValue,
      name: selectName,
      onChange,
      onBlur,
      'aria-invalid': true,
      'aria-required': undefined,
      'aria-errormessage': errorId(selectId),
      required: undefined,
      disabled: undefined,
    })
    wrapper.find('select>option').forEach((option, oI) => {
      const { text, ...props } = selectOptions[oI]
      expect(option.props()).toMatchObject(props)
      expect(option.text()).toBe(text)
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: selectError,
      className: styles.errorContainer,
      inputId: selectId,
    })
  })

  it('Renders required with correct props', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <Select
        name={selectName}
        value={selectValue}
        label={selectLabel}
        onBlur={onBlur}
        onChange={onChange}
        options={selectOptions}
        required
      />,
    )

    expect(wrapper.find(Label).props()).toEqual({
      id: selectId,
      label: selectLabel,
    })

    expect(wrapper.find('select').props()).toMatchObject({
      id: selectId,
      value: selectValue,
      name: selectName,
      onChange,
      onBlur,
      'aria-invalid': false,
      'aria-required': true,
      'aria-errormessage': undefined,
      required: true,
      disabled: undefined,
    })
    wrapper.find('select>option').forEach((option, oI) => {
      const { text, ...props } = selectOptions[oI]
      expect(option.props()).toMatchObject(props)
      expect(option.text()).toBe(text)
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
      inputId: selectId,
    })
  })

  it('Renders disabled with correct props', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <Select
        name={selectName}
        value={selectValue}
        label={selectLabel}
        onBlur={onBlur}
        onChange={onChange}
        options={selectOptions}
        disabled
      />,
    )

    expect(wrapper.find(Label).props()).toEqual({
      id: selectId,
      label: selectLabel,
    })

    expect(wrapper.find('select').props()).toMatchObject({
      id: selectId,
      value: selectValue,
      name: selectName,
      onChange,
      onBlur,
      'aria-invalid': false,
      'aria-required': undefined,
      'aria-errormessage': undefined,
      required: undefined,
      disabled: true,
    })
    wrapper.find('select>option').forEach((option, oI) => {
      const { text, ...props } = selectOptions[oI]
      expect(option.props()).toMatchObject(props)
      expect(option.text()).toBe(text)
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
      inputId: selectId,
    })
  })
})
