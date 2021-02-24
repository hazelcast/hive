import React from 'react'
import { act } from 'react-dom/test-utils'
import { mountAndCheckA11Y, simulateChange } from '@hazelcast/test-helpers'
import { useUID } from 'react-uid'

import { TextField } from '../src/TextField'
import { Label } from '../src/Label'
import { Error, errorId } from '../src/Error'
import { Help, helpTooltipId } from '../src/Help'

import styles from '../src/TextField.module.scss'

jest.mock('react-uid')

const useUIDMock = useUID as jest.Mock<ReturnType<typeof useUID>>

describe('TextField', () => {
  beforeEach(() => {
    useUIDMock.mockImplementation(() => 'republic')
  })

  it('Renders the default with correct props', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()
    const onKeyPress = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <TextField
        name="name"
        value="Yoda"
        placeholder="Enter the name"
        label="Wisest jedi"
        onBlur={onBlur}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />,
    )

    expect(wrapper.find(Label).props()).toEqual({
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
      onKeyPress,
      'aria-invalid': false,
      'aria-required': undefined,
      'aria-describedby': undefined,
      'aria-errormessage': undefined,
      disabled: undefined,
      placeholder: 'Enter the name',
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
      inputId: 'republic',
    })

    expect(wrapper.find(Help).exists()).toBeFalsy()
  })

  it('onChange works', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <TextField name="name" value="Yoda" placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} />,
    )

    expect(onChange).toBeCalledTimes(0)

    let event: object
    act(() => {
      event = simulateChange(wrapper.find('input'), 'Luke')
    })

    expect(onChange).toBeCalledTimes(1)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-non-null-assertion
    expect(onChange.mock.calls[0][0]).toMatchObject(event!)
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

    expect(wrapper.find(Label).props()).toEqual({
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
      'aria-describedby': helpTooltipId('republic'),
      'aria-errormessage': undefined,
      disabled: undefined,
      placeholder: 'Enter the name',
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
      inputId: 'republic',
    })

    expect(wrapper.find(Help).props()).toEqual({
      parentId: 'republic',
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

    expect(wrapper.find(Label).props()).toEqual({
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
      'aria-errormessage': errorId('republic'),
      disabled: undefined,
      placeholder: 'Enter the name',
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: 'Dark side',
      className: styles.errorContainer,
      inputId: 'republic',
    })

    expect(wrapper.find(Help).exists()).toBeFalsy()
  })

  it('Renders required with correct props', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <TextField name="name" value="Yoda" placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} required />,
    )

    expect(wrapper.find(Label).props()).toEqual({
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
      'aria-errormessage': undefined,
      disabled: undefined,
      placeholder: 'Enter the name',
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
      inputId: 'republic',
    })

    expect(wrapper.find(Help).exists()).toBeFalsy()
  })

  it('Renders disabled with correct props', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <TextField name="name" value="Yoda" placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} disabled />,
    )

    expect(wrapper.find(Label).props()).toEqual({
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
      'aria-errormessage': undefined,
      disabled: true,
      placeholder: 'Enter the name',
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
      inputId: 'republic',
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
