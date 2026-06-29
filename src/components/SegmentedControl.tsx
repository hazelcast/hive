import React from 'react'
import cn from 'classnames'
import { RadioGroup } from '@headlessui/react'

import { DataTestProp } from '../helpers/types'

import styles from './SegmentedControl.module.scss'

export type SegmentedControlOption<V> = {
  value: V
  label: string
}

export type SegmentedControlSize = 'small' | 'medium' | 'regular'

export type SegmentedControlProps<V> = {
  value: V
  onChange: (value: V) => void
  label?: string
  options: SegmentedControlOption<V>[]
  /** @deprecated Size is deprecated in v4 and ignored. SegmentedControl always renders in regular (former small) size. */
  size?: SegmentedControlSize
  className?: string
  optionClassName?: string
  labelClassName?: string
} & DataTestProp

export const SegmentedControl = <V extends string = string>({
  label,
  value,
  onChange,
  options,
  size = 'regular',
  className,
  optionClassName,
  labelClassName,
  'data-test': dataTest = 'segmented',
}: SegmentedControlProps<V>) => {
  const resolvedSize: SegmentedControlSize = size === 'small' || size === 'medium' ? 'regular' : 'regular'

  return (
    <RadioGroup
      data-test={dataTest}
      className={cn(styles.group, { [styles.small]: resolvedSize === 'regular' }, className)}
      value={value}
      onChange={onChange}
    >
      {label && (
        <RadioGroup.Label data-test={`${dataTest}-label`} className={styles.groupLabel}>
          {label}
        </RadioGroup.Label>
      )}
      {options.map((option) => (
        <RadioGroup.Option
          data-test={`${dataTest}-${option.value}`}
          key={option.value}
          value={option.value}
          className={({ checked }) => cn(styles.option, { [styles.checked]: checked }, optionClassName)}
        >
          <RadioGroup.Label data-test={`${dataTest}-${option.value}-label`} className={cn(styles.label, labelClassName)}>
            {option.label}
          </RadioGroup.Label>
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  )
}
