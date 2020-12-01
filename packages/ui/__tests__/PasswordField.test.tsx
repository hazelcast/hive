import React from 'react'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import cn from 'classnames'
import { Eye, EyeOff } from 'react-feather'
import { act } from 'react-dom/test-utils'

import { PasswordField } from '../src/PasswordField'
import { TextField } from '../src/TextField'
import { IconButton } from '../src/IconButton'

import styles from '../src/PasswordField.module.scss'

describe('PasswordField', () => {
  it('renders the default with correct props', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <PasswordField
        name="name"
        value="password"
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
      value: 'password',
      name: 'name',
      onBlur,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      onChange: expect.anything(),
      type: 'password',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      inputContainerChild: expect.anything(),
      inputClassName: cn(styles.inputContainer, 'amidala'),
      className: 'padme',
    })

    expect(wrapper.find(IconButton).props()).toEqual({
      size: 'small',
      icon: Eye,
      ariaLabel: 'Show password',
      'data-test': 'password-field-toggle',
      className: styles.toggle,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      onClick: expect.anything(),
      disabled: undefined,
      kind: 'primary',
      type: 'button',
    })
  })

  it('visibility toggle works', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <PasswordField name="name" value="password" placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} />,
    )

    expect(wrapper.find(TextField).prop('type')).toBe('password')
    expect(wrapper.find(IconButton).prop('icon')).toBe(Eye)

    act(() => {
      wrapper.find(IconButton).simulate('click')
    })
    wrapper.update()

    expect(wrapper.find(TextField).prop('type')).toBe('text')
    expect(wrapper.find(IconButton).prop('icon')).toBe(EyeOff)

    act(() => {
      wrapper.find(IconButton).simulate('click')
    })
    wrapper.update()

    expect(wrapper.find(TextField).prop('type')).toBe('password')
    expect(wrapper.find(IconButton).prop('icon')).toBe(Eye)
  })

  it('provides overrides for visibility toggle aria labels', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <PasswordField
        name="name"
        value="password"
        placeholder="Enter the name"
        label="Wisest jedi"
        onBlur={onBlur}
        onChange={onChange}
        hideIconLabel="Hide death star"
        showIconLabel="Show death star"
      />,
    )

    expect(wrapper.find(IconButton).prop('ariaLabel')).toBe('Show death star')

    act(() => {
      wrapper.find(IconButton).simulate('click')
    })
    wrapper.update()

    expect(wrapper.find(IconButton).prop('ariaLabel')).toBe('Hide death star')

    act(() => {
      wrapper.find(IconButton).simulate('click')
    })
    wrapper.update()

    expect(wrapper.find(IconButton).prop('ariaLabel')).toBe('Show death star')
  })

  it('visibility toggle is disabled if input is disabled', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <PasswordField
        name="name"
        value="password"
        placeholder="Enter the name"
        label="Wisest jedi"
        onBlur={onBlur}
        onChange={onChange}
        disabled
      />,
    )

    expect(wrapper.find(IconButton).prop('disabled')).toBe(true)
  })
})
