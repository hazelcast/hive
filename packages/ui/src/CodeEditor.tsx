/*
  CodeMirror based Code Editor component.

  This is a readonly code viewer component. For readonly/code-viewing purposes use `Code`.
*/

import React, { FC } from 'react'
import cn from 'classnames'

import { basicSetup, EditorState } from '@codemirror/basic-setup'
import { EditorView, ViewUpdate } from '@codemirror/view'
import { lineNumbers } from '@codemirror/gutter'
import { StreamLanguage } from '@codemirror/stream-parser'

import { CodeOptions } from './Code'
import styles from './CodeEditor.module.scss'

export type CodeEditorProps = {
  initialValue?: string
  className?: string
  options?: CodeOptions
  onChange?: (val: string) => void
}

const DEFAULT_OPTIONS: CodeOptions = {
  language: null,
  lineWrapping: false,
  lineNumbers: true,
}

export const CodeEditor: FC<CodeEditorProps> = ({ initialValue, className, options = {}, onChange }) => {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const cm = React.useRef<EditorView | null>(null)

  console.log(111, initialValue)
  React.useEffect(() => {
    if (!cm.current) {
      const opts: CodeOptions = { ...DEFAULT_OPTIONS, ...options }

      const updateListenerExtension = () =>
        EditorView.updateListener.of((v: ViewUpdate) => {
          if (!v.docChanged) return
          console.log(555, v)

          const val = v.state.doc.toString()
          if (onChange) onChange(val)
        })

      const baseExtensions = [basicSetup, updateListenerExtension()]
      const extensions = [
        ...baseExtensions,
        ...(opts.language ? [StreamLanguage.define(opts.language)] : []),
        ...(opts.lineWrapping ? [EditorView.lineWrapping] : []),
        ...(opts.lineNumbers ? [lineNumbers()] : []),
      ]

      cm.current = new EditorView({
        state: EditorState.create({
          doc: initialValue || '',
          extensions,
        }),
        parent: rootRef.current as HTMLDivElement,
      })
    }
    return () => {
      cm.current = null
    }
  }, [cm, initialValue])

  React.useMemo(() => {
    if (!cm.current) return
    cm.current.dispatch({
      changes: { from: 0, to: cm.current.state.doc.length, insert: initialValue },
    })
  }, [initialValue])

  return (
    <div className={cn(styles.container, className)}>
      <div ref={rootRef}></div>
    </div>
  )
}
