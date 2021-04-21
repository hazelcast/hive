import React from 'react'
import { CodeEditor, Checkbox } from '../src/'

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
  const [showLineNumbers, setShowLineNumbers] = React.useState<boolean>(false)
  const [lineWrapping, setLineWrapping] = React.useState<boolean>(false)

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
        <Checkbox
          name="showLineNumbers"
          checked={lineWrapping}
          label="Wrap long lines"
          onChange={(e) => {
            setLineWrapping(e.target.checked)
          }}
        />
      </div>
    </div>
  )
}
