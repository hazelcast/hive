import React, { ChangeEvent, useCallback, useEffect, useRef } from 'react'
import styles from './Slider.module.scss'
import cn from 'classnames'
import { Error, errorId } from './Error'
import { v4 as uuid } from 'uuid'
import { Help } from './Help'
import { DataTestProp } from '@hazelcast/helpers'

// This component accepts one of these values
type Value = number | [number, number]

// Mark that shows hints on a track
type SliderMark = {
  value: number
  label: string
}

// Value can be changed either with a keyboard or by clicking a mouse on a track
type ChangeEventType = ChangeEvent<HTMLInputElement> | MouseEvent

type SingleValueChangeFn = (val: number, e?: ChangeEventType) => void
type MultiValueChangeFn = (val: [number, number], e?: ChangeEventType) => void

export type SliderCoreProps<T extends Value> = {
  value: T
  name: string
  onChange: T extends number ? SingleValueChangeFn : MultiValueChangeFn
  error?: string
}

export type SliderExtraProps = {
  step?: number
  min: number
  max: number
  className?: string
  sliderClassName?: string
  helperText?: string
  marks?: Array<SliderMark>
  label: string
}

type SliderProps<T extends Value = number> = SliderExtraProps &
  SliderCoreProps<T> &
  Partial<Pick<HTMLInputElement, 'disabled'>> &
  DataTestProp

function isRangeGuard(value: Value, onChange?: SingleValueChangeFn | MultiValueChangeFn): onChange is MultiValueChangeFn {
  return Array.isArray(value)
}

function isSingleValueGuard(value: Value, onChange?: SingleValueChangeFn | MultiValueChangeFn): onChange is SingleValueChangeFn {
  return !Array.isArray(value)
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
export function getMarkMetadata(
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
  min,
  max,
  className,
  sliderClassName,
  error,
  helperText,
  marks,
  label,
  disabled,
  'data-test': dataTest,
}: SliderProps<T>) {
  /**
   * Implementation notes
   *
   * - div - wrapper div that holds label + actual slider + error component
   *  - label - visible label
   *  - slider - CSS grid 2x2
   *    ----------------------------------------------------------------------
   *    | Mark descriptions                                 |                |
   *    ----------------------------------------------------------------------
   *    | input[range], input[range]2 (in range mode), fill | Help component |
   *    ----------------------------------------------------------------------
   *    where
   *    fill
   *      - fillPlaceholder - background of the possible slider area
   *      - fill - actual fill (active range)
   *      - marks
   *  - error - error component
   */
  const idRef = useRef(uuid())

  // Slider operates in two modes, either we have a single value slider or range value slider
  const isRange: boolean = isRangeGuard(value)
  const [firstValue, secondValue]: [number, number] = isRange ? (value as [number, number]) : [value as number, max]

  // wrapper ref is used to catch clicks on a track in order to move the closes thumb to the position
  const wrapperRef = useRef<HTMLDivElement>(null)
  const firstRangeInputRef = useRef<HTMLInputElement>(null)
  const secondRangeInputRef = useRef<HTMLInputElement>(null)

  /**
   * We use this callback to update value either as number or [number, number] based on a rangeGuard
   * We also send an event that triggered the change
   */
  const updateValues = useCallback(
    ([changedFirstValue, changedSecondValue]: [number | null, number | null], e: ChangeEvent<HTMLInputElement> | MouseEvent) => {
      if (isRangeGuard(value, onChange)) {
        onChange([changedFirstValue ?? firstValue, changedSecondValue ?? secondValue], e)
      }
      if (changedFirstValue !== null && isSingleValueGuard(value, onChange)) {
        onChange(changedFirstValue, e)
      }
    },
    [firstValue, secondValue, onChange, value],
  )

  /**
   * The following code makes sure that the relevant thumb is moved to the position once
   * user clicks on a track.
   *
   * 1. We always move the first thumb in a non-range mode.
   * 2. Otherwise, we move the thumb that is closed to a click event.
   * 3. We focus the thumb after it is clicked.
   */
  const clickOnTrackHandler = useCallback(
    (e: MouseEvent) => {
      const { offsetX, target } = e
      if (disabled) {
        return false
      }
      if (!wrapperRef.current || wrapperRef.current !== target) {
        return
      }
      const clickPercentage = offsetX / wrapperRef.current.offsetWidth
      const resultStepSpot: number = Math.round((clickPercentage * max) / step) * step
      if (!isRange || Math.abs(firstValue - resultStepSpot) < Math.abs(secondValue - resultStepSpot)) {
        updateValues([resultStepSpot, null], e)
        firstRangeInputRef.current?.focus()
      } else {
        // otherwise, let's move the right one
        updateValues([null, resultStepSpot], e)
        secondRangeInputRef.current?.focus()
      }
    },
    [wrapperRef, firstValue, secondValue, disabled, isRange, max, step, updateValues],
  )

  useEffect(() => {
    window.addEventListener('click', clickOnTrackHandler)
    return () => {
      window.removeEventListener('click', clickOnTrackHandler)
    }
  }, [clickOnTrackHandler])

  /**
   * The following callbacks reacts to native HTML events and update the values
   */
  const setFirstValueCallback = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value },
      } = e
      const newValue = parseInt(value, 10)
      if (newValue > secondValue) {
        return false
      }
      updateValues([newValue, null], e)
    },
    [secondValue, updateValues],
  )

  const setSecondValueCallback = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value },
      } = e
      const newValue = parseInt(value, 10)
      if (newValue < firstValue) {
        return false
      }
      updateValues([null, newValue], e)
    },
    [firstValue, updateValues],
  )

  const width: number = ((secondValue - firstValue) / max) * 100
  const left: number = firstValue / max

  return (
    <div className={className} data-test={dataTest}>
      <label id={idRef.current} className={styles.label}>
        {label}
      </label>
      <div
        className={cn(styles.wrapper, {
          [styles.disabled]: disabled,
        })}
        role="group"
        ref={wrapperRef}
      >
        {firstValue !== undefined && (
          <input
            ref={firstRangeInputRef}
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
            ref={secondRangeInputRef}
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
            data-test="fill"
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
          {/*
            Markers
           */}
          {!!marks?.length && (
            <ul className={styles.marks} data-test="marks">
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
        {/*
          Marks Descriptions
        */}
        {!!marks?.length && (
          <ul className={styles.markDescriptions} data-test="mark-descriptions">
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
      <Error error={error} className={styles.errorContainer} inputId={idRef.current} />
    </div>
  )
}
