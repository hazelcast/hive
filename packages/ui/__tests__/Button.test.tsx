import React from 'react'
import { X } from 'react-feather'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import cn from 'classnames'

import { Loader, TruncatedText, Tooltip, Button, ButtonKind, Icon } from '../src'

import styles from '../src/Button.module.scss'

const label = 'LABEL'
const ariaLabel = 'X Icon'

describe('Button', () => {
  const buttonKindTestData: [ButtonKind, string][] = [
    ['primary', styles.primary],
    ['secondary', styles.secondary],
    ['transparent', styles.transparent],
  ]

  it.each(buttonKindTestData)('Renders Button with correct className which corresponds to button kind', async (kind, className) => {
    const wrapper = await mountAndCheckA11Y(<Button kind={kind}>Label</Button>)

    expect(wrapper.findDataTest('button').prop('className')).toBe(cn(styles.button, className))
  })

  const labelTestData: [string][] = [['label'], [label], ['lAbEl']]

  it.each(labelTestData)('Renders Button with correctly capitalized label, when capitalize=true: %s', async (labelRaw) => {
    const wrapper = await mountAndCheckA11Y(<Button>{labelRaw}</Button>)

    expect(wrapper.find(Button).text()).toBe(label)
  })

  it('Renders Button', async () => {
    const label = 'label'

    const wrapper = await mountAndCheckA11Y(<Button>{label}</Button>)

    expect(wrapper.find(Button).props()).toStrictEqual({ children: label })
    expect(wrapper.find(Tooltip).at(0).props()).toStrictEqual({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      children: expect.anything(),
      content: undefined,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      id: expect.anything(),
      placement: undefined,
      visible: undefined,
    })
    expect(wrapper.find('button').props()).toMatchObject({
      type: 'button',
      className: cn(styles.button, styles.primary),
      'aria-describedby': undefined,
      disabled: undefined,
      rel: undefined,
      target: undefined,
    })
    expect(wrapper.findDataTest('button-outline').prop('className')).toBe(styles.outline)
    expect(wrapper.find(TruncatedText).props()).toStrictEqual({
      text: label.toLocaleUpperCase(),
      tooltipVisible: undefined,
    })
    expect(wrapper.find(Icon)).toHaveLength(0)
  })

  it('Renders Button with original label when capitalize=false', async () => {
    const label = 'label'

    const wrapper = await mountAndCheckA11Y(<Button capitalize={false}>{label}</Button>)

    expect(wrapper.find(Button).text()).toBe(label)
  })

  it('Renders button with left icon with proper aria-label', async () => {
    const wrapper = await mountAndCheckA11Y(
      <Button iconLeft={X} iconLeftAriaLabel={ariaLabel}>
        {label}
      </Button>,
    )

    expect(wrapper.find(Button).text()).toBe(label)

    // Left
    expect(wrapper.findDataTest('button-icon-left').exists()).toBeTruthy()
    expect(wrapper.findDataTest('button-icon-left').find(X).props()).toMatchObject({
      'aria-label': ariaLabel,
    })

    // Right
    expect(wrapper.findDataTest('button-icon-right').exists()).toBeFalsy()
  })

  it('Renders button with right icon with proper aria-label', async () => {
    const wrapper = await mountAndCheckA11Y(
      <Button iconRight={X} iconRightAriaLabel="X Icon">
        {label}
      </Button>,
    )

    expect(wrapper.find(Button).text()).toBe(label)

    // Left
    expect(wrapper.findDataTest('button-icon-left').exists()).toBeFalsy()

    // Right
    expect(wrapper.findDataTest('button-icon-right').exists()).toBeTruthy()
    expect(wrapper.findDataTest('button-icon-right').find(X).props()).toMatchObject({
      'aria-label': ariaLabel,
    })
  })

  it('Renders button with left and right icons and proper aria-labels', async () => {
    const wrapper = await mountAndCheckA11Y(
      <Button iconLeft={X} iconLeftAriaLabel="X Icon" iconRight={X} iconRightAriaLabel="X Icon">
        {label}
      </Button>,
    )

    expect(wrapper.find(Button).text()).toBe(label)

    // Left
    expect(wrapper.findDataTest('button-icon-left').exists()).toBeTruthy()
    expect(wrapper.findDataTest('button-icon-left').find(X).props()).toMatchObject({
      'aria-label': ariaLabel,
    })

    // Right
    expect(wrapper.findDataTest('button-icon-right').exists()).toBeTruthy()
    expect(wrapper.findDataTest('button-icon-right').find(X).props()).toMatchObject({
      'aria-label': ariaLabel,
    })
  })

  it('Renders loading button', async () => {
    const wrapper = await mountAndCheckA11Y(
      // div is required because `axe` cannot validate react fragments
      <div>
        <Button loading>{label}</Button>
      </div>,
    )

    expect(wrapper.find('button').prop('disabled')).toBe(true)
    expect(wrapper.find(Tooltip).at(0).props()).toMatchObject({
      content: undefined,
    })
    expect(wrapper.find(Loader).props()).toEqual({
      className: styles.iconLeft,
      size: 'medium',
    })
  })

  it('Renders loading animation on right side (only when the right icon is used)', async () => {
    const wrapper = await mountAndCheckA11Y(
      // div is required because `axe` cannot validate react fragments
      <div>
        <Button loading iconRight={X} iconRightAriaLabel="X Icon">{label}</Button>
      </div>,
    )

    expect(wrapper.find(Loader).props()).toEqual({
      className: styles.iconRight,
      size: 'medium',
    })
  })

  it('Renders disabled button with a disabled tooltip', async () => {
    const disabledTooltip = 'Disabled tooltip'

    const wrapper = await mountAndCheckA11Y(
      // div is required because `axe` cannot validate react fragments
      <div>
        <Button disabled disabledTooltip={disabledTooltip}>
          {label}
        </Button>
      </div>,
    )

    expect(wrapper.find('button').prop('disabled')).toBe(true)
    expect(wrapper.find(Tooltip).at(0).props()).toMatchObject({
      content: disabledTooltip,
    })
    expect(wrapper.exists(Loader)).toBeFalsy()
  })

  it('Renders disabled loading button with a disabled tooltip', async () => {
    const disabledTooltip = 'Disabled tooltip'

    const wrapper = await mountAndCheckA11Y(
      // div is required because `axe` cannot validate react fragments
      <div>
        <Button disabled loading disabledTooltip={disabledTooltip}>
          {label}
        </Button>
      </div>,
    )

    expect(wrapper.find('button').prop('disabled')).toBe(true)
    expect(wrapper.find(Tooltip).at(0).props()).toMatchObject({
      content: disabledTooltip,
    })
    expect(wrapper.find(Loader).props()).toEqual({
      className: styles.iconLeft,
      size: 'medium',
    })
  })

  it('Renders disabled button, tooltip is enabled, correct tooltipVisible flag passed to TruncatedText', async () => {
    const disabledTooltip = 'Disabled tooltip'

    const wrapper = await mountAndCheckA11Y(
      <Button disabled disabledTooltip={disabledTooltip}>
        {label}
      </Button>,
    )

    expect(wrapper.find(TruncatedText).props()).toMatchObject({
      tooltipVisible: false,
    })
  })

  it('Renders disabled button, tooltip is disabled, correct tooltipVisible flag passed to TruncatedText', async () => {
    const disabledTooltip = 'Disabled tooltip'

    const wrapper = await mountAndCheckA11Y(
      <Button disabled disabledTooltip={disabledTooltip} disabledTooltipVisible={false}>
        {label}
      </Button>,
    )

    expect(wrapper.find(TruncatedText).props()).toMatchObject({
      tooltipVisible: undefined,
    })
  })

  it('Renders a button with an inset outline', async () => {
    const wrapper = await mountAndCheckA11Y(<Button outline="inset">{label}</Button>)

    expect(wrapper.findDataTest('button-outline').prop('className')).toBe(cn(styles.outline, styles.inset))
  })

  it('Renders button with a link semantics', async () => {
    const wrapper = await mountAndCheckA11Y(
      <Button component="a" href="#test">
        {label}
      </Button>,
    )

    expect(wrapper.find('button').exists()).toBe(false)
    expect(wrapper.find('a').exists()).toBe(true)
  })

  it('Renders button with a link semantics, proper parameters are passed to an anchor', async () => {
    const onClick = jest.fn()
    const wrapper = await mountAndCheckA11Y(
      <Button component="a" href="#test" onClick={onClick} rel={['noopener', 'noreferrer']} target="_blank">
        {label}
      </Button>,
    )

    const props = wrapper.find('a').props()
    expect(props).toHaveProperty('href', '#test')
    expect(props).toHaveProperty('onClick', onClick)
    expect(props).toHaveProperty('rel', 'noopener noreferrer')
    expect(props).toHaveProperty('target', '_blank')
    expect(props).toHaveProperty('type', undefined)
  })

  it('Renders button with a default button semantics, link specific params are undefined', async () => {
    const wrapper = await mountAndCheckA11Y(<Button>{label}</Button>)

    const props = wrapper.find('button').props()
    expect(props).toHaveProperty('rel', undefined)
    expect(props).toHaveProperty('target', undefined)
    expect(props).toHaveProperty('type', 'button')
  })

  it('Renders button with a link semantics, check that noopener attribute is passed to a link by default', async () => {
    const onClick = jest.fn()
    const wrapper = await mountAndCheckA11Y(
      <Button component="a" href="#test" onClick={onClick}>
        {label}
      </Button>,
    )

    expect(wrapper.find('a').props()).toHaveProperty('rel', 'noopener')
  })
})
