import React, { CSSProperties } from 'react'
import cn from 'classnames'

import { Label } from './Label'
import { Help, HelpProps } from './Help'
import { DataTestProp } from '@hazelcast/helpers'

import styles from './FieldHeader.module.scss'

export type FieldHeaderSize = 'small' | 'medium'
export type FieldHeaderLabelProps = {
  label: string
  labelClassName?: string
  helperText?: HelpProps['helperText']
  helperTextTooltipWordBreak?: CSSProperties['wordBreak']
}
export type FieldHeaderNoLabelProps = {
  label: never
  labelClassName: never
  helperText: never
  helperTextTooltipWordBreak: never
}
export type FieldHeaderProps = {
  size?: FieldHeaderSize
  id: string
  showAriaLabel?: boolean
} & DataTestProp &
  (FieldHeaderNoLabelProps | FieldHeaderLabelProps)

export const FieldHeader = (props: FieldHeaderProps) => {
  const { label, id, helperText, size = 'medium', labelClassName, 'data-test': dataTest, showAriaLabel, helperTextTooltipWordBreak } = props

  if (showAriaLabel) {
    return null
  }

  return label ? (
    <div className={styles.root}>
      <Label
        id={id}
        label={label}
        data-test={dataTest ? `${dataTest}-label` : undefined}
        className={cn(styles.label, { [styles.small]: size === 'small' }, labelClassName)}
      />
      {helperText && (
        <Help
          parentId={id}
          helperText={helperText}
          className={styles.helperText}
          tooltipWordBreak={helperTextTooltipWordBreak}
          data-test={dataTest ? `${dataTest}-helperText` : undefined}
        />
      )}
    </div>
  ) : null
}
