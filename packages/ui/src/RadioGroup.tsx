import React, { FC, ReactElement, useRef } from 'react'
import { Help } from './Help'
import { v4 as uuid } from 'uuid'
import { Error } from './Error'
import classNames from 'classnames'
import styles from './RadioGroup.module.scss'

export type RadioGroupProps = {
  label?: string
  helperText?: string
  error?: string
  children: Array<ReactElement>
}

export const RadioGroup: FC<RadioGroupProps> = ({ label, helperText, error, children }) => {
  const idRef = useRef(uuid())

  return (
    <div className={styles.wrapper}>
      <ul role="radiogroup" className={styles.radioGroup}>
        {children}
      </ul>
      <span>{helperText && <Help parentId={idRef.current} helperText={helperText} />}</span>
      <Error error={error} className={classNames(styles.errorContainer)} inputId={idRef.current} />
    </div>
  )
}
