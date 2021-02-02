import React from 'react'
import { useUID } from 'react-uid'
import cn from 'classnames'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'

import { getPanelId, getTabId, TabContextProvider } from '../../src/Tabs/TabContext'
import { TabPanel } from '../../src/Tabs/TabPanel'
import { TabList } from '../../src/Tabs/TabList'
import { Tab } from '../../src/Tabs/Tab'

import styles from '../../src/TabPanel.module.scss'

jest.mock('react-uid')
const useUIDMock = useUID as jest.Mock<ReturnType<typeof useUID>>
const testId = 'testId'

const ariaLabel = 'testAriaLabel'

/**
 * Both [role="tab"] and [role="tabPanel"] need a parent with [role="tabList"].
 * Moreover, Tab's attribute aria-controls needs an element with attribute id which has the same value.
 */
const tabsComponent = (
  <TabContextProvider>
    <TabList ariaLabel={ariaLabel}>
      <Tab label="Tab 1" value={0} />
      <Tab label="Tab 2" value={1} />
    </TabList>
    <TabPanel data-test="tabPanel1" value={0}>
      Panel 1
    </TabPanel>
    <TabPanel data-test="tabPanel2" value={1}>
      Panel 2
    </TabPanel>
  </TabContextProvider>
)

describe('TabPanel', () => {
  beforeEach(() => {
    useUIDMock.mockImplementation(() => testId)
  })

  it('shows selected panel', async () => {
    const wrapper = await mountAndCheckA11Y(tabsComponent)

    const panel1 = wrapper.findDataTest('tabPanel1').find('div')
    expect(panel1.props()).toEqual({
      className: styles.tabPanel,
      role: 'tabpanel',
      id: getPanelId(testId, '0'),
      'aria-labelledby': getTabId(testId, '0'),
      children: 'Panel 1',
    })

    const panel2 = wrapper.findDataTest('tabPanel2').find('div')
    expect(panel2.props()).toEqual({
      className: cn(styles.tabPanel, styles.hidden),
      role: 'tabpanel',
      id: getPanelId(testId, '1'),
      'aria-labelledby': getTabId(testId, '1'),
      children: null,
    })
  })
})
