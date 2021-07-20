import React from 'react'
import cn from 'classnames'
import { RadioGroup } from '@headlessui/react'

import styles from './SegmentedControl.module.scss'

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
}

export const SegmentedControl = <V extends string = string>({
  label,
  value,
  onChange,
  options,
  size = 'medium',
  className,
  optionClassName,
  labelClassName,
}: SegmentedControlProps<V>) => (
  <RadioGroup className={cn(styles.group, { [styles.small]: size === 'small' }, className)} value={value} onChange={onChange}>
    <RadioGroup.Label className={styles.groupLabel}>{label}</RadioGroup.Label>
    {options.map((option) => (
      <RadioGroup.Option
        key={option.value}
        value={option.value}
        className={({ checked }) => cn(styles.option, { [styles.checked]: checked }, optionClassName)}
      >
        <RadioGroup.Label className={cn(styles.label, labelClassName)}>{option.label}</RadioGroup.Label>
      </RadioGroup.Option>
    ))}
  </RadioGroup>
)
