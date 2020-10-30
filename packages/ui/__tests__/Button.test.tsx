import { mount } from 'enzyme'
import React from 'react'
import { X } from 'react-feather'
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

  it.each(buttonKindTestData)('Renders Button with correct className which corresponds to button kind', (kind, className) => {
    const wrapper = mount(<Button kind={kind}>Label</Button>)

    expect(wrapper.findDataTest('button').prop('className')).toMatch(`button ${className}`)
  })

  const labelTestData: [string][] = [['label'], [label], ['lAbEl']]

  it.each(labelTestData)('Renders Button with correctly capitalized label, when capitalize=true: %s', (labelRaw) => {
    const wrapper = mount(<Button>{labelRaw}</Button>)

    expect(wrapper.find(Button).text()).toBe(label)
  })

  it('Renders Button with original label when capitalize=false', () => {
    const label = 'label'

    const wrapper = mount(<Button capitalize={false}>{label}</Button>)

    expect(wrapper.find(Button).text()).toBe(label)
  })

  it('Renders button with left icon with proper aria-label', () => {
    const wrapper = mount(
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

  it('Renders button with right icon with proper aria-label', () => {
    const wrapper = mount(
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

  it('Renders button with left and right icons and proper aria-labels', () => {
    const wrapper = mount(
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
})
