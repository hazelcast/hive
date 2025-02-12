import React, { ChangeEvent, FC, ReactElement, useMemo } from 'react'
import { useUID } from 'react-uid'
import classNames from 'classnames'
import { DataTestProp } from '@hazelcast/helpers'

import { Error, errorId } from './Error'
import { RadioGroupContext } from './RadioGroupContext'
import { RadioProps } from './Radio'

import styles from './RadioGroup.module.scss'

export type RadioGroupCoreProps = {
  name: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  error?: string
}

export type RadioGroupExtraProps = {
  children: ReactElement<RadioProps> | Array<ReactElement<RadioProps>>
  inline?: boolean
  radioGroupClassName?: string
  className?: string
} & DataTestProp

export type RadioGroupProps = RadioGroupExtraProps & RadioGroupCoreProps

/**
 * ### Purpose
 * Forms require input from users. If you need information that can be represented as a choice of multiple values, use input with type 'radio'.
 * You can use RadioGroup in order to group radios buttons into logical cells and provide corresponding error if needed.
 */
export const RadioGroup: FC<RadioGroupProps> = (props) => {
  const { radioGroupClassName, error, children, className, name, onChange, inline = false, 'data-test': dataTest = 'radio-group' } = props
  const id = useUID()
  const errorIdString: string | undefined = error && errorId(id)

  const providerValue = useMemo(() => ({ name, errorId: errorIdString, onChange }), [name, errorIdString, onChange])

  return (
    <div className={classNames(className, { [styles.withError]: 'error' in props })} data-test={`${dataTest}-wrapper`}>
      <div
        role="radiogroup"
        data-test={dataTest}
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
        <RadioGroupContext.Provider value={providerValue}>{children}</RadioGroupContext.Provider>
      </div>
      <Error truncated error={error} className={styles.errorContainer} inputId={id} />
    </div>
  )
}
