import React, { FC, useState } from 'react'
import useEffectOnce from 'react-use/lib/useEffectOnce'

import styles from './CircularProgressBar.module.scss'

export const size = 132
export const outerStrokeWidth = 6
export const innerStrokeWidth = 4

type CircularProgressBarProps = {
  progress: number
  text: string
  rotate?: number
  cut?: number
  initialAnimation?: boolean
}

export const CircularProgressBar: FC<CircularProgressBarProps> = ({ progress, rotate = 0, cut = 0, initialAnimation = true, text }) => {
  const [animationInitiated, setAnimationInitiated] = useState(false)

  useEffectOnce(() => {
    if (initialAnimation) {
      setAnimationInitiated(true)
    }
  })

  const center = size / 2
  const radius = size / 2 - outerStrokeWidth / 2
  const circumference = 2 * Math.PI * radius

  const progressAfterInitAnimation = initialAnimation && !animationInitiated ? 0 : progress
  const strokeLength = (circumference / 360) * (360 - cut)
  const progressStrokeDasharray = `${strokeLength}, ${circumference}`
  const progressStrokeDashoffset = (strokeLength / 100) * (100 - progressAfterInitAnimation)

  return (
    <div data-test="cpb-container" className={styles.container} style={{ width: size, height: size }}>
      <svg data-test="cpb-svg" width={size} height={size} style={{ transform: `rotate(${rotate}deg)` }}>
        <circle
          data-test="cpb-background-outer-circle"
          className={styles.backgroundOuterCircle}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={outerStrokeWidth}
          strokeDasharray={strokeLength}
        />
        <circle
          data-test="cpb-background-inner-circle"
          className={styles.backgroundInnerCircle}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={innerStrokeWidth}
          strokeDasharray={strokeLength}
        />
        <circle
          data-test="cpb-progress-circle"
          className={styles.progressCircle}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={outerStrokeWidth}
          strokeDasharray={progressStrokeDasharray}
          strokeDashoffset={progressStrokeDashoffset}
        />
      </svg>
      <div data-test="cpb-text" className={styles.indicator}>
        {text}
      </div>
    </div>
  )
}
