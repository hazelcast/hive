import React from 'react'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import cn from 'classnames'
import { Minus, Plus } from 'react-feather'

import { NumberField } from '../src/NumberField'
import { TextField } from '../src/TextField'
import { IconButton } from '../src/IconButton'

import styles from '../src/NumberField.module.scss'

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
      />,
    )

    expect(wrapper.find(TextField).props()).toEqual({
      label: 'Wisest jedi',
      placeholder: 'Enter the name',
      value: 42,
      name: 'name',
      onBlur,
      onChange,
      type: 'number',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      inputContainerChild: expect.anything(),
      inputClassName: cn(styles.inputContainer, 'padme'),
    })

    expect(wrapper.find(IconButton).at(0).props()).toEqual({
      size: 'small',
      icon: Minus,
      iconAriaLabel: 'Decrement',
      className: styles.decrement,
      onClick: undefined,
      disabled: true,
      kind: 'primary',
    })
    expect(wrapper.find(IconButton).at(1).props()).toEqual({
      size: 'small',
      icon: Plus,
      iconAriaLabel: 'Increment',
      className: styles.increment,
      onClick: undefined,
      disabled: true,
      kind: 'primary',
    })
  })

  it('onDecrement works', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()
    const onDecrement = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <NumberField
        name="name"
        value={42}
        placeholder="Enter the name"
        label="Wisest jedi"
        onBlur={onBlur}
        onChange={onChange}
        onDecrement={onDecrement}
      />,
    )

    const buttonDecrement = wrapper.find(IconButton).at(0)
    expect(buttonDecrement.props()).toEqual({
      size: 'small',
      icon: Minus,
      iconAriaLabel: 'Decrement',
      className: styles.decrement,
      onClick: onDecrement,
      disabled: false,
      kind: 'primary',
    })

    expect(onDecrement).toBeCalledTimes(0)
    buttonDecrement.simulate('click')
    expect(onDecrement).toBeCalledTimes(1)
  })

  it('onIncrement works', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()
    const onIncrement = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <NumberField
        name="name"
        value={42}
        placeholder="Enter the name"
        label="Wisest jedi"
        onBlur={onBlur}
        onChange={onChange}
        onIncrement={onIncrement}
      />,
    )

    const buttonIncrement = wrapper.find(IconButton).at(1)
    expect(buttonIncrement.props()).toEqual({
      size: 'small',
      icon: Plus,
      iconAriaLabel: 'Increment',
      className: styles.increment,
      onClick: onIncrement,
      disabled: false,
      kind: 'primary',
    })

    expect(onIncrement).toBeCalledTimes(0)
    buttonIncrement.simulate('click')
    expect(onIncrement).toBeCalledTimes(1)
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
      iconAriaLabel: '-1',
      className: styles.decrement,
      onClick: undefined,
      disabled: true,
      kind: 'primary',
    })
    expect(wrapper.find(IconButton).at(1).props()).toEqual({
      size: 'small',
      icon: Plus,
      iconAriaLabel: '+1',
      className: styles.increment,
      onClick: undefined,
      disabled: true,
      kind: 'primary',
    })
  })
})
