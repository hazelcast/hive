import React, { ReactElement } from 'react'
import { FieldValidator, useField } from 'formik'

import { CodeEditor, CodeEditorProps } from './CodeEditor'
import { getFieldError } from './utils/formik'
import { ExtractKeysOfValueType } from './utils/types'

export type CodeEditorFormikProps<V extends object> = CodeEditorProps & {
  name: ExtractKeysOfValueType<V, string | undefined>
  validate?: FieldValidator
}

export const CodeEditorFormik = <V extends object>({ name, validate, ...props }: CodeEditorFormikProps<V>): ReactElement => {
  const [field, meta, helpers] = useField<string | undefined>({
    name,
    validate,
  })

  return (
    <CodeEditor
      {...props}
      name={name}
      value={field.value}
      onChange={(val: string) => {
        helpers.setValue(val, false)
      }}
      onBlur={field.onBlur}
      error={getFieldError(meta)}
    />
  )
}
