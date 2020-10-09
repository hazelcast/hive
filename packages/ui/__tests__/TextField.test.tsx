import React from 'react'
import { pseudoUniqueID } from 'core/helpers/id'
import { act } from 'react-dom/test-utils'
import { mountAndCheckA11Y } from 'core/test-helpers/enzyme'

import { TextField } from '../TextField'
import { Label } from '../Label'
import { Error } from '../Error'

import styles from '../TextField.module.scss'

jest.mock('core/helpers/id')

const pseudoUniqueIDMock = pseudoUniqueID as jest.Mock<ReturnType<typeof pseudoUniqueID>>

describe('TextField', () => {
  beforeEach(() => {
    pseudoUniqueIDMock.mockImplementation(() => 'republic')
  })

  it('Renders the default with correct props', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <TextField name="name" value="Yoda" placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} />,
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
      disabled: undefined,
      placeholder: 'Enter the name',
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
    })
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
      disabled: undefined,
      placeholder: 'Enter the name',
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: 'Dark side',
      className: styles.errorContainer,
    })
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
      required: true,
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
      disabled: true,
      placeholder: 'Enter the name',
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
    })
  })

  it('Renders without label with correct props', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <TextField name="name" value="Yoda" placeholder="Enter the name" onBlur={onBlur} onChange={onChange} disabled />,
    )

    expect(wrapper.find(Label).exists()).toBeFalsy()

    expect(wrapper.find('input').props()).toEqual({
      type: 'text',
      id: 'republic',
      value: 'Yoda',
      name: 'name',
      onChange,
      onBlur,
      'aria-label': 'Enter the name',
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
  })

  it('Renders without label with helper', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <TextField
        name="name"
        value="Yoda"
        placeholder="Enter the name"
        helperText="A long time ago in a galaxy far, far away...."
        onBlur={onBlur}
        onChange={onChange}
        disabled
      />,
    )

    expect(wrapper.find(Label).exists()).toBeFalsy()

    expect(wrapper.find('input').props()).toEqual({
      type: 'text',
      id: 'republic',
      value: 'Yoda',
      name: 'name',
      onChange,
      onBlur,
      'aria-label': 'Enter the name',
      'aria-invalid': false,
      'aria-required': undefined,
      'aria-describedby': 'republic-label',
      disabled: true,
      placeholder: 'Enter the name',
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
    })
  })

  it('Renders inputContainerChild', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()
    const InputContainerChild = <div className="r2d2" />

    const wrapper = await mountAndCheckA11Y(
      <TextField
        name="name"
        value="Yoda"
        placeholder="Enter the name"
        onBlur={onBlur}
        onChange={onChange}
        inputContainerChild={InputContainerChild}
      />,
    )

    expect(wrapper.find(`.${styles.inputContainer}`).find('.r2d2').exists()).toBeTruthy()
  })
})
