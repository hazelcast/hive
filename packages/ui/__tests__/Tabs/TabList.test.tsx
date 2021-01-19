import React from 'react'
import { mount } from 'enzyme'

import { TabList } from '../../src/Tabs/TabList'

import styles from '../../src/Tabs/Tabs.module.scss'

describe('Tabs', () => {
  it('renders <div> with correct props', () => {
    const ariaLabel = 'testAriaLabel'
    const children = 'testChildren'
    const wrapper = mount(<TabList ariaLabel={ariaLabel}>{children}</TabList>)

    expect(wrapper.find('div').props()).toEqual({
      role: 'tablist',
      className: styles.tabList,
      'aria-label': ariaLabel,
      children,
    })
  })
})
