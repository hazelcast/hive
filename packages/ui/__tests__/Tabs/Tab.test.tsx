import React, { ButtonHTMLAttributes } from 'react'
import cn from 'classnames'
import { mount } from 'enzyme'
import { useUID } from 'react-uid'
import { act } from 'react-dom/test-utils'

import { getPanelId, getTabId, TabContextComponent, TabContextComponentControlled } from '../../src/Tabs/TabContext'
import { Tab } from '../../src/Tabs/Tab'

import styles from '../Tab.module.scss'

jest.mock('react-uid')

const useUIDMock = useUID as jest.Mock<ReturnType<typeof useUID>>

const testId = 'testId'

describe('Tab', () => {
  beforeEach(() => {
    useUIDMock.mockImplementation(() => testId)
  })

  it('renders button with correct props', () => {
    const contextValues = {
      value: 0,
      onChange: jest.fn(),
    }

    const label = 'testLabel'
    const value = 1

    const wrapper = mount(
      <TabContextComponent {...contextValues}>
        <Tab label={label} value={value} />
      </TabContextComponent>,
    )

    expect(wrapper.find('button').props()).toEqual<ButtonHTMLAttributes<HTMLButtonElement>>({
      className: styles.tab,
      role: 'tab',
      id: getTabId(testId, value.toString()),
      'aria-controls': getPanelId(testId, value.toString()),
      'aria-selected': false,
      tabIndex: -1,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      onClick: expect.anything(),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      onKeyPress: expect.anything(),
      children: label,
    })
  })

  it('renders selected button with correct props', () => {
    const contextValues = {
      value: 0,
      onChange: jest.fn(),
    }

    const label = 'testLabel'
    const value = 0

    const wrapper = mount(
      <TabContextComponent {...contextValues}>
        <Tab label={label} value={value} />
      </TabContextComponent>,
    )

    expect(wrapper.find('button').props()).toEqual<ButtonHTMLAttributes<HTMLButtonElement>>({
      className: cn(styles.tab, styles.selected),
      role: 'tab',
      id: getTabId(testId, value.toString()),
      'aria-controls': getPanelId(testId, value.toString()),
      'aria-selected': true,
      tabIndex: 0,
      children: label,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      onKeyPress: expect.anything(),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      onClick: expect.anything(),
    })
  })

  it('fires onChange with correct parameter on click, Enter press and Space press', () => {
    const onChange = jest.fn()
    const contextValues = {
      value: 0,
      onChange,
    }

    const label = 'testLabel'
    const value = 1

    const wrapper = mount(
      <TabContextComponentControlled {...contextValues}>
        <Tab label={label} value={value} />
      </TabContextComponentControlled>,
    )

    const button = wrapper.find('button')

    expect(button.props()).toEqual<ButtonHTMLAttributes<HTMLButtonElement>>({
      className: styles.tab,
      role: 'tab',
      id: getTabId(testId, value.toString()),
      'aria-controls': getPanelId(testId, value.toString()),
      'aria-selected': false,
      tabIndex: -1,
      children: label,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      onKeyPress: expect.anything(),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      onClick: expect.anything(),
    })

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
    // Parameter is the index value
    expect(onChange).toHaveBeenLastCalledWith(1)

    act(() => {
      button.simulate('keypress', { key: 'Space' })
    })
    wrapper.update()
    expect(onChange).toHaveBeenCalledTimes(3)
    // Parameter is the index value
    expect(onChange).toHaveBeenLastCalledWith(1)

    // Shouldn't do anything if you press anything apart from Enter and Space
    act(() => {
      button.simulate('keypress', { key: 'Esc' })
    })
    wrapper.update()
    expect(onChange).toHaveBeenCalledTimes(3)
    // Parameter is the index value
    expect(onChange).toHaveBeenLastCalledWith(1)
  })
})
