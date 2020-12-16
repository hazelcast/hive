import React, { FC, FocusEvent, ChangeEvent } from 'react'
import cn from 'classnames'
import { Error, errorId } from './Error'
import { Help, helpTooltipId } from './Help'
import { useUID } from 'react-uid'
import { DataTestProp } from '@hazelcast/helpers'
import styles from './Toggle.module.scss'

type ToggleCoreProps = {
  name: string
  value?: string
  checked?: boolean
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  error?: string
}

export type ToggleExtraProps = {
  label: string | React.ReactNode
  helperText?: string
  disabled?: boolean
  className?: string
  classNameLabel?: string
}

type ToggleProps = ToggleCoreProps & ToggleExtraProps & DataTestProp

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
  const id = useUID()

  return (
    <div className={cn(styles.wrapper, className)} data-test={dataTest}>
      {/* hidden yet actual input */}
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={!!checked}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={helperText && helpTooltipId(id)}
        aria-errormessage={error && errorId(id)}
      />

      {/* label controlling the input above with the `toggle-track` element */}
      <label className={cn(classNameLabel, { [styles.disabled]: disabled })} htmlFor={id}>
        <span className={styles.labelText}>{label}</span>
        <span className={cn(styles['toggle-track'])}></span>
      </label>

      {helperText && <Help parentId={id} helperText={helperText} />}

      <div>
        <Error error={error} className={styles.errorContainer} inputId={id} />
      </div>
    </div>
  )
}
