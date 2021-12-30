import React from 'react'
import { Form, Formik } from 'formik'
import { logger } from '@hazelcast/services'
import { Checkbox, CodeEditor, CodeEditorFormik } from '../src/'

// manually import a language
import { javascript } from '@codemirror/legacy-modes/mode/javascript'
import { EditorViewRef } from '../src/CodeEditor'

export default {
  title: 'Components/CodeEditor',
  component: CodeEditor,
}

const SAMPLE_CODE = `// https://stackoverflow.com/a/17623252
for (let i = 1; i <= 100; i++) {
  let out = '';
  if (i % 3 === 0) out += 'Fizz';
  if (i % 5 === 0) out += 'Buzz';
  console.log(out || i);
}`

export const Default = () => {
  const [value, setValue] = React.useState<string>(SAMPLE_CODE)
  const [showLineNumbers, setShowLineNumbers] = React.useState<boolean>(true)
  const [lineWrapping, setLineWrapping] = React.useState<boolean>(false)
  const [rows, setRows] = React.useState(5)
  const ref = React.useRef<EditorViewRef>(null)

  function handleDirectAccess() {
    // Insert text at the start of the document
    ref.current?.view()?.dispatch({
      changes: { from: 0, insert: '#!/usr/bin/env node\n' },
    })
  }

  const customKeymap = [
    {
      key: 'F9',
      run() {
        alert('hello from custom keymap')
        return false
      },
    },
  ]

  return (
    <div>
      <CodeEditor
        options={{
          language: javascript,
          lineNumbers: showLineNumbers,
          lineWrapping,
          rows,
        }}
        value={value}
        onChange={(val: string) => {
          setValue(val)
        }}
        innerRef={ref}
        customKeymap={customKeymap}
      />
      <hr />
      <div>Character count: {value.length}</div>
      <hr />
      <div>
        <Checkbox
          name="showLineNumbers"
          checked={showLineNumbers}
          label="Show line numbers"
          onChange={(e) => {
            setShowLineNumbers(e.target.checked)
          }}
        />
        <hr />
        <Checkbox
          name="showLineNumbers"
          checked={lineWrapping}
          label="Wrap long lines"
          onChange={(e) => {
            setLineWrapping(e.target.checked)
          }}
        />
        <hr />
        <div>
          <button onClick={() => setRows(rows - 1)}>-1 rows</button>
          <button onClick={() => setRows(rows + 1)}>+1 rows</button>
        </div>
        <hr />
        <button onClick={handleDirectAccess}>Direct access to CodeMirror instance</button>
      </div>
    </div>
  )
}

export const CodeEditorWrappedInFormik = () => {
  type Values = {
    source: string
  }
  const validate = (value: string) => (value.length < 5 ? 'min. 5 chars please!' : undefined)

  const TestForm = () => (
    <Formik<Values>
      initialValues={{
        source: 'min. 5 chars please',
      }}
      onSubmit={(values) => logger.log('submit', values)}
    >
      {({ values }) => (
        <Form>
          Values: {JSON.stringify(values)}
          <CodeEditorFormik<Values> name="source" validate={validate} />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  )

  return <TestForm />
}
