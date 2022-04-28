import React, { ReactElement } from 'react'
import { FieldValidator, useField } from 'formik'

import { CodeEditor, CodeEditorProps } from './CodeEditor'
import { getFieldError } from './utils/formik'
import { ExtractKeysOfValueType } from './utils/types'

export type CodeEditorFormikProps<V extends object> = CodeEditorProps & {
  name: ExtractKeysOfValueType<V, string | undefined>
  validate?: FieldValidator
  onChange?: (value: string) => void
  onBlur?: (e: React.FocusEvent) => void
}

export const CodeEditorFormik = <V extends object>({
  name,
  validate,
  onBlur,
  onChange,
  ...props
}: CodeEditorFormikProps<V>): ReactElement => {
  const [{ onBlur: onFormikBlur, value }, meta, helpers] = useField<string | undefined>({
    name,
    validate,
  })

  const onBlurInner = React.useCallback(
    (e: React.FocusEvent) => {
      if (onBlur) {
        onBlur(e)
      }
      onFormikBlur(e)
    },
    [onBlur, onFormikBlur],
  )

  return (
    <CodeEditor
      {...props}
      name={name}
      value={value}
      onChange={(val: string) => {
        if (onChange) {
          onChange(val)
        }

        helpers.setValue(val)
      }}
      onBlur={onBlurInner}
      error={getFieldError(meta)}
    />
  )
}
