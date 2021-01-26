import React from 'react'
import { Code } from '../src'

// import styles from '../src/Code.module.scss'

export default {
  title: 'Components/Code',
  component: Code
}

const SAMPLE_CODE = `
// https://stackoverflow.com/a/17623252
for (let i = 1; i <= 100; i++) {
  let out = '';
  if (i % 3 === 0) out += 'Fizz';
  if (i % 5 === 0) out += 'Buzz';
  console.log(out || i);
}
`

export const Default = () => {
  return (
    <Code>
      {SAMPLE_CODE}
    </Code>
  )
}

