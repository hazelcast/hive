import React, { FC, FocusEvent, ChangeEvent } from 'react'
import cn from 'classnames'
import { useUID } from 'react-uid'
import { DataTestProp } from '@hazelcast/helpers'

import { Error, errorId } from './Error'
import { Help, helpTooltipId } from './Help'

import { SelectField, SelectProps } from './SelectField'
import styles from './MultiSelect.module.scss'

type MultiSelectCoreProps = {}

type MultiSelectProps<V> = SelectProps<V> & MultiSelectCoreProps

export const MultiSelect: FC<MultiSelectProps> = ({ ...rest }) => {
  return <SelectField isMulti={true} {...rest} />
}
