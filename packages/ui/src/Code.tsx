/*
  CodeMirror based Code component.

  This is a readonly code viewer component. For editing purposes use `CodeEditor`.

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

  So using a language is one import and one property assignment. see the `Code.stories.tsx`.

  for more see https://github.com/codemirror/legacy-modes

  ## About styling/themes

  CM6 is not that rich with predefined themes yet so we are not providing anything other than the
  default theme (though it's easy provide custom ones if/when we need it.)
*/

import React, { FC } from 'react'
import cn from 'classnames'

import { EditorState, EditorView } from '@codemirror/basic-setup'
import { lineNumbers } from '@codemirror/gutter'
import { defaultHighlightStyle } from '@codemirror/highlight'
import { StreamLanguage } from '@codemirror/stream-parser'

import styles from './Code.module.scss'

// Common options for the component.
// More advanced configuration of the underlying component should be done directly via a handle.
export type CodeOptions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  language?: any
  lineWrapping?: boolean
  lineNumbers?: boolean
}

export type CodeProps = {
  value?: string
  className?: string
  options?: CodeOptions
}

const DEFAULT_OPTIONS: CodeOptions = {
  language: null,
  lineWrapping: false,
  lineNumbers: true,
}

export const Code: FC<CodeProps> = ({ value, className, options = {} }) => {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const cm = React.useRef<EditorView | null>(null)

  React.useEffect(() => {
    if (!cm.current) {
      const opts: CodeOptions = { ...DEFAULT_OPTIONS, ...options }

      const baseExtensions = [defaultHighlightStyle, EditorView.editable.of(false)]
      const extensions = [
        ...baseExtensions,
        ...(opts.language ? [StreamLanguage.define(opts.language)] : []),
        ...(opts.lineWrapping ? [EditorView.lineWrapping] : []),
        ...(opts.lineNumbers ? [lineNumbers()] : []),
      ]

      cm.current = new EditorView({
        state: EditorState.create({
          doc: value || '',
          extensions,
        }),
        parent: rootRef.current as HTMLDivElement,
      })
    }
    return () => {
      cm.current = null
    }
  }, [cm, value, options])

  React.useMemo(() => {
    if (!cm.current) return
    cm.current.dispatch({
      changes: { from: 0, to: cm.current.state.doc.length, insert: value },
    })
  }, [value])

  return (
    <div className={cn(styles.container, className)}>
      <div ref={rootRef}></div>
    </div>
  )
}
