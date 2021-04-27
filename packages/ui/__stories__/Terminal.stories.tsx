/* eslint-disable @typescript-eslint/require-await */
import React from 'react'

import { Terminal } from '../src/Terminal'
import styles from '../src/Terminal.module.scss'

export default {
  title: 'Components/Terminal',
  component: Terminal,
}

const onExecute = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return ['testRes']
}

export const Default = () => <Terminal onExecute={onExecute} autoFocusInitial={false} />

export const WithHistory = () => (
  <Terminal
    onExecute={onExecute}
    initialExecutionHistory={[
      {
        command: 'test1',
        res: ['testRes1-1', 'testRes1-2'],
      },
      {
        command: 'testError',
        error: 'testErrorRes',
      },
      {
        command: 'test2',
        res: ['testRes2-1', 'testRes2-2', 'testRes2-3'],
      },
    ]}
  />
)

export const WithInitialCommand = () => <Terminal onExecute={onExecute} initialCommand="blow up death star" autoFocusInitial={false} />

export const WithInitialCommandHover = () => (
  <Terminal onExecute={onExecute} initialCommand="blow up death star" inputClassName={styles.hover} autoFocusInitial={false} />
)

export const WithInitialCommandFocus = () => (
  <Terminal onExecute={onExecute} initialCommand="blow up death star" inputClassName={styles.focus} autoFocusInitial={false} />
)

export const WithWelcomeMessage = () => (
  <Terminal onExecute={onExecute} welcomeMessage="Hello Luke!!!" initialCommand="blow up death star" autoFocusInitial={false} />
)

export const WithInitialCommandLoading = () => (
  <Terminal onExecute={onExecute} initialCommand="blow up death star" initialLoading autoFocusInitial={false} />
)
