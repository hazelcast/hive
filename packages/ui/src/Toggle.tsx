import React, { FC, ReactElement, FocusEvent, ChangeEvent, AriaAttributes, useRef } from 'react'
import cn from 'classnames'
import { v4 as uuid } from 'uuid'
import { DataTestProp } from '@hazelcast/helpers'
import styles from './Toggle.module.scss'

export type ToggleCoreProps = {
  name: string
  checked: boolean
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  label: string | ReactElement
  error?: string
  touched?: boolean,

  // xxx
  className?: string
}

export type ToggleProps = ToggleCoreProps & DataTestProp

export const Toggle: FC<ToggleProps> = ({
  name,
  checked,
  onChange,
  onBlur,
  label,
  error,
  touched,
  className,
  'data-test': dataTest,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const idRef = useRef(uuid())

  let ariaChecked: AriaAttributes['aria-checked'] = checked ? 'true' : 'false'

  return (
    <div className={cn(styles.wrapper, className)} data-test={dataTest}>
      <input
        type="checkbox"
        ref={inputRef}
        id={idRef.current}
        name={name}
        checked={!!checked}
        onChange={onChange}
        onBlur={onBlur}
        // value={value} xxx
        // disabled={disabled}
        aria-checked={ariaChecked}
        // aria-invalid={!!error}
        // aria-required={required}
        // aria-describedby={helperText && helpTooltipId(idRef.current)}
        // aria-errormessage={error && errorId(idRef.current)}
      />

      <label htmlFor={idRef.current}>
        <span className={cn(styles.label)}>{label}</span>
        <span className={cn(styles['toggle-track'])}></span>
      </label>
    </div>
  )
}
