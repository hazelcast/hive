import React, { ChangeEvent, useCallback, useEffect, useRef } from 'react'
import styles from './Slider.module.scss'
import cn from 'classnames'
import { Error } from './Error'
import { v4 as uuid } from 'uuid'
import { Help } from './Help'

type Value = number | [number, number]

type SliderProps<T> = {
  step?: number
  min?: number
  max?: number
  value: T
  onChange: (val: T) => void
  className?: string
  sliderClassName?: string
  error?: string
  helperText?: string
}

function isRangeGuard(value: Value): value is [number, number] {
  return Array.isArray(value)
}

export function Slider<T extends Value = number>({
  value,
  onChange,
  step = 1,
  min = 0,
  max = 20,
  className,
  sliderClassName,
  error,
  helperText,
}: SliderProps<T>) {
  const idRef = useRef(uuid())

  // Slider operates in two modes, either we have a single value slider or range value slider
  const isRange: boolean = isRangeGuard(value)
  // wrapper ref is used to catch clicks on a track in order to move the closes thumb to the position
  const wrapperRef = useRef<HTMLDivElement>(null)

  const [firstValue, secondValue]: [number, number] = isRangeGuard(value) ? value : [value as number, max]

  const firstRef = useRef<HTMLInputElement>(null)
  const secondRef = useRef<HTMLInputElement>(null)

  const updateValues = useCallback(
    ([changedFirstValue, changedSecondValue]: [number | null, number | null]) => {
      if (isRange) {
        onChange([changedFirstValue ?? firstValue, changedSecondValue ?? secondValue] as T)
      } else {
        onChange(changedFirstValue as T)
      }
    },
    [isRange, firstValue, secondValue],
  )

  /**
   * The following code makes sure that the relevant thumb is moved to the position once
   * user clicks on a track.
   *
   * 1. We always move the first thumb in a non-range mode.
   * 2. Otherwise, we move the thumb that is closed to a click event.
   * 3. We focus the thumb after it is clicked.
   */
  useEffect(() => {
    const handler = ({ offsetX, target }: MouseEvent) => {
      if (wrapperRef.current && wrapperRef.current === target) {
        const clickPercentage = offsetX / wrapperRef.current.offsetWidth
        const resultStepSpot: number = Math.round((clickPercentage * max) / step) * step

        // let's move the first thumb in case we're not in a range mode
        // or if it's closer to the clicked value
        if (!isRange || Math.abs(firstValue - resultStepSpot) < Math.abs(secondValue - resultStepSpot)) {
          updateValues([resultStepSpot, null])
          firstRef.current?.focus()
        } else {
          // otherwise, let's move the right one
          updateValues([null, resultStepSpot])
          secondRef.current?.focus()
        }
      }
    }

    window.addEventListener('click', handler)
    return () => {
      window.removeEventListener('click', handler)
    }
  }, [wrapperRef, firstValue, secondValue])

  /**
   * The following callbacks reacts to native HTML events and update the values
   */
  const setFirstValueCallback = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      if (+value > secondValue) {
        return false
      }
      updateValues([+value, null])
    },
    [secondValue],
  )

  const setSecondValueCallback = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      if (+value < firstValue) {
        return false
      }
      updateValues([null, +value])
    },
    [firstValue],
  )

  const width: number = ((secondValue - firstValue) / max) * 100
  const left: number = firstValue / max

  return (
    <div className={className}>
      <div className={styles.wrapper}>
        <div className={styles.groupWrapper} role="group" ref={wrapperRef}>
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
              onChange={setFirstValueCallback}
              className={sliderClassName}
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
              onChange={setSecondValueCallback}
              step={step}
              className={cn({
                sliderClassName,
                // The second thumb is above the first thumb in DOM.
                // There is a corner case where both thumbs are above each other at the end
                // of the range. In that case we need to pass pointer-events to the first thumb
                // because that is the only one that can be moved.
                [styles.atTheBorder]: max === secondValue && secondValue === firstValue,
              })}
            />
          )}
        </div>
        {helperText && <Help parentId={idRef.current} helperText={helperText} className={styles.helperText} />}
      </div>
      <Error error={error} className={styles.errorContainer} inputId={idRef.current} />
    </div>
  )
}
