import React, { FC } from 'react'
import cn from 'classnames'
import { RadioGroup } from '@headlessui/react'

import styles from './SegmentedControl.module.scss'

export type SegmentedControlOption = {
  value: string
  label: string
}

export type SegmentedControlProps = {
  value: string
  onChange: (value: string) => void
  label: string
  options: SegmentedControlOption[]
  className?: string
  optionClassName?: string
  labelClassName?: string
}

export const SegmentedControl: FC<SegmentedControlProps> = ({
  label,
  value,
  onChange,
  options,
  className,
  optionClassName,
  labelClassName,
}) => (
  <RadioGroup className={cn(styles.group, className)} value={value} onChange={onChange}>
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
