import React, { ChangeEvent, FC, ReactElement, useRef } from 'react'
import { v4 as uuid } from 'uuid'
import { Error, errorId } from './Error'
import classNames from 'classnames'
import styles from './RadioGroup.module.scss'
import { DataTestProp } from '@hazelcast/helpers'
import { RadioGroupContext } from './RadioGroupContext'
import { RadioProps } from './Radio'

export type RadioGroupCoreProps = {
  name: string
  children: ReactElement<RadioProps> | Array<ReactElement<RadioProps>>
  inline?: boolean
}

export type RadioGroupProps = RadioGroupCoreProps & {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  radioGroupClassName?: string
  error?: string
  className?: string
} & DataTestProp

/**
 * ### Purpose
 * Forms require input from users. If you need information that can be represented as a choice of multiple values, use input with type 'radio'.
 * You can use RadioGroup in order to group radios buttons into logical cells and provide corresponding error if needed.
 */
export const RadioGroup: FC<RadioGroupProps> = ({
  radioGroupClassName,
  error,
  children,
  className,
  name,
  onChange,
  inline = false,
  'data-test': dataTest,
}) => {
  const idRef = useRef(uuid())
  const errorIdString: string | undefined = error && errorId(idRef.current)

  return (
    <div className={className} data-test={dataTest}>
      <div
        role="radiogroup"
        data-test="radio-group"
        className={classNames(
          {
            [styles.inline]: inline,
          },
          styles.radioGroup,
          radioGroupClassName,
        )}
        aria-invalid={!!error}
        aria-errormessage={errorIdString}
      >
        <RadioGroupContext.Provider value={{ name, errorId: errorIdString, onChange }}>{children}</RadioGroupContext.Provider>
      </div>
      <Error error={error} className={classNames(styles.errorContainer)} inputId={idRef.current} />
    </div>
  )
}
