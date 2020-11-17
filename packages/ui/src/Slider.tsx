import React, { ChangeEvent, useCallback, useEffect, useRef } from 'react'
import styles from './Slider.module.scss'
import cn from 'classnames'
import { Error, errorId } from './Error'
import { v4 as uuid } from 'uuid'
import { Help } from './Help'

type Value = number | [number, number]

type SliderMark = {
  value: number
  label: string
}

export type SliderCoreProps<T extends Value> = {
  value: T
  name: string
  onChange: (val: T, e?: ChangeEvent<HTMLInputElement> | MouseEvent) => void
  error?: string
}

export type SliderExtraProps = {
  step?: number
  min?: number
  max?: number
  className?: string
  sliderClassName?: string
  helperText?: string
  marks?: Array<SliderMark>
  label: string
}

type SliderProps<T extends Value = number> = SliderExtraProps & SliderCoreProps<T> & Partial<Pick<HTMLInputElement, 'disabled'>>

function isRangeGuard(value: Value): value is [number, number] {
  return Array.isArray(value)
}

/**
 * Determines the absolute left position of the mark given the markValue
 * @param markValue - value of the mark
 * @param max - max value of a slider
 * @param firstValue - current position of the first slider
 * @param secondValue - current position of the second slider, max if not in range mode
 * @param isRange - determines whether we're in a range mode
 * @return {
 *   left: left position of the element in %
 *   isActive: true if marker is in the filled area of the slider
 * }
 */
function getMarkMetadata(
  markValue: number,
  max: number,
  [firstValue, secondValue]: [number, number],
  isRange: boolean,
): { isActive: boolean; left: number } {
  return {
    left: (markValue / max) * 100,
    isActive: isRange ? markValue >= firstValue && markValue <= secondValue : markValue < firstValue,
  }
}

/**
 * Slider component
 * https://www.w3.org/TR/wai-aria-practices-1.2/#slidertwothumb
 */
export function Slider<T extends Value = number>({
  value,
  onChange,
  name,
  step = 1,
  min = 0,
  max = 20,
  className,
  sliderClassName,
  error,
  helperText,
  marks,
  label,
  disabled,
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
    ([changedFirstValue, changedSecondValue]: [number | null, number | null], e: ChangeEvent<HTMLInputElement> | MouseEvent) => {
      if (isRangeGuard(value)) {
        onChange([changedFirstValue ?? firstValue, changedSecondValue ?? secondValue] as T, e)
      } else {
        onChange(changedFirstValue as T, e)
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
    const handler = (e: MouseEvent) => {
      const { offsetX, target } = e
      if (disabled) {
        return false
      }
      if (wrapperRef.current && wrapperRef.current === target) {
        const clickPercentage = offsetX / wrapperRef.current.offsetWidth
        const resultStepSpot: number = Math.round((clickPercentage * max) / step) * step

        // let's move the first thumb in case we're not in a range mode
        // or if it's closer to the clicked value
        if (!isRange || Math.abs(firstValue - resultStepSpot) < Math.abs(secondValue - resultStepSpot)) {
          updateValues([resultStepSpot, null], e)
          firstRef.current?.focus()
        } else {
          // otherwise, let's move the right one
          updateValues([null, resultStepSpot], e)
          secondRef.current?.focus()
        }
      }
    }

    window.addEventListener('click', handler)
    return () => {
      window.removeEventListener('click', handler)
    }
  }, [wrapperRef, firstValue, secondValue, disabled])

  /**
   * The following callbacks reacts to native HTML events and update the values
   */
  const setFirstValueCallback = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value },
      } = e
      if (+value > secondValue) {
        return false
      }
      updateValues([+value, null], e)
    },
    [secondValue],
  )

  const setSecondValueCallback = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value },
      } = e
      if (+value < firstValue) {
        return false
      }
      updateValues([null, +value], e)
    },
    [firstValue],
  )

  const width: number = ((secondValue - firstValue) / max) * 100
  const left: number = firstValue / max

  return (
    <div className={className}>
      <span id={idRef.current}>{label}</span>
      <div
        className={cn(styles.wrapper, {
          [styles.disabled]: disabled,
        })}
      >
        <div className={styles.groupWrapper} role="group" ref={wrapperRef}>
          {firstValue !== undefined && (
            <input
              ref={firstRef}
              type="range"
              value={firstValue}
              min={min}
              max={max}
              name={name}
              disabled={disabled}
              onChange={setFirstValueCallback}
              className={sliderClassName}
              step={step}
              aria-labelledby={idRef.current}
              aria-valuenow={firstValue}
              aria-valuemin={min}
              aria-valuemax={Math.min(max, secondValue)}
              aria-invalid={!!error}
              aria-errormessage={error && errorId(idRef.current)}
            />
          )}

          {isRange && secondValue !== undefined && (
            <input
              ref={secondRef}
              type="range"
              value={secondValue}
              min={min}
              max={max}
              name={name}
              disabled={disabled}
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
              aria-labelledby={idRef.current}
              aria-valuenow={secondValue}
              aria-valuemin={Math.max(min, firstValue)}
              aria-valuemax={max}
              aria-invalid={!!error}
              aria-errormessage={error && errorId(idRef.current)}
            />
          )}
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
            {!!marks?.length && (
              <ul className={styles.marks}>
                {marks.map(({ value: markValue }) => {
                  const { isActive, left } = getMarkMetadata(markValue, max, [firstValue, secondValue], isRange)
                  return (
                    <li
                      key={markValue}
                      style={{ left: `${left}%` }}
                      className={cn({
                        [styles.active]: isActive,
                      })}
                    />
                  )
                })}
              </ul>
            )}
          </div>
          {!!marks?.length && (
            <ul className={styles.markDescriptions}>
              {marks.map(({ label, value: markValue }) => {
                const { left } = getMarkMetadata(markValue, max, [firstValue, secondValue], isRange)
                return (
                  <li key={markValue} style={{ left: `${left}%` }}>
                    {label}
                  </li>
                )
              })}
            </ul>
          )}
          {helperText && <Help parentId={idRef.current} helperText={helperText} className={styles.helperText} />}
        </div>
      </div>
      <Error error={error} className={styles.errorContainer} inputId={idRef.current} />
    </div>
  )
}
