import React from 'react'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'

import { CircularProgressBar, innerStrokeWidth, outerStrokeWidth, size } from '../src/CircularProgressBar'

import styles from '../src/CircularProgressBar.module.scss'

describe('CircularProgressBar', () => {
  it('Renders elements with correct props', async () => {
    const progress = 30
    const rotate = 90
    const cut = 60
    const center = size / 2
    const radius = size / 2 - outerStrokeWidth / 2
    const circumference = 2 * Math.PI * radius
    const strokeLength = (circumference / 360) * (360 - cut)
    const progressDashoffset = (strokeLength / 100) * (100 - progress)

    const wrapper = await mountAndCheckA11Y(
      <CircularProgressBar progress={progress} rotate={rotate} cut={cut} initialAnimation text={`${progress}%`} />,
    )

    const container = wrapper.findDataTest('cpb-container')
    const svg = container.findDataTest('cpb-svg')
    const backgroundOuterCircle = svg.findDataTest('cpb-background-outer-circle')
    const backgroundInnerCircle = svg.findDataTest('cpb-background-inner-circle')
    const progressCircle = svg.findDataTest('cpb-progress-circle')
    const text = container.findDataTest('cpb-text')

    expect(container.props()).toEqual({
      'data-test': 'cpb-container',
      className: styles.container,
      style: {
        width: size,
        height: size,
      },
      children: expect.anything(),
    })
    expect(svg.props()).toEqual({
      'data-test': 'cpb-svg',
      width: size,
      height: size,
      style: {
        transform: `rotate(${rotate}deg)`,
      },
      children: expect.anything(),
    })
    expect(backgroundOuterCircle.props()).toEqual({
      'data-test': 'cpb-background-outer-circle',
      className: styles.backgroundOuterCircle,
      cx: center,
      cy: center,
      r: radius,
      strokeWidth: outerStrokeWidth,
      strokeDasharray: strokeLength,
    })
    expect(backgroundInnerCircle.props()).toEqual({
      'data-test': 'cpb-background-inner-circle',
      className: styles.backgroundInnerCircle,
      cx: center,
      cy: center,
      r: radius,
      strokeWidth: innerStrokeWidth,
      strokeDasharray: strokeLength,
    })
    expect(progressCircle.props()).toEqual({
      'data-test': 'cpb-progress-circle',
      className: styles.progressCircle,
      cx: center,
      cy: center,
      r: radius,
      strokeWidth: outerStrokeWidth,
      strokeDasharray: `${strokeLength}, ${circumference}`,
      strokeDashoffset: progressDashoffset,
    })
    expect(text.props()).toEqual({
      'data-test': 'cpb-text',
      className: styles.indicator,
      children: `${progress}%`,
    })
  })

  it('Renders elements with correct default props', async () => {
    const progress = 30
    const center = size / 2
    const radius = size / 2 - outerStrokeWidth / 2
    const circumference = 2 * Math.PI * radius
    const strokeLength = (circumference / 360) * 360
    const progressDashoffset = (strokeLength / 100) * (100 - progress)
    const wrapper = await mountAndCheckA11Y(<CircularProgressBar progress={progress} text={`${progress}%`} />)

    const container = wrapper.findDataTest('cpb-container')
    const svg = container.findDataTest('cpb-svg')
    const backgroundOuterCircle = svg.findDataTest('cpb-background-outer-circle')
    const backgroundInnerCircle = svg.findDataTest('cpb-background-inner-circle')
    const progressCircle = svg.findDataTest('cpb-progress-circle')
    const text = container.findDataTest('cpb-text')

    expect(container.props()).toEqual({
      'data-test': 'cpb-container',
      className: styles.container,
      style: {
        width: size,
        height: size,
      },
      children: expect.anything(),
    })
    expect(svg.props()).toEqual({
      'data-test': 'cpb-svg',
      width: size,
      height: size,
      style: {
        transform: 'rotate(0deg)',
      },
      children: expect.anything(),
    })
    expect(backgroundOuterCircle.props()).toEqual({
      'data-test': 'cpb-background-outer-circle',
      className: styles.backgroundOuterCircle,
      cx: center,
      cy: center,
      r: radius,
      strokeWidth: outerStrokeWidth,
      strokeDasharray: strokeLength,
    })
    expect(backgroundInnerCircle.props()).toEqual({
      'data-test': 'cpb-background-inner-circle',
      className: styles.backgroundInnerCircle,
      cx: center,
      cy: center,
      r: radius,
      strokeWidth: innerStrokeWidth,
      strokeDasharray: strokeLength,
    })
    expect(progressCircle.props()).toEqual({
      'data-test': 'cpb-progress-circle',
      className: styles.progressCircle,
      cx: center,
      cy: center,
      r: radius,
      strokeWidth: outerStrokeWidth,
      strokeDasharray: `${strokeLength}, ${circumference}`,
      strokeDashoffset: progressDashoffset,
    })
    expect(text.props()).toEqual({
      'data-test': 'cpb-text',
      className: styles.indicator,
      children: `${progress}%`,
    })
  })
})
