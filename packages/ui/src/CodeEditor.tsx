/*
  CodeMirror based Code Editor component.

  This is a readonly code viewer component. For readonly/code-viewing purposes use `Code`.
*/

import React, { FC } from 'react'
import cn from 'classnames'
import { EditorView, ViewUpdate, highlightSpecialChars, drawSelection, highlightActiveLine, keymap } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { history, historyKeymap } from '@codemirror/history'
import { foldGutter, foldKeymap } from '@codemirror/fold'
import { indentOnInput } from '@codemirror/language'
import { lineNumbers } from '@codemirror/gutter'
import { defaultKeymap } from '@codemirror/commands'
import { bracketMatching } from '@codemirror/matchbrackets'
import { closeBrackets, closeBracketsKeymap } from '@codemirror/closebrackets'
import { highlightSelectionMatches, searchKeymap } from '@codemirror/search'
import { autocompletion, completionKeymap } from '@codemirror/autocomplete'
import { commentKeymap } from '@codemirror/comment'
import { rectangularSelection } from '@codemirror/rectangular-selection'
import { defaultHighlightStyle } from '@codemirror/highlight'
import { lintKeymap } from '@codemirror/lint'
import { StreamLanguage } from '@codemirror/stream-parser'

import { useDeepCompareMemo } from './hooks/useDeepCompareMemo'
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

  const optionsMemoized = useDeepCompareMemo(() => options, [options])

  console.log(111, options)
  React.useEffect(() => {
    console.log(222, cm)

    if (!rootRef.current) return

    const opts: CodeOptions = { ...DEFAULT_OPTIONS, ...options }

    const updateListenerExtension = () =>
      EditorView.updateListener.of((v: ViewUpdate) => {
        if (!v.docChanged) return
        //console.log(555, v)

        const val = v.state.doc.toString()
        if (onChange) onChange(val)
      })

    const basicSetup = [
      highlightSpecialChars(),
      history(),
      drawSelection(),
      EditorState.allowMultipleSelections.of(true),
      indentOnInput(),
      defaultHighlightStyle.fallback,
      bracketMatching(),
      closeBrackets(),
      autocompletion(),
      rectangularSelection(),
      highlightActiveLine(),
      highlightSelectionMatches(),
      keymap.of([
        ...closeBracketsKeymap,
        ...defaultKeymap,
        ...searchKeymap,
        ...historyKeymap,
        ...foldKeymap,
        ...commentKeymap,
        ...completionKeymap,
        ...lintKeymap,
      ]),
    ]

    const baseExtensions = [basicSetup, updateListenerExtension()]
    const extensions = [
      ...baseExtensions,
      ...(opts.language ? [StreamLanguage.define(opts.language)] : []),
      ...(opts.lineWrapping ? [EditorView.lineWrapping] : []),
      ...(opts.lineNumbers ? [foldGutter(), lineNumbers()] : []),
    ]

    console.log('recreating...', extensions)
    cm.current = new EditorView({
      state: EditorState.create({
        doc: initialValue || '',
        extensions,
      }),
      parent: rootRef.current as HTMLDivElement,
    })

    return () => {
      // console.log(999)
      cm.current?.destroy()
      cm.current = null
    }
  }, [cm, initialValue, optionsMemoized])

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
