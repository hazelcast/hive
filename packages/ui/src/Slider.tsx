import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import styles from './Slider.module.scss'
import cn from 'classnames'

type SliderPropsCore = {
  step?: number
  min?: number
  max?: number
}

type SliderPropsSingle = {
  value: number
  onChange: (value: number) => void
}

type SliderPropsRange = {
  value: [number, number]
  onChange: (value: [number, number]) => void
}

type SliderProps = SliderPropsCore & (SliderPropsSingle | SliderPropsRange)

function isRangeGuard(value: number | [number, number]): value is [number, number] {
  return Array.isArray(value)
}

export const Slider = ({ value, onChange, step = 1, min = 0, max = 20 }: SliderProps) => {
  const isRange: boolean = isRangeGuard(value)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const didMountRef = useRef(false)

  const [firstValue, setFirstValue] = useState<number>(isRangeGuard(value) ? value[0] : value)
  const [secondValue, setSecondValue] = useState<number>(isRangeGuard(value) ? value[1] : max)

  const firstRef = useRef<HTMLInputElement>(null)
  const secondRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handler = ({ offsetX, target }: MouseEvent) => {
      if (wrapperRef?.current?.offsetWidth && wrapperRef.current === target) {
        const clickPercentage = offsetX / wrapperRef.current.offsetWidth
        const resultStepSpot: number = Math.round((clickPercentage * max) / step) * step

        if (!isRange || Math.abs(firstValue - resultStepSpot) < Math.abs(secondValue - resultStepSpot)) {
          // let's move the first thumb in case we're not in a range more
          // or if it's closed to the click event
          setFirstValue(resultStepSpot)
          firstRef.current?.focus()
        } else {
          // otherwise, let's move the right one
          setSecondValue(resultStepSpot)
          secondRef.current?.focus()
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
      if (isRangeGuard(value)) {
        onChange([firstValue, secondValue])
      } else {
        onChange(firstValue)
      }
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

  return (
    <div className={styles.wrapper} role="group" ref={wrapperRef}>
      <div className={styles.fillPlaceholder}>
        <div
          className={styles.fill}
          // Since there is no easy way hot to pass properties to SCSS, we need to use
          // inline styles.
          style={
            isRange
              ? {
                  width: `${width}%`,
                  marginLeft: `calc(${left * 100}%)`,
                }
              : {
                  width: `calc(${max * left}%)`,
                }
          }
        />
      </div>

      {firstValue !== undefined && (
        <input
          ref={firstRef}
          type="range"
          value={firstValue}
          min={min}
          max={max}
          onChange={setFirstValueFn}
          className={styles.slider}
          step={step}
        />
      )}
      {isRange && secondValue !== undefined && (
        <input
          ref={secondRef}
          type="range"
          value={secondValue}
          min={min}
          max={max}
          onChange={setSecondValueFn}
          step={step}
          className={cn({
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
