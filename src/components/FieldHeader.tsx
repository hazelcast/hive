import React, { CSSProperties } from 'react'
import cn from 'classnames'

import { Label } from './Label'
import { Help, HelpProps } from './Help'
import { DataTestProp } from '../helpers/types'

import styles from './FieldHeader.module.scss'

export type FieldHeaderSize = 'small' | 'medium' | 'large'
export type FieldHeaderVariant = 'primary' | 'secondary'
export type FieldHeaderLabelProps = {
  label?: string
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
  variant?: FieldHeaderVariant
  id: string
  showAriaLabel?: boolean
} & DataTestProp &
  (FieldHeaderNoLabelProps | FieldHeaderLabelProps)

export const FieldHeader = (props: FieldHeaderProps) => {
  const {
    label,
    id,
    variant,
    helperText,
    size = 'medium',
    labelClassName,
    'data-test': dataTest,
    showAriaLabel,
    helperTextTooltipWordBreak,
  } = props

  if (showAriaLabel) {
    return null
  }

  return label ? (
    <div className={styles.root}>
      {/* eslint-disable-next-line jsx-a11y/label-has-for */}
      <Label
        id={id}
        label={label}
        variant={variant}
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
