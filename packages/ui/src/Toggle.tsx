import React, { FC, FocusEvent, ChangeEvent, useRef } from 'react'
import cn from 'classnames'
import { Error, errorId } from './Error'
import { Help, helpTooltipId } from './Help'
import { useUID } from 'react-uid'
import { DataTestProp } from '@hazelcast/helpers'
import styles from './Toggle.module.scss'

export type ToggleCoreProps = {
  name: string
  value?: string
  checked?: boolean
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  error?: string

  label: string | React.ReactNode
  helperText?: string
  disabled?: boolean
  className?: string
  classNameLabel?: string
}

export type ToggleProps = ToggleCoreProps & DataTestProp

export const Toggle: FC<ToggleProps> = ({
  name,
  value,
  onChange,
  onBlur,
  error,
  checked,
  label,
  helperText,
  disabled,
  className,
  classNameLabel,
  'data-test': dataTest,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const id = useUID()

  return (
    <div className={cn(styles.wrapper, className)} data-test={dataTest}>
      <input
        type="checkbox"
        ref={inputRef}
        id={id}
        name={name}
        checked={!!checked}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        disabled={disabled}
        aria-checked={checked}
        aria-invalid={!!error}
        aria-describedby={helperText && helpTooltipId(id)}
        aria-errormessage={error && errorId(id)}
      />

      <label className={cn(classNameLabel, {[styles.disabled]: disabled})} htmlFor={id}>
        <span className={cn(styles.labelText)}>{label}</span>
        <span className={cn(styles['toggle-track'])}></span>
      </label>

      {helperText && <Help parentId={id} helperText={helperText} />}

      {/* xxx inline-flex */}
      <div>
        <Error error={error} className={styles.errorContainer} inputId={id} />
      </div>
    </div>
  )
}
