import React from 'react'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'

import { Code } from '../src/Code'

const SAMPLE_CODE = `
// https://stackoverflow.com/a/17623252
for (let i = 1; i <= 100; i++) {
  let out = '';
  if (i % 3 === 0) out += 'Fizz';
  if (i % 5 === 0) out += 'Buzz';
  console.log(out || i);
}
`

describe('Code', () => {
  it('Renders the default Code', async () => {
    const wrapper = await mountAndCheckA11Y(<Code language="jsx">{SAMPLE_CODE}</Code>)

    expect(wrapper.exists('pre')).toBeTruthy()
    expect(wrapper.find(Code).props()).toMatchObject({
      language: 'jsx',
    })
  })
})
