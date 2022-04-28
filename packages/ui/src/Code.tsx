/*
  CodeMirror based Code component.

  This is a readonly code viewer component. For editing purposes use `CodeEditor`.
*/

import React, { FC } from 'react'
import { CodeEditor, CodeOptions, EditorView } from './CodeEditor'

export type CodeProps = {
  value?: string
  className?: string
  options?: CodeOptions
  dataTest?: string
}

const DEFAULT_OPTIONS: CodeOptions = {
  language: null,
  lineWrapping: false,
  lineNumbers: true,
}

export const Code: FC<CodeProps> = ({ value, className, options = DEFAULT_OPTIONS, dataTest = 'code' }) => {
  return (
    <CodeEditor
      value={value}
      options={options}
      dataTest={dataTest}
      className={className}
      customExtensions={[EditorView.editable.of(false)]}
    />
  )
}
