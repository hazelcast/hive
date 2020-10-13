import React from 'react'
import { v4 as uuid } from 'uuid'
import { act } from 'react-dom/test-utils'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'

import { TextField } from '../src/TextField'
import { HiddenLabel } from '../src/HiddenLabel'
import { Error } from '../src/Error'
import { Help, tooltipId } from '../src/Help'

import styles from '../src/TextField.module.scss'

jest.mock('uuid')

const uuidMock = uuid as jest.Mock<ReturnType<typeof uuid>>

describe('TextField', () => {
  beforeEach(() => {
    uuidMock.mockImplementation(() => 'republic')
  })

  it('Renders the default with correct props', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <TextField name="name" value="Yoda" placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} />,
    )

    expect(wrapper.find(HiddenLabel).props()).toEqual({
      id: 'republic',
      label: 'Wisest jedi',
    })

    expect(wrapper.find('input').props()).toEqual({
      type: 'text',
      id: 'republic',
      value: 'Yoda',
      name: 'name',
      onChange,
      onBlur,
      'aria-invalid': false,
      'aria-required': undefined,
      'aria-describedby': undefined,
      disabled: undefined,
      placeholder: 'Enter the name',
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
    })

    expect(wrapper.find(Help).exists()).toBeFalsy()
  })

  it('onChange works', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <TextField name="name" value="Yoda" placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} />,
    )

    const testEvent = { target: { value: 'Luke' } }

    expect(onChange).toBeCalledTimes(0)

    const input = wrapper.find('input')
    act(() => {
      input.simulate('change', testEvent)
    })

    expect(onChange).toBeCalledTimes(1)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(onChange.mock.calls[0][0]).toMatchObject(testEvent)
  })

  it('onBlur works', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <TextField name="name" value="Yoda" placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} />,
    )

    expect(onBlur).toBeCalledTimes(0)

    const input = wrapper.find('input')
    act(() => {
      input.simulate('blur')
    })

    expect(onBlur).toBeCalledTimes(1)
  })

  it('Renders helper text', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <TextField
        name="name"
        value="Yoda"
        placeholder="Enter the name"
        label="Wisest jedi"
        onBlur={onBlur}
        onChange={onChange}
        helperText="A long time ago in a galaxy far, far away...."
      />,
    )

    expect(wrapper.find(HiddenLabel).props()).toEqual({
      id: 'republic',
      label: 'Wisest jedi',
    })

    expect(wrapper.find('input').props()).toEqual({
      type: 'text',
      id: 'republic',
      value: 'Yoda',
      name: 'name',
      onChange,
      onBlur,
      'aria-invalid': false,
      'aria-required': undefined,
      'aria-describedby': tooltipId('republic'),
      disabled: undefined,
      placeholder: 'Enter the name',
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
    })

    expect(wrapper.find(Help).props()).toEqual({
      inputId: 'republic',
      helperText: 'A long time ago in a galaxy far, far away....',
      className: styles.helperText,
    })
  })

  it('Renders error with correct props', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <TextField
        name="name"
        value="Yoda"
        placeholder="Enter the name"
        label="Wisest jedi"
        onBlur={onBlur}
        onChange={onChange}
        error="Dark side"
      />,
    )

    expect(wrapper.find(HiddenLabel).props()).toEqual({
      id: 'republic',
      label: 'Wisest jedi',
    })

    expect(wrapper.find('input').props()).toEqual({
      type: 'text',
      id: 'republic',
      value: 'Yoda',
      name: 'name',
      onChange,
      onBlur,
      'aria-invalid': true,
      'aria-required': undefined,
      'aria-describedby': undefined,
      disabled: undefined,
      placeholder: 'Enter the name',
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: 'Dark side',
      className: styles.errorContainer,
    })

    expect(wrapper.find(Help).exists()).toBeFalsy()
  })

  it('Renders required with correct props', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <TextField name="name" value="Yoda" placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} required />,
    )

    expect(wrapper.find(HiddenLabel).props()).toEqual({
      id: 'republic',
      label: 'Wisest jedi',
    })

    expect(wrapper.find('input').props()).toEqual({
      type: 'text',
      id: 'republic',
      value: 'Yoda',
      name: 'name',
      onChange,
      onBlur,
      'aria-invalid': false,
      'aria-required': true,
      'aria-describedby': undefined,
      disabled: undefined,
      placeholder: 'Enter the name',
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
    })

    expect(wrapper.find(Help).exists()).toBeFalsy()
  })

  it('Renders disabled with correct props', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <TextField name="name" value="Yoda" placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} disabled />,
    )

    expect(wrapper.find(HiddenLabel).props()).toEqual({
      id: 'republic',
      label: 'Wisest jedi',
    })

    expect(wrapper.find('input').props()).toEqual({
      type: 'text',
      id: 'republic',
      value: 'Yoda',
      name: 'name',
      onChange,
      onBlur,
      'aria-invalid': false,
      'aria-required': undefined,
      'aria-describedby': undefined,
      disabled: true,
      placeholder: 'Enter the name',
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
    })

    expect(wrapper.find(Help).exists()).toBeFalsy()
  })

  it('Renders inputContainerChild', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()
    const InputContainerChild = <div className="r2d2" />

    const wrapper = await mountAndCheckA11Y(
      <TextField
        name="name"
        value="Yoda"
        label="Wisest jedi"
        placeholder="Enter the name"
        onBlur={onBlur}
        onChange={onChange}
        inputContainerChild={InputContainerChild}
      />,
    )

    expect(wrapper.find(`.${styles.inputContainer}`).find('.r2d2').exists()).toBeTruthy()
  })
})
