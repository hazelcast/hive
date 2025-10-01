import React from 'react'
import { renderAndCheckA11Y } from '../../src/test-helpers'
import { screen, render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { NumberField } from '../../src'

import styles from '../../src/components/NumberField.module.scss'
import iconStyles from '../../src/components/Icon.module.scss'
import iconButtonStyles from '../../src/components/IconButton.module.scss'

describe('NumberField', () => {
  it('renders the default with correct props', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const { container } = await renderAndCheckA11Y(
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

    expect(screen.getByTestId('number-field')).toHaveClass('padme')
    expect(screen.queryByText('Wisest jedi')).toBeInTheDocument()

    const input = container.querySelector('input')

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('value', '42')
    expect(input).toHaveAttribute('type', 'number')
    expect(input).toHaveAttribute('placeholder', 'Enter the name')
    expect(input).toHaveClass('amidala')
    expect(input?.parentNode).toHaveClass(`${styles.inputContainer} ${styles.buttons}`)

    const decrementButton = screen.getByTestId('number-field-decrement')
    expect(decrementButton).toHaveAttribute('aria-label', 'Decrement')
    expect(decrementButton).toHaveAttribute('type', 'button')
    expect(decrementButton).toHaveClass(styles.decrement)
    expect(decrementButton).toHaveClass(iconButtonStyles.transparent)
    expect(decrementButton.querySelector('svg')).toHaveClass(iconStyles.smallMedium)
  })

  it('Renders correctly without the label prop', () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    render(
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

    expect(screen.queryByTestId('label-data-test')).not.toBeInTheDocument()
  })
  it('onDecrement works', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    await renderAndCheckA11Y(
      <NumberField name="name" value={42} placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} />,
    )

    expect(onChange).toHaveBeenCalledTimes(0)
    await userEvent.click(screen.getByTestId('number-field-decrement'))
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(41)
  })

  it('onDecrement works with step', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    await renderAndCheckA11Y(
      <NumberField name="name" value={42} step={10} placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} />,
    )

    expect(onChange).toHaveBeenCalledTimes(0)
    await userEvent.click(screen.getByTestId('number-field-decrement'))
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(32)
  })

  it('onDecrement works with floats', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    await renderAndCheckA11Y(
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

    expect(onChange).toHaveBeenCalledTimes(0)
    await userEvent.click(screen.getByTestId('number-field-decrement'))
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(42.1)
  })

  it('onIncrement works', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    await renderAndCheckA11Y(
      <NumberField name="name" value={42} placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} />,
    )

    expect(onChange).toHaveBeenCalledTimes(0)
    await userEvent.click(screen.getByTestId('number-field-increment'))
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(43)
  })

  it('onIncrement works with step', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    await renderAndCheckA11Y(
      <NumberField name="name" value={42} step={10} placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} />,
    )

    expect(onChange).toHaveBeenCalledTimes(0)
    await userEvent.click(screen.getByTestId('number-field-increment'))
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(52)
  })

  it('onIncrement works with floats', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    await renderAndCheckA11Y(
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

    expect(onChange).toHaveBeenCalledTimes(0)
    await userEvent.click(screen.getByTestId('number-field-increment'))
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(42.5)
  })

  it('provides overrides for increment/decrement aria labels', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    await renderAndCheckA11Y(
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

    const decrementButton = screen.getByTestId('number-field-decrement')
    expect(decrementButton).toHaveAttribute('aria-label', '-1')
    expect(decrementButton).toHaveAttribute('type', 'button')
    expect(decrementButton).toHaveClass(styles.decrement)
    expect(decrementButton).toHaveClass(iconButtonStyles.transparent)
    expect(decrementButton.querySelector('svg')).toHaveClass(iconStyles.smallMedium)

    const incrementButton = screen.getByTestId('number-field-increment')
    expect(incrementButton).toHaveAttribute('aria-label', '+1')
    expect(incrementButton).toHaveAttribute('type', 'button')
    expect(incrementButton).toHaveClass(styles.increment)
    expect(incrementButton).toHaveClass(iconButtonStyles.transparent)
    expect(incrementButton.querySelector('svg')).toHaveClass(iconStyles.smallMedium)
  })

  it('onDecrement can be disabled', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    await renderAndCheckA11Y(
      <NumberField name="name" value={42} min={42} placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} />,
    )

    expect(screen.getByTestId('number-field-decrement')).toHaveAttribute('disabled')
  })

  it('onIncrement can be disabled', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    await renderAndCheckA11Y(
      <NumberField name="name" value={42} max={42} placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} />,
    )

    expect(screen.getByTestId('number-field-increment')).toHaveAttribute('disabled')
  })

  it('onIncrement and onDecrement are disabled if input is disabled', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    await renderAndCheckA11Y(
      <NumberField name="name" value={42} placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} disabled />,
    )

    expect(screen.getByTestId('number-field-increment')).toHaveAttribute('disabled')
    expect(screen.getByTestId('number-field-decrement')).toHaveAttribute('disabled')
  })

  it('onIncrement and onDecrement are disabled if value is undefined', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    await renderAndCheckA11Y(
      <NumberField name="name" placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} />,
    )

    expect(screen.getByTestId('number-field-increment')).toHaveAttribute('disabled')
    expect(screen.getByTestId('number-field-decrement')).toHaveAttribute('disabled')
  })

  it('the initial value is adjusted if it is less than min', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    expect(onChange).toHaveBeenCalledTimes(0)

    await renderAndCheckA11Y(
      <NumberField name="name" value={42} min={43} placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} />,
    )

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(43)
  })

  it('the initial value is adjusted if it is greater than max', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    expect(onChange).toHaveBeenCalledTimes(0)

    await renderAndCheckA11Y(
      <NumberField name="name" value={42} max={41} placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} />,
    )

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(41)
  })

  it('onChange works if changed manually', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    expect(onChange).toHaveBeenCalledTimes(0)

    const { container } = await renderAndCheckA11Y(
      <NumberField name="name" value={42} placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} />,
    )

    fireEvent.change(container.querySelector('input')!, { target: { value: 100 } })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(100)
  })

  it('new value entered manually is adjusted if it is greater than max', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    expect(onChange).toHaveBeenCalledTimes(0)

    const { container } = await renderAndCheckA11Y(
      <NumberField name="name" value={42} max={43} placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} />,
    )

    fireEvent.change(container.querySelector('input')!, { target: { value: 100 } })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(43)
  })

  it('new value entered manually is adjusted if it is less than min', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    expect(onChange).toHaveBeenCalledTimes(0)

    const { container } = await renderAndCheckA11Y(
      <NumberField name="name" value={42} min={39} placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} />,
    )

    fireEvent.change(container.querySelector('input')!, { target: { value: 12 } })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(39)
  })

  it('increment button should set min value when value is undefined', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    expect(onChange).toHaveBeenCalledTimes(0)

    await renderAndCheckA11Y(
      <NumberField name="name" min={39} placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} />,
    )

    const incrementButton = screen.getByTestId('number-field-increment')
    expect(incrementButton).not.toHaveAttribute('disabled')

    await userEvent.click(incrementButton)

    expect(onChange).toHaveBeenCalledWith(39)
  })

  it('increment button should be disabled when min and value are undefined', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    await renderAndCheckA11Y(
      <NumberField name="name" placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} />,
    )

    const incrementButton = screen.getByTestId('number-field-increment')
    expect(incrementButton).toHaveAttribute('disabled')

    await userEvent.click(incrementButton)

    expect(onChange).toHaveBeenCalledTimes(0)
  })
})
