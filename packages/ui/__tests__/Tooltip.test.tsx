import React from 'react'
import { mount } from 'enzyme'
import RCTooltip from 'rc-tooltip'

import { Tooltip, TooltipProps } from '../Tooltip'
import styles from '../Tooltip.module.scss'

describe('Tooltip', () => {
  test('renders children without Tooltip if "overlay" is undefined', () => {
    const Child = () => <div />

    const wrapper = mount(
      <Tooltip overlay={undefined}>
        <Child />
      </Tooltip>,
    )

    expect(wrapper.exists(RCTooltip)).toBeFalsy()
    expect(wrapper.exists(Child)).toBeTruthy()
  })

  test('renders children with Tooltip if "overlay" is defined', () => {
    const Child = () => <div />

    const props: TooltipProps = {
      trigger: ['hover'],
      mouseEnterDelay: 100,
      mouseLeaveDelay: 200,
      overlayStyle: { top: 300 },
      prefixCls: 'testPrefix',
      transitionName: 'testName',
      onVisibleChange: (visible?: boolean) => {},
      afterVisibleChange: (visible?: boolean) => {},
      visible: true,
      defaultVisible: false,
      placement: 'top',
      align: {},
      onPopupAlign: (popupDomNode: Element, align: object) => {},
      overlay: 'testOverlay',
      arrowContent: 'testContent',
      getTooltipContainer: () => document.body,
      destroyTooltipOnHide: true,
      id: 'testId',
    }

    const wrapper = mount(
      <Tooltip {...props} wrapMaxWidth={false}>
        <Child />
      </Tooltip>,
    )

    const expectedProps: TooltipProps = {
      ...props,
      children: <Child />,
      overlayClassName: styles.overlay,
    }

    const tooltip = wrapper.find(RCTooltip)
    expect(tooltip.exists()).toBeTruthy()
    expect(tooltip.props()).toEqual(expectedProps)
    expect(tooltip.exists(Child)).toBeTruthy()
  })
})
