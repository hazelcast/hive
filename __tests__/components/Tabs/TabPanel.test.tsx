import React from 'react'
import { useUID } from 'react-uid'
import cn from 'classnames'
import { renderAndCheckA11Y } from '../../../src'
import { screen } from '@testing-library/react'

import { getPanelId, getTabId, TabContextProvider } from '../../../src/components/Tabs/TabContext'
import { TabPanel } from '../../../src/components/Tabs/TabPanel'
import { TabList } from '../../../src/components/Tabs/TabList'
import { Tab } from '../../../src/components/Tabs/Tab'

import styles from '../../src/Tabs/TabPanel.module.scss'

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
      <Tab value={0}>Tab 1</Tab>
      <Tab value={1}>Tab 2</Tab>
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
    await renderAndCheckA11Y(tabsComponent)

    const panel1 = screen.getByTestId('tabPanel1')
    expect(panel1).toHaveRole('tabpanel')
    expect(panel1).toHaveClass(styles.tabPanel)
    expect(panel1).toHaveAttribute('aria-labelledby', getTabId(testId, '0'))
    expect(panel1).toHaveAttribute('id', getPanelId(testId, '0'))
    expect(panel1).toHaveTextContent('Panel 1')

    const panel2 = screen.getByTestId('tabPanel2')
    expect(panel2).toHaveRole('tabpanel')
    expect(panel2).toHaveClass(cn(styles.tabPanel, styles.hidden))
    expect(panel2).toHaveAttribute('aria-labelledby', getTabId(testId, '1'))
    expect(panel2).toHaveAttribute('id', getPanelId(testId, '1'))
    expect(panel2.children).toHaveLength(0)
  })
})
