import React from 'react'
import cn from 'classnames'
import { useUID } from 'react-uid'
import { screen, fireEvent } from '@testing-library/react'
import { renderAndCheckA11Y } from '@hazelcast/test-helpers'
import userEvent from '@testing-library/user-event'

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
      <Tab value={0} ariaLabel="Tab 1">
        Tab 1
      </Tab>
      <Tab ariaLabel="Tab 2" value={1}>
        Tab 2
      </Tab>
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
    await renderAndCheckA11Y(tabsComponent)

    const tab = screen.getByText('Tab 2')
    expect(tab).toHaveRole('tab')
    expect(tab).toHaveAttribute('id', getTabId(testId, '1'))
    expect(tab).toHaveAttribute('aria-controls', getPanelId(testId, '1'))
    expect(tab).toHaveAttribute('aria-label', 'Tab 2')
    expect(tab).toHaveAttribute('tabIndex', '-1')
    expect(tab).toHaveClass(styles.tab)
  })

  it('renders selected button with correct props', async () => {
    await renderAndCheckA11Y(tabsComponent)

    const tab = screen.getByText('Tab 1')
    expect(tab).toHaveRole('tab')
    expect(tab).toHaveAttribute('id', getTabId(testId, '0'))
    expect(tab).toHaveAttribute('aria-controls', getPanelId(testId, '0'))
    expect(tab).toHaveAttribute('aria-label', 'Tab 1')
    expect(tab).toHaveAttribute('tabIndex', '0')
    expect(tab).toHaveClass(cn(styles.tab, styles.selected))
  })

  it('renders custom tab name correct props', async () => {
    await renderAndCheckA11Y(
      <TabContextProvider>
        <TabList ariaLabel={ariaLabel}>
          <Tab value={0} ariaLabel="Tab 1">
            Tab<b key="">1</b>
          </Tab>
        </TabList>
        <TabPanel value={0}>Panel 1</TabPanel>
      </TabContextProvider>,
    )

    const tab = screen.getByLabelText('Tab 1')
    expect(tab).toHaveRole('tab')
    expect(tab).toHaveAttribute('id', getTabId(testId, '0'))
    expect(tab).toHaveAttribute('aria-controls', getPanelId(testId, '0'))
    expect(tab).toHaveAttribute('aria-label', 'Tab 1')
    expect(tab).toHaveAttribute('tabIndex', '0')
    expect(tab).toHaveTextContent('Tab1')
    expect(tab).toHaveClass(cn(styles.tab, styles.selected))
  })

  it('fires onChange with correct parameter on click, Enter press and Space press', async () => {
    const onChange = jest.fn()
    const contextValues = {
      value: 0,
      onChange,
    }

    await renderAndCheckA11Y(
      <TabContextProviderControlled {...contextValues}>
        <TabList ariaLabel={ariaLabel}>
          <Tab ariaLabel="Tab 1" value={0}>
            Tab 1
          </Tab>
          <Tab ariaLabel="Tab 2" value={1}>
            Tab 2
          </Tab>
        </TabList>
        <TabPanel value={0}>Panel 1</TabPanel>
        <TabPanel value={1}>Panel 2</TabPanel>
      </TabContextProviderControlled>,
    )

    const button = screen.getByText('Tab 2')

    await userEvent.click(button)

    expect(onChange).toHaveBeenCalledTimes(1)
    // Parameter is the value
    expect(onChange).toHaveBeenLastCalledWith(1)

    fireEvent.keyPress(button, { key: 'Enter', charCode: 13 })
    expect(onChange).toHaveBeenCalledTimes(2)
    // Parameter is the value
    expect(onChange).toHaveBeenLastCalledWith(1)

    fireEvent.keyPress(button, { key: 'Space', charCode: 32 })
    expect(onChange).toHaveBeenCalledTimes(3)
    // Parameter is the value
    expect(onChange).toHaveBeenLastCalledWith(1)

    // Do nothing if you press anything apart from Enter and Space
    fireEvent.keyPress(button, { key: 'Esc' })
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

    const { rerender } = await renderAndCheckA11Y(
      <TabContextProviderControlled {...contextValues}>
        <TabList ariaLabel={ariaLabel}>
          <Tab component="a" href="/href-1" value={0}>
            Tab 1
          </Tab>
          <Tab component="a" href="/href-2" value={1}>
            Tab 2
          </Tab>
        </TabList>
        <TabPanel value={0}>Panel 1</TabPanel>
        <TabPanel value={1}>Panel 2</TabPanel>
      </TabContextProviderControlled>,
    )

    expect(screen.getByText('Tab 1')).not.toHaveAttribute('href')
    expect(screen.getByText('Tab 2')).toHaveAttribute('href', '/href-2')

    rerender(
      <TabContextProviderControlled {...contextValues} value={1}>
        <TabList ariaLabel={ariaLabel}>
          <Tab component="a" href="/href-1" value={0}>
            Tab 1
          </Tab>
          <Tab component="a" href="/href-2" value={1}>
            Tab 2
          </Tab>
        </TabList>
        <TabPanel value={0}>Panel 1</TabPanel>
        <TabPanel value={1}>Panel 2</TabPanel>
      </TabContextProviderControlled>,
    )

    expect(screen.getByText('Tab 1')).toHaveAttribute('href', '/href-1')
    expect(screen.getByText('Tab 2')).not.toHaveAttribute('href')
  })
})
