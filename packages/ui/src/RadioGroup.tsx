import React, { FC, ReactElement, useRef } from 'react'
import { v4 as uuid } from 'uuid'
import { Error } from './Error'
import classNames from 'classnames'
import styles from './RadioGroup.module.scss'
import { RadioProps } from './Radio'

export type RadioGroupProps = {
  error?: string
  children: ReactElement<RadioProps> | Array<ReactElement<RadioProps>>
  radioGroupClassName?: string
}

export const RadioGroup: FC<RadioGroupProps> = ({ radioGroupClassName, error, children }) => {
  const idRef = useRef(uuid())

  return (
    <div>
      <ul
        role="radiogroup"
        className={classNames([styles.radioGroup, radioGroupClassName], {
          [styles.error]: !!error,
        })}
      >
        {React.Children.map(children, (child, i) => (
          <li key={i}>{child}</li>
        ))}
      </ul>
      <Error error={error} className={classNames(styles.errorContainer)} inputId={idRef.current} />
    </div>
  )
}
