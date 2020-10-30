import React, { FC, ReactElement, useRef } from 'react'
import { v4 as uuid } from 'uuid'
import { Error, errorId } from './Error'
import classNames from 'classnames'
import styles from './RadioGroup.module.scss'
import { RadioProps } from './Radio'

export type RadioGroupProps = {
  children: ReactElement<RadioProps> | Array<ReactElement<RadioProps>>
  radioGroupClassName?: string
  error?: string
}

/**
 * ### Purpose
 * Forms require input from users. If you need information that can be represented as a choice of multiple values, use input with type 'radio'.
 * You can use RadioGroup in order to group radios buttons into logical cells and provide corresponding error if needed.
 */
export const RadioGroup: FC<RadioGroupProps> = ({ radioGroupClassName, error, children }) => {
  const idRef = useRef(uuid())

  return (
    <div>
      <div
        role="radiogroup"
        className={classNames([styles.radioGroup, radioGroupClassName], {
          [styles.error]: !!error,
        })}
        aria-invalid={!!error}
        aria-errormessage={error && errorId(idRef.current)}
      >
        {children}
      </div>
      <Error error={error} className={classNames(styles.errorContainer)} inputId={idRef.current} />
    </div>
  )
}
