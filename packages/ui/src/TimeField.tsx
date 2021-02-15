import React, { ChangeEvent, FC, InputHTMLAttributes, useCallback, useState } from 'react'
import cn from 'classnames'

import { DataTestProp } from '@hazelcast/helpers'

import styles from './TimeField.module.scss'

export type TypeFieldProps = {
  inputClassName?: string
  seconds?: boolean
} & InputHTMLAttributes<HTMLInputElement> &
  DataTestProp

export const TimeField: FC<TypeFieldProps> = ({ className, 'data-test': dataTest, seconds = false, inputClassName, ...props }) => {
  const [value, setValue] = useState<string | undefined>()

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])

  return (
    <div data-test={dataTest} className={cn(styles.container, className)}>
      <div className={styles.inputContainer}>
        <input
          className={cn(styles.input, inputClassName)}
          type="time"
          step={seconds ? '1' : undefined}
          {...props}
          onChange={onChange}
          value={value}
        />
        <div className={styles.borderOverlay} />
      </div>
    </div>
  )
}
