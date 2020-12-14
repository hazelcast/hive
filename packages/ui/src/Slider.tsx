import React, { ChangeEvent, useCallback, useMemo, useRef } from 'react'
import { DataTestProp } from '@hazelcast/helpers'
import useEvent from 'react-use/lib/useEvent'
import cn from 'classnames'
import { useUID } from 'react-uid'

import { Error, errorId } from './Error'
import { Help } from './Help'

import styles from './Slider.module.scss'
import { Label } from './Label'

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

export type SliderCoreProps<T> = {
  value: T
  onChange: T extends number ? SingleValueChangeFn : MultiValueChangeFn
  name: string
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
  formatCurrentValue?: (val: number) => string
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
 * @param min - min value of a slider
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
  min: number,
  max: number,
  [firstValue, secondValue]: [number, number],
  isRange: boolean,
): { isActive: boolean; left: number } {
  return {
    left: ((markValue - min) / (max - min)) * 100,
    isActive: isRange ? markValue >= firstValue && markValue <= secondValue : markValue < firstValue,
  }
}

/**
 * Slider component
 * https://www.w3.org/TR/wai-aria-practices-1.2/#slidertwothumb
 *
 * Slider component is a component that let users choose a single value or a range within a defined scope (min <> max).
 * If you provide [number, number] type as a value, the component will behave as a component that let's you choose
 * range of values. Typescript guards you to provide corresponding onChange handler that corresponds to the value type.
 *
 * You can optionally pass formatCurrentValue in order to modify the way how current value is displayed.
 * When providing a single value, it behaves
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
  formatCurrentValue = (x) => x.toString(),
  'data-test': dataTest,
}: SliderProps<T>) {
  /**
   * Implementation notes
   *
   * - div - wrapper div that holds label + actual slider + error component
   *  - label - visible label
   *  - wrapper
   *    ----------------------------------------------------------------------
   *    | Inner wrapper                                     |                |
   *    |  - markDescriptions                               |                |
   *    |  - input wrapper                                  | Help component |
   *    |  - current value indicator                        |                |
   *    ----------------------------------------------------------------------
   *
   *    where
   *    - input container contains
   *      - input or inputs in a range mode
   *      - fillPlaceholder - background of the possible slider area
   *      - fill - actual fill (active range)
   *      - marks
   *
   *  - error - error component
   */
  const id = useUID()

  // Slider operates in two modes, either we have a single value slider or range value slider
  const isRange: boolean = isRangeGuard(value)
  const [firstValue, secondValue]: [number, number] = isRange ? (value as [number, number]) : [value as number, Infinity]

  // wrapper ref is used to catch clicks on a track in order to move the closes thumb to the position
  const wrapperRef = useRef<HTMLDivElement>(null)
  const firstRangeInputRef = useRef<HTMLInputElement>(null)
  const secondRangeInputRef = useRef<HTMLInputElement>(null)

  const markValues: Set<number> = useMemo(() => new Set(marks?.map(({ value }) => value)), [marks])

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
   * 2. Otherwise, we move the thumb that is closer to a clicked point.
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

  useEvent('click', clickOnTrackHandler)

  /**
   * The following callbacks react to native HTML events and update the values
   */
  const setFirstValueCallback = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value },
      } = e
      const newValue = parseInt(value, 10)
      if (newValue <= secondValue) {
        updateValues([newValue, null], e)
      }
    },
    [secondValue, updateValues],
  )

  const setSecondValueCallback = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value },
      } = e
      const newValue = parseInt(value, 10)
      if (newValue >= firstValue) {
        updateValues([null, newValue], e)
      }
    },
    [firstValue, updateValues],
  )

  const left: number = (firstValue - min) / (max - min)

  const secondValueLeft: number = (secondValue - min) / (max - min)
  const widthInRangeMode: number = ((secondValue - firstValue) / (max - min)) * 100

  return (
    <div className={className} data-test={dataTest}>
      <Label id={id} label={label} />
      <div
        className={cn(styles.wrapper, {
          [styles.disabled]: disabled,
        })}
      >
        <div className={styles.innerWrapper}>
          {/*
          Marks Descriptions
        */}
          {!!marks?.length && (
            <ul className={styles.markDescriptions} data-test="mark-descriptions">
              {marks.map(({ label, value: markValue }) => {
                const { left } = getMarkMetadata(markValue, min, max, [firstValue, secondValue], isRange)
                return (
                  <li
                    key={markValue}
                    style={{ left: `${left}%` }}
                    data-test={`mark-description-${markValue}`}
                    className={cn({ [styles.activeMarkDescription]: [firstValue, secondValue].includes(markValue) })}
                  >
                    {label}
                  </li>
                )
              })}
            </ul>
          )}
          <div className={styles.inputWrapper} role="group" ref={wrapperRef}>
            {firstValue !== undefined && (
              <input
                id={id}
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
                aria-labelledby={id}
                aria-valuenow={firstValue}
                aria-valuemin={min}
                aria-valuemax={Math.min(max, secondValue)}
                aria-invalid={!!error}
                aria-errormessage={error && errorId(id)}
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
                aria-label={label}
                aria-valuenow={secondValue}
                aria-valuemin={Math.max(min, firstValue)}
                aria-valuemax={max}
                aria-invalid={!!error}
                aria-errormessage={error && errorId(id)}
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
                        width: `${widthInRangeMode}%`,
                        marginLeft: `${left * 100}%`,
                      }
                    : {
                        width: `${max * left}%`,
                      }
                }
              />
              {/* Marks */}
              {!!marks?.length && (
                <ul className={styles.marks} data-test="marks">
                  {marks.map(({ value: markValue }) => {
                    const { isActive, left } = getMarkMetadata(markValue, min, max, [firstValue, secondValue], isRange)
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
          </div>
          <div className={styles.valueIndicators}>
            {!markValues.has(firstValue) && (
              <span
                style={{
                  left: `${left * 100}%`,
                }}
                data-test="slider-first-value-indicator"
              >
                {formatCurrentValue(firstValue)}
              </span>
            )}
            {isRange && !markValues.has(secondValue) && (
              <span
                style={{
                  left: `${secondValueLeft * 100}%`,
                }}
                data-test="slider-second-value-indicator"
              >
                {formatCurrentValue(secondValue)}
              </span>
            )}
          </div>
        </div>
        {helperText && <Help parentId={id} helperText={helperText} className={styles.helperText} />}
      </div>
      <Error error={error} className={styles.errorContainer} inputId={id} />
    </div>
  )
}
