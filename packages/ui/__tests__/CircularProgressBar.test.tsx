import React from 'react'
import { renderAndCheckA11Y } from '@hazelcast/test-helpers'
import { screen, within } from '@testing-library/react'

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

    await renderAndCheckA11Y(<CircularProgressBar progress={progress} rotate={rotate} cut={cut} initialAnimation text={`${progress}%`} />)

    const container = screen.getByTestId('cpb-container')
    const svg = within(container).getByTestId('cpb-svg')
    const backgroundOuterCircle = within(svg).getByTestId('cpb-background-outer-circle')
    const backgroundInnerCircle = within(svg).getByTestId('cpb-background-inner-circle')
    const progressCircle = within(svg).getByTestId('cpb-progress-circle')
    const text = within(container).getByTestId('cpb-text')

    expect(container).toHaveClass(styles.container)
    expect(container).toHaveStyle(`width: ${size}px; height: ${size}px;`)

    expect(svg).toHaveAttribute('width', String(size))
    expect(svg).toHaveAttribute('height', String(size))
    expect(svg).toHaveStyle(`transform: rotate(${rotate}deg)`)

    expect(backgroundOuterCircle).toHaveClass(styles.backgroundOuterCircle)
    expect(backgroundOuterCircle).toHaveAttribute('cx', center.toString())
    expect(backgroundOuterCircle).toHaveAttribute('cy', center.toString())
    expect(backgroundOuterCircle).toHaveAttribute('r', radius.toString())
    expect(backgroundOuterCircle).toHaveAttribute('stroke-width', outerStrokeWidth.toString())
    expect(backgroundOuterCircle).toHaveAttribute('stroke-dasharray', strokeLength.toString())

    expect(backgroundInnerCircle).toHaveClass(styles.backgroundInnerCircle)
    expect(backgroundInnerCircle).toHaveAttribute('cx', center.toString())
    expect(backgroundInnerCircle).toHaveAttribute('cy', center.toString())
    expect(backgroundInnerCircle).toHaveAttribute('r', radius.toString())
    expect(backgroundInnerCircle).toHaveAttribute('stroke-width', innerStrokeWidth.toString())
    expect(backgroundInnerCircle).toHaveAttribute('stroke-dasharray', strokeLength.toString())

    expect(progressCircle).toHaveClass(styles.progressCircle)
    expect(progressCircle).toHaveAttribute('cx', center.toString())
    expect(progressCircle).toHaveAttribute('cy', center.toString())
    expect(progressCircle).toHaveAttribute('r', radius.toString())
    expect(progressCircle).toHaveAttribute('stroke-width', outerStrokeWidth.toString())
    expect(progressCircle).toHaveAttribute('stroke-dashoffset', progressDashoffset.toString())
    expect(progressCircle).toHaveAttribute('stroke-dasharray', `${strokeLength}, ${circumference}`)

    expect(text).toHaveTextContent(`${progress}%`)
    expect(text).toHaveClass(styles.indicator)
  })

  it('Renders elements with correct default props', async () => {
    const progress = 30
    const center = size / 2
    const radius = size / 2 - outerStrokeWidth / 2
    const circumference = 2 * Math.PI * radius
    const strokeLength = (circumference / 360) * 360
    const progressDashoffset = (strokeLength / 100) * (100 - progress)
    await renderAndCheckA11Y(<CircularProgressBar progress={progress} text={`${progress}%`} />)

    const container = screen.getByTestId('cpb-container')
    const svg = within(container).getByTestId('cpb-svg')
    const backgroundOuterCircle = within(svg).getByTestId('cpb-background-outer-circle')
    const backgroundInnerCircle = within(svg).getByTestId('cpb-background-inner-circle')
    const progressCircle = within(svg).getByTestId('cpb-progress-circle')
    const text = within(container).getByTestId('cpb-text')

    expect(container).toHaveClass(styles.container)
    expect(container).toHaveStyle(`width: ${size}px; height: ${size}px;`)

    expect(svg).toHaveAttribute('width', String(size))
    expect(svg).toHaveAttribute('height', String(size))
    expect(svg).toHaveStyle(`transform: rotate(0deg)`)

    expect(backgroundOuterCircle).toHaveClass(styles.backgroundOuterCircle)
    expect(backgroundOuterCircle).toHaveAttribute('cx', center.toString())
    expect(backgroundOuterCircle).toHaveAttribute('cy', center.toString())
    expect(backgroundOuterCircle).toHaveAttribute('r', radius.toString())
    expect(backgroundOuterCircle).toHaveAttribute('stroke-width', outerStrokeWidth.toString())
    expect(backgroundOuterCircle).toHaveAttribute('stroke-dasharray', strokeLength.toString())

    expect(backgroundInnerCircle).toHaveClass(styles.backgroundInnerCircle)
    expect(backgroundInnerCircle).toHaveAttribute('cx', center.toString())
    expect(backgroundInnerCircle).toHaveAttribute('cy', center.toString())
    expect(backgroundInnerCircle).toHaveAttribute('r', radius.toString())
    expect(backgroundInnerCircle).toHaveAttribute('stroke-width', innerStrokeWidth.toString())
    expect(backgroundInnerCircle).toHaveAttribute('stroke-dasharray', strokeLength.toString())

    expect(progressCircle).toHaveClass(styles.progressCircle)
    expect(progressCircle).toHaveAttribute('cx', center.toString())
    expect(progressCircle).toHaveAttribute('cy', center.toString())
    expect(progressCircle).toHaveAttribute('r', radius.toString())
    expect(progressCircle).toHaveAttribute('stroke-width', outerStrokeWidth.toString())
    expect(progressCircle).toHaveAttribute('stroke-dashoffset', progressDashoffset.toString())
    expect(progressCircle).toHaveAttribute('stroke-dasharray', `${strokeLength}, ${circumference}`)

    expect(text).toHaveTextContent(`${progress}%`)
    expect(text).toHaveClass(styles.indicator)
  })
})
