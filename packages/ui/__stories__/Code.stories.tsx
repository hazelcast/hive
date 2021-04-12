import React from 'react'
import { Code } from '../src'

// manually import a language
import { javascript } from '@codemirror/legacy-modes/mode/javascript'

export default {
  title: 'Components/Code',
  component: Code,
}

const SAMPLE_CODE = `// https://stackoverflow.com/a/17623252
for (let i = 1; i <= 100; i++) {
  let out = '';
  if (i % 3 === 0) out += 'Fizz';
  if (i % 5 === 0) out += 'Buzz';
  console.log(out || i);
}`

export const Default = () => {
  return <Code options={{ language: javascript }} value={SAMPLE_CODE} />
}

export const NoLineNumbers = () => {
  return <Code options={{ language: javascript, lineNumbers: false }} value={SAMPLE_CODE} />
}

export const WrapLongLines = () => {
  const value = `Hazelcast IMDG clients and programming language APIs allow you to extend the benefits of operational in-memory computing to
  applications in these languages. These clients and APIs (except Scala) are open source and supported by Hazelcast.
  `
  return <Code options={{ lineWrapping: true }} value={value} />
}
