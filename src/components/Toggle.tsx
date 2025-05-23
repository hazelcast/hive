import React, { FC, FocusEvent, ChangeEvent } from 'react'
import cn from 'classnames'
import { useUID } from 'react-uid'

import { DataTestProp } from '../helpers/types'
import { Error, errorId } from './Error'
import { Help, HelpProps, helpTooltipId } from './Help'

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
  label?: React.ReactNode
  helperText?: HelpProps['helperText']
  disabled?: boolean
  className?: string
  classNameLabel?: string
}

export type ToggleProps = ToggleCoreProps & ToggleExtraProps & DataTestProp

export const Toggle: FC<ToggleProps> = (props) => {
  const {
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
    'data-test': dataTest = 'toggle',
  } = props
  const id = useUID()

  return (
    <div className={cn(styles.wrapper, className, { [styles.withError]: 'error' in props })} data-test={dataTest}>
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

      {/* label controlling the input above with the `toggleTrack` element */}
      <label
        className={cn(
          {
            [styles.error]: !!error,
            [styles.disabled]: disabled,
          },
          classNameLabel,
        )}
        htmlFor={id}
      >
        {label && (
          <span className={styles.labelText} data-test={`${dataTest}-label`}>
            {label}
          </span>
        )}
        {/* actual element to render */}
        <span className={styles.toggleTrack}>
          <span className={styles.toggleTrackText} data-test={`${dataTest}-state`}>
            {checked ? 'ON' : 'OFF'}
          </span>
        </span>
      </label>

      {helperText && <Help parentId={id} helperText={helperText} className={styles.helperText} data-test={`${dataTest}-helperText`} />}

      <Error data-test={`${dataTest}-error`} truncated error={error} className={styles.errorContainer} inputId={id} />
    </div>
  )
}
