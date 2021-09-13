import React from 'react'
import cn from 'classnames'

import { Label } from './Label'
import { Help, HelpProps } from './Help'
import { DataTestProp } from '@hazelcast/helpers'

import styles from './FieldHeader.module.scss'

export type FieldHeaderSize = 'small' | 'medium'
export type FieldHeaderLabelProps = { label: string; labelClassName?: string; helperText?: HelpProps['helperText'] }
export type FieldHeaderNoLabelProps = { label: never; labelClassName: never; helperText: never }
export type FieldHeaderProps = {
  size?: FieldHeaderSize
  id: string
  showAriaLabel?: boolean
} & DataTestProp &
  (FieldHeaderNoLabelProps | FieldHeaderLabelProps)

export const FieldHeader = (props: FieldHeaderProps) => {
  const { label, id, helperText, size = 'medium', labelClassName, 'data-test': dataTest, showAriaLabel } = props

  if (showAriaLabel) {
    return null
  }

  return (
    <div className={styles.root}>
      {label && (
        <Label
          id={id}
          label={label}
          data-test={dataTest ? `${dataTest}-label` : undefined}
          className={cn(styles.label, { [styles.small]: size === 'small' }, labelClassName)}
        />
      )}
      {label && helperText && (
        <Help
          parentId={id}
          helperText={helperText}
          className={styles.helperText}
          data-test={dataTest ? `${dataTest}-helperText` : undefined}
        />
      )}
    </div>
  )
}
