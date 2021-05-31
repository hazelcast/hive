import React from 'react'
import { Form, Formik } from 'formik'
import { logger } from '@hazelcast/services'
import { Checkbox } from '../src/'
import { CodeEditor, EditorViewRef } from '../src/CodeEditor'
import { CodeEditorFormik } from '../src/CodeEditorFormik'

// manually import a language
import { javascript } from '@codemirror/legacy-modes/mode/javascript'

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
  const ref = React.useRef<EditorViewRef>(null)

  function handleDirectAccess() {
    // Insert text at the start of the document
    ref.current?.view()?.dispatch({
      changes: { from: 0, insert: '#!/usr/bin/env node\n' },
    })
  }

  return (
    <div>
      <CodeEditor
        options={{
          language: javascript,
          lineNumbers: showLineNumbers,
          lineWrapping,
        }}
        value={value}
        onChange={(val: string) => {
          setValue(val)
        }}
        innerRef={ref}
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
        <button onClick={handleDirectAccess}>Direct access to CodeMirror instance</button>
      </div>
    </div>
  )
}

export const CodeEditorWrappedInFormik = () => {
  type Values = {
    source: boolean
  }
  const validate = (value: boolean) => (value.length < 5 ? 'min. 5 chars please!' : undefined)

  const TestForm = () => (
    <Formik<Values>
      initialValues={{
        source: false,
      }}
      onSubmit={(values) => logger.log('submit', values)}
    >
      {({ values }) => (
        <Form>
          Values: {JSON.stringify(values)}
          <CodeEditorFormik<Values> name="source" validate={validate} label="Turbo Mode" />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  )

  return <TestForm />
}
