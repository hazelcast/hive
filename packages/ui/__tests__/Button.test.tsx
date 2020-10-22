import React from 'react'
import { X } from 'react-feather'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'

import { Button } from '../src/Button'

const label = 'LABEL'
const iconAriaLabel = 'X Icon'

describe('Button', () => {
  const labelTestData: [string][] = [['label'], [label], ['lAbEl']]

  it.each(labelTestData)('Renders default Button with correct label: %s', async (labelRaw) => {
    const wrapper = await mountAndCheckA11Y(<Button>{labelRaw}</Button>)

    expect(wrapper.find(Button).text()).toBe(label)
  })

  it('Renders button with left icon with proper aria-label', async () => {
    const wrapper = await mountAndCheckA11Y(
      <Button IconLeft={X} iconLeftAriaLabel={iconAriaLabel}>
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
      <Button IconRight={X} iconRightAriaLabel="X Icon">
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
      <Button IconLeft={X} iconLeftAriaLabel="X Icon" IconRight={X} iconRightAriaLabel="X Icon">
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
})
