/*
  CodeMirror based Code Editor component.

  * For readonly/code-viewing purposes use `Code`.

  ## CM5 vs CM6

  We are not using the old CM5; we're basing our component on CM6 which is the next gen. version of the hugely
  popular CM5. CM6 is still years old and solid despite being a young project.

  See https://codemirror.net/6/ for more.

  ## About language support

  In CM6 all of the languages are defined in small, self defined packages.
  ie. import { javascript } from '@codemirror/lang-javascript'

  But it also supports a legacy mode for which there is a combined package of
  lots of languages (coming from CM5 - which was hugely popular for a decade).

  We are using this legacy language pack for ease of use.

  So using a language is one import and one property assignment. See the `CodeEditor.stories.tsx`.

  for more see https://github.com/codemirror/legacy-modes

  ## About styling/themes

  CM6 is not that rich with predefined themes yet so we are not providing anything other than the
  default theme (though it's easy provide custom ones if/when we need it.)

  ## Customizing the editor

  For further customizations, one can use .customExtensions prop to extend the editor with
  any CM6 extension possible. (see Code component for an example.)

  For getting a handle to the actual CM6 instance one may use the .innerRef prop which refers
  to the EditorView instance created behind the scenes. (See the story of this component)
*/

import React, { FC, useEffect, useRef, useImperativeHandle, MutableRefObject } from 'react'
import cn from 'classnames'
import { EditorView, ViewUpdate, highlightSpecialChars, drawSelection, highlightActiveLine, keymap } from '@codemirror/view'
import { EditorState, Extension } from '@codemirror/state'
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
import styles from './CodeEditor.module.scss'

// Export these very common CodeMirror types for ease of use
export { EditorView, EditorState }

// Common options for the component.
// More advanced configuration of the underlying component should be done directly via a handle.
export type CodeOptions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  language?: any
  lineWrapping?: boolean
  lineNumbers?: boolean
}

export interface EditorViewRef {
  view(): EditorView
}

export type CodeEditorProps = {
  value?: string
  className?: string
  options?: CodeOptions
  onChange?: (val: string) => void
  customExtensions?: Extension[]
  innerRef?: MutableRefObject<EditorViewRef | null>
}

const DEFAULT_OPTIONS: CodeOptions = {
  language: null,
  lineWrapping: false,
  lineNumbers: true,
}

export const CodeEditor: FC<CodeEditorProps> = ({ value, className, options = {}, onChange, customExtensions, innerRef }) => {
  const parentRef = useRef<HTMLDivElement>(null)
  const cm = useRef<EditorView | null>(null)

  const optionsMemoized = useDeepCompareMemo(() => options, [options])

  // use this handle to access the cm element (which is a `view`)
  useImperativeHandle(innerRef, () => ({
    view: () => cm.current!,
  }))

  useEffect(
    function initCodeMirror() {
      if (!parentRef.current) return

      const opts: CodeOptions = { ...DEFAULT_OPTIONS, ...optionsMemoized }

      const updateListenerExtension = () =>
        EditorView.updateListener.of((v: ViewUpdate) => {
          if (!v.docChanged) return

          const val = v.state.doc.toString()
          if (onChange) onChange(val)
        })

      // configure/enable very common features
      const basicExtensions = [
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

      const extensions = [
        ...basicExtensions,
        ...(customExtensions ?? []),
        ...(opts.language ? [StreamLanguage.define(opts.language)] : []),
        ...(opts.lineWrapping ? [EditorView.lineWrapping] : []),
        ...(opts.lineNumbers ? [foldGutter(), lineNumbers()] : []),
        updateListenerExtension(),
      ]

      cm.current = new EditorView({
        state: EditorState.create({
          doc: value || '',
          extensions,
        }),
        parent: parentRef.current,
      })

      return () => {
        // destroy cm. (mind you; this component will be recreated whenever options is modified.)
        cm.current?.destroy()
        cm.current = null
      }
    },
    // value and onChange should not be a dependencies, just disable the warnings:
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cm, optionsMemoized, customExtensions],
  )

  return (
    <div className={cn(styles.container, className)}>
      <div ref={parentRef}></div>
    </div>
  )
}
