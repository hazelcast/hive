import React from 'react'
import { X } from 'react-feather'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'

import { Tooltip } from '../src/Tooltip'
import { Button, ButtonKind } from '../src/Button'

import styles from '../src/Button.module.scss'

const label = 'LABEL'
const iconAriaLabel = 'X Icon'

describe('Button', () => {
  const buttonKindTestData: [ButtonKind, string][] = [
    ['primary', styles.primary],
    ['secondary', styles.secondary],
    ['transparent', styles.transparent],
  ]

  it.each(buttonKindTestData)('Renders Button with correct className which corresponds to button kind', async (kind, className) => {
    const wrapper = await mountAndCheckA11Y(<Button kind={kind}>Label</Button>)

    expect(wrapper.findDataTest('button').prop('className')).toMatch(`button ${className}`)
  })

  const labelTestData: [string][] = [['label'], [label], ['lAbEl']]

  it.each(labelTestData)('Renders Button with correctly capitalized label, when capitalize=true: %s', async (labelRaw) => {
    const wrapper = await mountAndCheckA11Y(<Button>{labelRaw}</Button>)

    expect(wrapper.find(Button).text()).toBe(label)
  })

  it('Renders Button with original label when capitalize=false', async () => {
    const label = 'label'

    const wrapper = await mountAndCheckA11Y(<Button capitalize={false}>{label}</Button>)

    expect(wrapper.find(Button).text()).toBe(label)
  })

  it('Renders button with left icon with proper aria-label', async () => {
    const wrapper = await mountAndCheckA11Y(
      <Button iconLeft={X} iconLeftAriaLabel={iconAriaLabel}>
        {label}
      </Button>,
    )

    expect(wrapper.find(Button).text()).toBe(label)

    // Left
    expect(wrapper.findDataTest('button-icon-left').exists()).toBeTruthy()
    expect(wrapper.findDataTest('button-icon-left').find(X).props()).toMatchObject({
      'aria-label': iconAriaLabel,
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
      'aria-label': iconAriaLabel,
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
      'aria-label': iconAriaLabel,
    })

    // Right
    expect(wrapper.findDataTest('button-icon-right').exists()).toBeTruthy()
    expect(wrapper.findDataTest('button-icon-right').find(X).props()).toMatchObject({
      'aria-label': iconAriaLabel,
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
  })
})
