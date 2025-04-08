import React from 'react'
import { useUID } from 'react-uid'
import { renderAndCheckA11Y } from '../../../src'
import { fireEvent, screen, within } from '@testing-library/react'

import { TabContextProvider } from '../../../src/components/Tabs/TabContext'
import { TabList } from '../../../src/components/Tabs/TabList'
import { Tab } from '../../../src/components/Tabs/Tab'
import { TabPanel } from '../../../src/components/Tabs/TabPanel'

import styles from '../../src/Tabs/Tab.module.scss'

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
      <Tab ariaLabel="Tab 1" value={0}>
        Tab 1
      </Tab>
      <Tab ariaLabel="Tab 2" value={1}>
        Tab 2
      </Tab>
      <Tab ariaLabel="Tab 3" value={2}>
        Tab 3
      </Tab>
      <Tab ariaLabel="Tab 4" value={3}>
        Tab 4
      </Tab>
    </TabList>
    <TabPanel value={0}>Panel 1</TabPanel>
    <TabPanel value={1}>Panel 2</TabPanel>
    <TabPanel value={2}>Panel 3</TabPanel>
    <TabPanel value={3}>Panel 4</TabPanel>
  </TabContextProvider>
)

describe('TabList', () => {
  beforeEach(() => {
    useUIDMock.mockImplementation(() => testId)
  })

  it('renders <div> with correct props', async () => {
    await renderAndCheckA11Y(tabsComponent)

    const tabList = screen.getByTestId('tab-list')
    expect(tabList).toHaveRole('tablist')
    expect(tabList).toHaveClass(styles.tabList)
    expect(tabList).toHaveAttribute('aria-label', ariaLabel)
  })

  describe('keyboard interactions', () => {
    it('sets focus on next tab when Right Arrow is pressed', async () => {
      await renderAndCheckA11Y(tabsComponent)

      const tabList = screen.getByTestId('tab-list')
      fireEvent.keyDown(within(tabList).getByText('Tab 1'), { key: 'ArrowRight', charCode: 39 })

      const tab2 = within(tabList).getByText('Tab 2')
      expect(document.activeElement).toBe(tab2)
    })

    it('sets focus on first tab when the focus is on last tab and Right Arrow is pressed', async () => {
      await renderAndCheckA11Y(tabsComponent)

      const tabList = screen.getByTestId('tab-list')
      fireEvent.keyDown(within(tabList).getByText('Tab 4'), { key: 'ArrowRight', charCode: 39 })

      const tab1 = within(tabList).getByText('Tab 1')
      expect(document.activeElement).toBe(tab1)
    })

    it('sets focus on previous tab when Left Arrow is pressed', async () => {
      await renderAndCheckA11Y(tabsComponent)

      const tabList = screen.getByTestId('tab-list')
      fireEvent.keyDown(within(tabList).getByText('Tab 4'), { key: 'ArrowLeft', charCode: 37 })

      const tab3 = within(tabList).getByText('Tab 3')
      expect(document.activeElement).toBe(tab3)
    })

    it('sets focus on last tab when the focus is on first tab and Left Arrow is pressed', async () => {
      await renderAndCheckA11Y(tabsComponent)

      const tabList = screen.getByTestId('tab-list')
      fireEvent.keyDown(within(tabList).getByText('Tab 1'), { key: 'ArrowLeft', charCode: 37 })

      const tab4 = within(tabList).getByText('Tab 4')
      expect(document.activeElement).toBe(tab4)
    })

    it('sets focus on first tab when Home is pressed', async () => {
      await renderAndCheckA11Y(tabsComponent)

      const tabList = screen.getByTestId('tab-list')
      fireEvent.keyDown(within(tabList).getByText('Tab 3'), { key: 'Home', charCode: 26 })

      const tab1 = within(tabList).getByText('Tab 1')
      expect(document.activeElement).toBe(tab1)
    })

    it('sets focus on last tab when End is pressed', async () => {
      await renderAndCheckA11Y(tabsComponent)

      const tabList = screen.getByTestId('tab-list')
      fireEvent.keyDown(within(tabList).getByText('Tab 2'), { key: 'End', charCode: 35 })

      const tab4 = within(tabList).getByText('Tab 4')
      expect(document.activeElement).toBe(tab4)
    })
  })
})
