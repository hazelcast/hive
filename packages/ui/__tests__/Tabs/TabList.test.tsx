import React from 'react'
import { useUID } from 'react-uid'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'

import { TabContextProvider } from '../../src/Tabs/TabContext'
import { TabList } from '../../src/Tabs/TabList'
import { Tab } from '../../src/Tabs/Tab'
import { TabPanel } from '../../src/Tabs/TabPanel'

import styles from '../../src/Tabs/Tabs.module.scss'

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
      <Tab data-test="tab1" label="Tab 1" value={0} />
      <Tab data-test="tab2" label="Tab 2" value={1} />
      <Tab data-test="tab3" label="Tab 3" value={2} />
      <Tab data-test="tab4" label="Tab 4" value={3} />
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
    const wrapper = await mountAndCheckA11Y(tabsComponent)

    expect(wrapper.findDataTest('tab-list').props()).toEqual({
      'data-test': 'tab-list',
      role: 'tablist',
      className: styles.tabList,
      'aria-label': ariaLabel,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      children: expect.anything(),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      onKeyDown: expect.anything(),
    })
  })

  describe('keyboard interactions', () => {
    it('sets focus on next tab when Right Arrow is pressed', async () => {
      const wrapper = await mountAndCheckA11Y(tabsComponent)

      const tabList = wrapper.find('div').first()
      const tab1 = tabList.findDataTest('tab1')
      tab1.simulate('keydown', { key: 'ArrowRight' })

      const tab2 = tabList.findDataTest('tab2')
      expect(document.activeElement).toBe(tab2.getDOMNode())
    })

    it('sets focus on first tab when the focus is on last tab and Right Arrow is pressed', async () => {
      const wrapper = await mountAndCheckA11Y(tabsComponent)

      const tabList = wrapper.find('div').first()
      const tab4 = tabList.findDataTest('tab4')
      tab4.simulate('keydown', { key: 'ArrowRight' })

      const tab1 = tabList.findDataTest('tab1')
      expect(document.activeElement).toBe(tab1.getDOMNode())
    })

    it('sets focus on previous tab when Left Arrow is pressed', async () => {
      const wrapper = await mountAndCheckA11Y(tabsComponent)

      const tabList = wrapper.find('div').first()
      const tab4 = tabList.findDataTest('tab4')
      tab4.simulate('keydown', { key: 'ArrowLeft' })

      const tab3 = tabList.findDataTest('tab3')
      expect(document.activeElement).toBe(tab3.getDOMNode())
    })

    it('sets focus on last tab when the focus is on first tab and Left Arrow is pressed', async () => {
      const wrapper = await mountAndCheckA11Y(tabsComponent)

      const tabList = wrapper.find('div').first()
      const tab1 = tabList.findDataTest('tab1')
      tab1.simulate('keydown', { key: 'ArrowLeft' })

      const tab4 = tabList.findDataTest('tab4')
      expect(document.activeElement).toBe(tab4.getDOMNode())
    })

    it('sets focus on first tab when Home is pressed', async () => {
      const wrapper = await mountAndCheckA11Y(tabsComponent)

      const tabList = wrapper.find('div').first()
      const tab3 = tabList.findDataTest('tab3')
      tab3.simulate('keydown', { key: 'Home' })

      const tab1 = tabList.findDataTest('tab1')
      expect(document.activeElement).toBe(tab1.getDOMNode())
    })

    it('sets focus on last tab when End is pressed', async () => {
      const wrapper = await mountAndCheckA11Y(tabsComponent)

      const tabList = wrapper.find('div').first()
      const tab2 = tabList.findDataTest('tab2')
      tab2.simulate('keydown', { key: 'End' })

      const tab4 = tabList.findDataTest('tab4')
      expect(document.activeElement).toBe(tab4.getDOMNode())
    })
  })
})
