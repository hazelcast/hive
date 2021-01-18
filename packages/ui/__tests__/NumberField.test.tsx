import React from 'react'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import cn from 'classnames'
import { Minus, Plus } from 'react-feather'

import { NumberField } from '../src/NumberField'
import { TextField } from '../src/TextField'
import { IconButton } from '../src/IconButton'

import styles from '../src/NumberField.module.scss'
import { act } from 'react-dom/test-utils'

describe('NumberField', () => {
  it('renders the default with correct props', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <NumberField
        name="name"
        value={42}
        placeholder="Enter the name"
        label="Wisest jedi"
        onBlur={onBlur}
        onChange={onChange}
        className="padme"
        inputClassName="amidala"
      />,
    )

    expect(wrapper.find(TextField).props()).toEqual({
      label: 'Wisest jedi',
      placeholder: 'Enter the name',
      value: 42,
      name: 'name',
      onBlur,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      onChange: expect.anything(),
      type: 'number',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      inputContainerChild: expect.anything(),
      inputClassName: cn(styles.inputContainer, 'amidala'),
      className: 'padme',
    })

    expect(wrapper.find(IconButton).at(0).props()).toEqual({
      size: 'small',
      icon: Minus,
      ariaLabel: 'Decrement',
      'data-test': 'number-field-decrement',
      className: styles.decrement,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      onClick: expect.anything(),
      disabled: undefined,
      kind: 'primary',
      type: 'button',
    })
    expect(wrapper.find(IconButton).at(1).props()).toEqual({
      size: 'small',
      icon: Plus,
      ariaLabel: 'Increment',
      'data-test': 'number-field-increment',
      className: styles.increment,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      onClick: expect.anything(),
      disabled: undefined,
      kind: 'primary',
      type: 'button',
    })
  })

  it('onDecrement works', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <NumberField name="name" value={42} placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} />,
    )

    expect(onChange).toBeCalledTimes(0)
    wrapper.find(IconButton).at(0).simulate('click')
    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith(41)
  })

  it('onDecrement works with step', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <NumberField name="name" value={42} step={10} placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} />,
    )

    expect(onChange).toBeCalledTimes(0)
    wrapper.find(IconButton).at(0).simulate('click')
    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith(32)
  })

  it('onDecrement works with floats', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <NumberField
        name="name"
        numberType="float"
        value={42.2}
        step={0.1}
        placeholder="Enter the name"
        label="Wisest jedi"
        onBlur={onBlur}
        onChange={onChange}
      />,
    )

    expect(onChange).toBeCalledTimes(0)
    wrapper.find(IconButton).at(0).simulate('click')
    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith(42.1)
  })

  it('onIncrement works', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <NumberField name="name" value={42} placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} />,
    )

    expect(onChange).toBeCalledTimes(0)
    wrapper.find(IconButton).at(1).simulate('click')
    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith(43)
  })

  it('onIncrement works with step', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <NumberField name="name" value={42} step={10} placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} />,
    )

    expect(onChange).toBeCalledTimes(0)
    wrapper.find(IconButton).at(1).simulate('click')
    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith(52)
  })

  it('onIncrement works with floats', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <NumberField
        name="name"
        numberType="float"
        value={42.2}
        step={0.3}
        placeholder="Enter the name"
        label="Wisest jedi"
        onBlur={onBlur}
        onChange={onChange}
      />,
    )

    expect(onChange).toBeCalledTimes(0)
    wrapper.find(IconButton).at(1).simulate('click')
    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith(42.5)
  })

  it('provides overrides for increment/decrement aria labels', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <NumberField
        name="name"
        value={42}
        placeholder="Enter the name"
        label="Wisest jedi"
        onBlur={onBlur}
        onChange={onChange}
        incrementIconAriaLabel="+1"
        decrementIconAriaLabel="-1"
      />,
    )

    expect(wrapper.find(IconButton).at(0).props()).toEqual({
      size: 'small',
      icon: Minus,
      ariaLabel: '-1',
      'data-test': 'number-field-decrement',
      className: styles.decrement,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      onClick: expect.anything(),
      disabled: undefined,
      kind: 'primary',
      type: 'button',
    })
    expect(wrapper.find(IconButton).at(1).props()).toEqual({
      size: 'small',
      icon: Plus,
      ariaLabel: '+1',
      'data-test': 'number-field-increment',
      className: styles.increment,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      onClick: expect.anything(),
      disabled: undefined,
      kind: 'primary',
      type: 'button',
    })
  })

  it('onDecrement can be disabled', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <NumberField name="name" value={42} min={42} placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} />,
    )

    expect(wrapper.find(IconButton).at(0).prop('disabled')).toBe(true)
  })

  it('onIncrement can be disabled', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <NumberField name="name" value={42} max={42} placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} />,
    )

    expect(wrapper.find(IconButton).at(1).prop('disabled')).toBe(true)
  })

  it('onIncrement and onDecrement are disabled if input is disabled', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <NumberField name="name" value={42} placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} disabled />,
    )

    expect(wrapper.find(IconButton).at(0).prop('disabled')).toBe(true)
    expect(wrapper.find(IconButton).at(1).prop('disabled')).toBe(true)
  })

  it('onIncrement and onDecrement are disabled if value is undefined', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <NumberField name="name" placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} />,
    )

    expect(wrapper.find(IconButton).at(0).prop('disabled')).toBe(true)
    expect(wrapper.find(IconButton).at(1).prop('disabled')).toBe(true)
  })

  it('the initial value is adjusted if it is less than min', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    expect(onChange).toBeCalledTimes(0)

    await mountAndCheckA11Y(
      <NumberField name="name" value={42} min={43} placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} />,
    )

    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith(43)
  })

  it('the initial value is adjusted if it is greater than max', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    expect(onChange).toBeCalledTimes(0)

    await mountAndCheckA11Y(
      <NumberField name="name" value={42} max={41} placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} />,
    )

    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith(41)
  })

  it('onChange works if changed manually', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    expect(onChange).toBeCalledTimes(0)

    const wrapper = await mountAndCheckA11Y(
      <NumberField name="name" value={42} placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} />,
    )

    act(() => {
      wrapper.find('input').simulate('change', { target: { value: '100' } })
    })

    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith(100)
  })

  it('new value entered manually is adjusted if it is greater than max', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    expect(onChange).toBeCalledTimes(0)

    const wrapper = await mountAndCheckA11Y(
      <NumberField name="name" value={42} max={43} placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} />,
    )

    act(() => {
      wrapper.find('input').simulate('change', { target: { value: '100' } })
    })

    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith(43)
  })

  it('new value entered manually is adjusted if it is less than min', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    expect(onChange).toBeCalledTimes(0)

    const wrapper = await mountAndCheckA11Y(
      <NumberField name="name" value={42} min={39} placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} />,
    )

    act(() => {
      wrapper.find('input').simulate('change', { target: { value: '12' } })
    })

    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith(39)
  })
})
