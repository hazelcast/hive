import React from 'react'
import { mount } from 'enzyme'
import { useUID } from 'react-uid'
import cn from 'classnames'

import { getPanelId, getTabId, TabContextComponent } from '../../src/Tabs/TabContext'
import { TabPanel } from '../../src/Tabs/TabPanel'

import styles from '../../src/TabPanel.module.scss'

jest.mock('react-uid')

const useUIDMock = useUID as jest.Mock<ReturnType<typeof useUID>>

const testId = 'testId'
const testChildren = <div data-test="testChildren" />

describe('TabPanel', () => {
  beforeEach(() => {
    useUIDMock.mockImplementation(() => testId)
  })
  it('renders <div> with correct props when panel is not selected', () => {
    const contextValues = {
      value: 0,
      onChange: jest.fn(),
    }

    // Different than context value
    const index = 1

    const wrapper = mount(
      <TabContextComponent {...contextValues}>
        <TabPanel value={index}>{testChildren}</TabPanel>
      </TabContextComponent>,
    )

    expect(wrapper.find('div').first().props()).toEqual({
      className: cn(styles.tabPanel, styles.hidden),
      role: 'tabpanel',
      id: getPanelId(testId, index.toString()),
      'aria-labelledby': getTabId(testId, index.toString()),
      children: null,
    })
  })

  it('renders <div> with correct props when panel is selected', () => {
    const contextValues = {
      value: 0,
      onChange: jest.fn(),
    }

    // Same as context value
    const index = 0

    const wrapper = mount(
      <TabContextComponent {...contextValues}>
        <TabPanel value={index}>{testChildren}</TabPanel>
      </TabContextComponent>,
    )

    expect(wrapper.find('div').first().props()).toEqual({
      className: styles.tabPanel,
      role: 'tabpanel',
      id: getPanelId(testId, index.toString()),
      'aria-labelledby': getTabId(testId, index.toString()),
      children: testChildren,
    })
  })
})
