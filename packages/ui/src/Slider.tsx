import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import styles from './Slider.module.scss'
import classNames from 'classnames'

type Value = number | [number, number]

type SliderProps = {
  value: Value
  step?: number
  onChange: (value: Value) => void
  min?: number
  max?: number
}

export const Slider = ({ value, onChange, step = 1, min = 0, max = 20 }: SliderProps) => {
  const isRange: boolean = Array.isArray(value)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const didMountRef = useRef(false)

  const [firstValue, setFirstValue] = useState<number>(min)
  const [secondValue, setSecondValue] = useState<number>(max)

  useEffect(() => {
    const handler = ({ offsetX, target }: MouseEvent) => {
      if (wrapperRef?.current?.offsetWidth && wrapperRef.current === target) {
        const clickPercentage = offsetX / wrapperRef.current.offsetWidth
        const resultStepSpot: number = Math.round((clickPercentage * max) / step) * step

        if (Math.abs(firstValue - resultStepSpot) < Math.abs(secondValue - resultStepSpot)) {
          // let's move first value because it's closed
          setFirstValue(resultStepSpot)
        } else {
          // otherwise, let's move the right one
          setSecondValue(resultStepSpot)
        }
      }
    }

    window.addEventListener('click', handler)
    return () => {
      window.removeEventListener('click', handler)
    }
  }, [wrapperRef, firstValue, secondValue])

  useEffect(() => {
    if (didMountRef.current) {
      onChange(isRange ? [firstValue, secondValue] : firstValue)
    } else {
      // let's ignore the first render
      didMountRef.current = true
    }
  }, [firstValue, secondValue])

  const setFirstValueFn = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value },
      } = e

      if (+value > secondValue) {
        return false
      }
      setFirstValue(+value)
    },
    [secondValue],
  )

  const setSecondValueFn = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value },
      } = e

      if (+value < firstValue) {
        return false
      }
      setSecondValue(+value)
    },
    [firstValue],
  )

  const width = ((secondValue - firstValue) / max) * 100
  const left = firstValue / max
  const right = secondValue / max

  return (
    <div className={styles.wrapper} role="group" ref={wrapperRef}>
      <div
        className={styles.fill}
        // Since there is no easy way hot to pass properties to SCSS, we need to use
        // inline styles.
        style={{
          width: `calc(${width}% + 3rem*${left} - 3rem*${right})`,
          marginLeft: `calc(${left * 100}% + 1.5rem - 3rem*${left})`,
        }}
      ></div>
      {firstValue !== undefined && (
        <input type="range" value={firstValue} min={min} max={max} onChange={setFirstValueFn} className={styles.slider} step={step} />
      )}
      {secondValue !== undefined && (
        <input
          type="range"
          value={secondValue}
          min={min}
          max={max}
          onChange={setSecondValueFn}
          step={step}
          className={classNames({
            // The second thumb is above the first thumb in DOM.
            // There is a corner case where both thumbs are above each other at the end
            // of the range. In that case we need to pass pointer-events to the first thumb
            // because that is the only one that can be moved.
            [styles.atTheBorder]: max === secondValue && secondValue === firstValue,
          })}
        />
      )}
    </div>
  )
}
