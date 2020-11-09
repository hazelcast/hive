import React from 'react'
import { v4 as uuid } from 'uuid'
import { act } from 'react-dom/test-utils'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'

import { TextArea } from '../src/TextArea'
import { HiddenLabel } from '../src/HiddenLabel'
import { Error, errorId } from '../src/Error'

import styles from '../src/TextArea.module.scss'

jest.mock('uuid')

const uuidMock = uuid as jest.Mock<ReturnType<typeof uuid>>

const inputId = 'inputId'
const inputName = 'inputName'
const inputValue = 'inputValue'
const inputPlaceholder = 'inputPlaceholder'
const inputLabel = 'inputLabel'

describe('TextArea', () => {
  beforeEach(() => {
    uuidMock.mockImplementation(() => inputId)
  })

  it('Renders the default with correct props', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <TextArea
        name={inputName}
        value={inputValue}
        placeholder={inputPlaceholder}
        label={inputLabel}
        onBlur={onBlur}
        onChange={onChange}
      />,
    )

    expect(wrapper.find(HiddenLabel).props()).toEqual({
      id: inputId,
      label: inputLabel,
    })

    expect(wrapper.find('textarea').props()).toEqual({
      id: inputId,
      value: inputValue,
      name: inputName,
      onChange,
      onBlur,
      'aria-invalid': false,
      'aria-required': undefined,
      'aria-describedby': undefined,
      'aria-errormessage': undefined,
      disabled: undefined,
      placeholder: inputPlaceholder,
      required: undefined,
      className: '',
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
      inputId: inputId,
    })
  })

  it('onChange works', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <TextArea
        name={inputName}
        value={inputValue}
        placeholder={inputPlaceholder}
        label={inputLabel}
        onBlur={onBlur}
        onChange={onChange}
      />,
    )

    expect(onChange).toBeCalledTimes(0)

    act(() => {
      wrapper.find('textarea').simulate('change', { target: { value: 'value' } })
    })

    expect(onChange).toBeCalledTimes(1)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(onChange.mock.calls[0][0]).toMatchObject({ target: { value: 'value' } })
  })

  it('onBlur works', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <TextArea
        name={inputName}
        value={inputValue}
        placeholder={inputPlaceholder}
        label={inputLabel}
        onBlur={onBlur}
        onChange={onChange}
      />,
    )

    expect(onBlur).toBeCalledTimes(0)

    act(() => {
      wrapper.find('textarea').simulate('blur')
    })

    expect(onBlur).toBeCalledTimes(1)
  })

  it('Renders error with correct props', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()
    const error = 'error'

    const wrapper = await mountAndCheckA11Y(
      <TextArea
        error={error}
        name={inputName}
        value={inputValue}
        placeholder={inputPlaceholder}
        label={inputLabel}
        onBlur={onBlur}
        onChange={onChange}
      />,
    )

    expect(wrapper.find(HiddenLabel).props()).toEqual({
      id: inputId,
      label: inputLabel,
    })

    expect(wrapper.find('textarea').props()).toEqual({
      id: inputId,
      value: inputValue,
      name: inputName,
      onChange,
      onBlur,
      'aria-invalid': true,
      'aria-required': undefined,
      'aria-describedby': undefined,
      'aria-errormessage': errorId(inputId),
      disabled: undefined,
      placeholder: inputPlaceholder,
      required: undefined,
      className: '',
    })

    expect(wrapper.find(Error).props()).toEqual({
      error,
      className: styles.errorContainer,
      inputId: inputId,
    })
  })

  it('Renders required with correct props', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <TextArea
        name={inputName}
        value={inputValue}
        placeholder={inputPlaceholder}
        label={inputLabel}
        onBlur={onBlur}
        onChange={onChange}
        required
      />,
    )

    expect(wrapper.find(HiddenLabel).props()).toEqual({
      id: inputId,
      label: inputLabel,
    })

    expect(wrapper.find('textarea').props()).toEqual({
      id: inputId,
      className: '',
      value: inputValue,
      name: inputName,
      required: true,
      onChange,
      onBlur,
      'aria-invalid': false,
      'aria-required': true,
      'aria-describedby': undefined,
      'aria-errormessage': undefined,
      disabled: undefined,
      placeholder: inputPlaceholder,
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
      inputId: inputId,
    })
  })

  it('Renders disabled with correct props', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <TextArea
        name={inputName}
        value={inputValue}
        placeholder={inputPlaceholder}
        label={inputLabel}
        onBlur={onBlur}
        onChange={onChange}
        disabled
      />,
    )

    expect(wrapper.find(HiddenLabel).props()).toEqual({
      id: inputId,
      label: inputLabel,
    })

    expect(wrapper.find('textarea').props()).toEqual({
      id: inputId,
      className: '',
      value: inputValue,
      name: inputName,
      required: undefined,
      onChange,
      onBlur,
      'aria-invalid': false,
      'aria-required': undefined,
      'aria-describedby': undefined,
      'aria-errormessage': undefined,
      disabled: true,
      placeholder: inputPlaceholder,
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
      inputId: inputId,
    })
  })
})
