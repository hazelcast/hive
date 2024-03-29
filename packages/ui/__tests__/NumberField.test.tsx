import React from 'react'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import { MinusCircle, PlusCircle } from 'react-feather'

import { NumberField } from '../src/NumberField'
import { TextField } from '../src/TextField'
import { IconButton } from '../src/IconButton'

import styles from '../src/NumberField.module.scss'
import { act } from 'react-dom/test-utils'
import { shallow } from 'enzyme'

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
      onChange: expect.anything(),
      type: 'number',
      inputContainerChild: expect.anything(),
      inputContainerClassName: `${styles.inputContainer} ${styles.buttons}`,
      inputClassName: 'amidala',
      className: 'padme',
    })

    expect(wrapper.find(IconButton).at(0).props()).toEqual({
      size: 'smallMedium',
      icon: MinusCircle,
      ariaLabel: 'Decrement',
      'data-test': 'number-field-decrement',
      className: styles.decrement,
      onClick: expect.anything(),
      kind: 'transparent',
      type: 'button',
    })
    expect(wrapper.find(IconButton).at(1).props()).toEqual({
      size: 'smallMedium',
      icon: PlusCircle,
      ariaLabel: 'Increment',
      'data-test': 'number-field-increment',
      className: styles.increment,
      onClick: expect.anything(),
      kind: 'transparent',
      type: 'button',
    })
  })

  it('Renders correctly without the label prop', () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = shallow(
      <NumberField
        name="name"
        value={42}
        placeholder="Enter the name"
        onBlur={onBlur}
        onChange={onChange}
        className="padme"
        inputClassName="amidala"
      />,
    )

    expect(wrapper.existsDataTest('label-data-test')).toBeFalsy()
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
      size: 'smallMedium',
      icon: MinusCircle,
      ariaLabel: '-1',
      'data-test': 'number-field-decrement',
      className: styles.decrement,
      onClick: expect.anything(),
      disabled: undefined,
      kind: 'transparent',
      type: 'button',
    })
    expect(wrapper.find(IconButton).at(1).props()).toEqual({
      size: 'smallMedium',
      icon: PlusCircle,
      ariaLabel: '+1',
      'data-test': 'number-field-increment',
      className: styles.increment,
      onClick: expect.anything(),
      disabled: undefined,
      kind: 'transparent',
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

  it('increment button should set min value when value is undefined', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    expect(onChange).toBeCalledTimes(0)

    const wrapper = await mountAndCheckA11Y(
      <NumberField name="name" min={39} placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} />,
    )

    const incrementButton = wrapper.findDataTest('number-field-increment').at(0)
    expect(incrementButton.props().disabled).toBeFalsy()

    act(() => {
      incrementButton.simulate('click')
    })

    expect(onChange).toBeCalledWith(39)
  })

  it('increment button should be disabled when min and value are undefined', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <NumberField name="name" placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} />,
    )

    const incrementButton = wrapper.findDataTest('number-field-increment').at(0)
    expect(incrementButton.props().disabled).toBeTruthy()

    act(() => {
      incrementButton.simulate('click')
    })

    expect(onChange).toBeCalledTimes(0)
  })
})
