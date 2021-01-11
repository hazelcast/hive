import React, { FC } from 'react'
import cn from 'classnames'

import { SelectField, SelectProps } from './SelectField'

import styleConsts from '../styles/constants/export.module.scss'

type MultiSelectCoreProps = {}

type MultiSelectProps<V> = SelectProps<V> & MultiSelectCoreProps

export const MultiSelect: FC<MultiSelectProps> = ({ ...rest }) => {
  // This is the recommend way of styling react-select:
  // ps. Also it's impossible to style the focused state of
  // multiValue tags via CSS.
  const customStyles = {
    multiValueRemove: (styles: any, { isFocused }) => ({
      ...styles,
      backgroundColor: isFocused && styleConsts.colorWarning,
      borderWidth: isFocused && 1,
      borderStyle: isFocused && 'solid',
      borderColor: isFocused && styleConsts.colorAccessibilityOutline,
      ':hover': {
        backgroundColor: styleConsts.colorWarning,
        borderColor: styleConsts.colorPrimary
      },
    }),
  };

  return <SelectField
    isMulti={true}
    styles={customStyles}
    {...rest}
  />
}
