import React from 'react'
import { CodeEditor } from '../src'

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

  return (
    <div>
      <CodeEditor
        options={{ language: javascript }}
        initialValue={SAMPLE_CODE}
        onChange={(val: string) => {
          setValue(val)
        }}
      />
      <span>Character count: {value.length}</span>
    </div>
  )
}
