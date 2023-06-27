import React from 'react'
import cn from 'classnames'
import { RadioGroup } from '@headlessui/react'

import styles from './SegmentedControl.module.scss'
import { DataTestProp } from '@hazelcast/helpers'

export type SegmentedControlOption<V> = {
  value: V
  label: string
}

export type SegmentedControlSize = 'medium' | 'small'

export type SegmentedControlProps<V> = {
  value: V
  onChange: (value: V) => void
  label: string
  options: SegmentedControlOption<V>[]
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
  size = 'medium',
  className,
  optionClassName,
  labelClassName,
  'data-test': dataTest = 'segmented',
}: SegmentedControlProps<V>) => (
  <RadioGroup
    data-test={dataTest}
    className={cn(styles.group, { [styles.small]: size === 'small' }, className)}
    value={value}
    onChange={onChange}
  >
    <RadioGroup.Label data-test={`${dataTest}-label`} className={styles.groupLabel}>
      {label}
    </RadioGroup.Label>
    {options.map((option) => (
      <RadioGroup.Option
        data-test={`${dataTest}-${value}`}
        key={option.value}
        value={option.value}
        className={({ checked }) => cn(styles.option, { [styles.checked]: checked }, optionClassName)}
      >
        <RadioGroup.Label data-test={`${dataTest}-${value}-label`} className={cn(styles.label, labelClassName)}>
          {option.label}
        </RadioGroup.Label>
      </RadioGroup.Option>
    ))}
  </RadioGroup>
)
