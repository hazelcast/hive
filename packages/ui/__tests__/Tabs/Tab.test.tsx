import React, { ButtonHTMLAttributes } from 'react'
import cn from 'classnames'
import { useUID } from 'react-uid'
import { Settings } from 'react-feather'
import { act } from 'react-dom/test-utils'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'

import { getPanelId, getTabId, TabContextProvider, TabContextProviderControlled } from '../../src/Tabs/TabContext'
import { Tab } from '../../src/Tabs/Tab'
import { TabList } from '../../src/Tabs/TabList'
import { TabPanel } from '../../src/Tabs/TabPanel'

import styles from '../Tab.module.scss'

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
    </TabList>
    <TabPanel value={0}>Panel 1</TabPanel>
    <TabPanel value={1}>Panel 2</TabPanel>
  </TabContextProvider>
)

describe('Tab', () => {
  beforeEach(() => {
    useUIDMock.mockImplementation(() => testId)
  })

  it('renders button with correct props', async () => {
    const wrapper = await mountAndCheckA11Y(tabsComponent)

    expect(wrapper.findDataTest('tab2').find('button').props()).toEqual<ButtonHTMLAttributes<HTMLButtonElement>>({
      className: styles.tab,
      role: 'tab',
      id: getTabId(testId, '1'),
      'aria-controls': getPanelId(testId, '1'),
      'aria-selected': false,
      'aria-label': 'Tab 2',
      tabIndex: -1,
      children: 'Tab 2',

      onClick: expect.anything(),

      onKeyPress: expect.anything(),
    })
  })

  it('renders selected button with correct props', async () => {
    const wrapper = await mountAndCheckA11Y(tabsComponent)

    expect(wrapper.findDataTest('tab1').find('button').props()).toEqual<ButtonHTMLAttributes<HTMLButtonElement>>({
      className: cn(styles.tab, styles.selected),
      role: 'tab',
      id: getTabId(testId, '0'),
      'aria-controls': getPanelId(testId, '0'),
      'aria-selected': true,
      'aria-label': 'Tab 1',
      tabIndex: 0,
      children: 'Tab 1',

      onKeyPress: expect.anything(),

      onClick: expect.anything(),
    })
  })

  it('renders icon with correct props', async () => {
    const wrapper = await mountAndCheckA11Y(
      <TabContextProvider>
        <TabList ariaLabel={ariaLabel}>
          <Tab data-test="tab1" label="Tab 1" value={0} icon={Settings} iconAriaLabel="Settings" />
        </TabList>
        <TabPanel value={0}>Panel 1</TabPanel>
      </TabContextProvider>,
    )

    expect(wrapper.find(Settings).exists()).toBeTruthy()
  })

  it('renders custom tab name correct props', async () => {
    const wrapper = await mountAndCheckA11Y(
      <TabContextProvider>
        <TabList ariaLabel={ariaLabel}>
          <Tab data-test="tab1" value={0} ariaLabel="Tab 1">
            Tab<b key="">1</b>
          </Tab>
        </TabList>
        <TabPanel value={0}>Panel 1</TabPanel>
      </TabContextProvider>,
    )

    expect(wrapper.findDataTest('tab1').find('button').props()).toEqual<ButtonHTMLAttributes<HTMLButtonElement>>({
      className: cn(styles.tab, styles.selected),
      role: 'tab',
      id: getTabId(testId, '0'),
      'aria-controls': getPanelId(testId, '0'),
      'aria-selected': true,
      'aria-label': 'Tab 1',
      tabIndex: 0,
      children: ['Tab', <b key="">1</b>],
      onKeyPress: expect.anything(),
      onClick: expect.anything(),
    })
  })

  it('fires onChange with correct parameter on click, Enter press and Space press', async () => {
    const onChange = jest.fn()
    const contextValues = {
      value: 0,
      onChange,
    }

    const wrapper = await mountAndCheckA11Y(
      <TabContextProviderControlled {...contextValues}>
        <TabList ariaLabel={ariaLabel}>
          <Tab data-test="tab1" label="Tab 1" value={0} />
          <Tab data-test="tab2" label="Tab 2" value={1} />
        </TabList>
        <TabPanel value={0}>Panel 1</TabPanel>
        <TabPanel value={1}>Panel 2</TabPanel>
      </TabContextProviderControlled>,
    )

    const button = wrapper.findDataTest('tab2')

    // We do not use any of the event's props
    act(() => {
      button.simulate('click')
    })
    wrapper.update()
    expect(onChange).toHaveBeenCalledTimes(1)
    // Parameter is the value
    expect(onChange).toHaveBeenLastCalledWith(1)

    act(() => {
      button.simulate('keypress', { key: 'Enter' })
    })
    wrapper.update()
    expect(onChange).toHaveBeenCalledTimes(2)
    // Parameter is the value
    expect(onChange).toHaveBeenLastCalledWith(1)

    act(() => {
      button.simulate('keypress', { key: 'Space' })
    })
    wrapper.update()
    expect(onChange).toHaveBeenCalledTimes(3)
    // Parameter is the value
    expect(onChange).toHaveBeenLastCalledWith(1)

    // Do nothing if you press anything apart from Enter and Space
    act(() => {
      button.simulate('keypress', { key: 'Esc' })
    })
    wrapper.update()
    expect(onChange).toHaveBeenCalledTimes(3)
    // Parameter is the value
    expect(onChange).toHaveBeenLastCalledWith(1)
  })

  it('Unselected tab link must have href', async () => {
    const onChange = jest.fn()
    const contextValues = {
      value: 0,
      onChange,
    }

    const wrapper = await mountAndCheckA11Y(
      <TabContextProviderControlled {...contextValues}>
        <TabList ariaLabel={ariaLabel}>
          <Tab data-test="tab1" label="Tab 1" component="a" href="/href-1" value={0} />
          <Tab data-test="tab2" label="Tab 2" component="a" href="/href-2" value={1} />
        </TabList>
        <TabPanel value={0}>Panel 1</TabPanel>
        <TabPanel value={1}>Panel 2</TabPanel>
      </TabContextProviderControlled>,
    )

    expect(wrapper.findDataTest('tab1').find('a').prop('href')).toBeFalsy()
    expect(wrapper.findDataTest('tab2').find('a').prop('href')).toBe('/href-2')

    wrapper.setProps({
      value: 1,
    })

    expect(wrapper.findDataTest('tab1').find('a').prop('href')).toBe('/href-1')
    expect(wrapper.findDataTest('tab2').find('a').prop('href')).toBeFalsy()
  })
})
