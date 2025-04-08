import { jestFnControlledPromise, renderAndCheckA11Y } from '../../src'
import React from 'react'
import { act, fireEvent } from '@testing-library/react'

import { testAttribute } from '../helpers'
import { ExecutionHistoryState, Terminal } from '../../src/components/Terminal'

import styles from '../../src/components/Terminal.module.scss'

const history: ExecutionHistoryState[] = [
  {
    command: 'test1',
    res: ['testRes1-1', 'testRes1-2'],
  },
  {
    command: 'testError',
    error: 'testErrorRes',
  },
]

describe('Terminal', () => {
  it('renders Terminal with history and input', async () => {
    const { container } = await renderAndCheckA11Y(
      <Terminal initialExecutionHistory={history} onExecute={jest.fn()} welcomeMessage="Hello" initialCommand="Luke" />,
    )

    expect(container.querySelector(`.${styles.welcome}`)).toHaveTextContent('Hello')

    const historyWrapper = container.querySelector(`.${styles.history}`)!

    expect(historyWrapper.children).toHaveLength(4)

    const command0 = historyWrapper.children[0]
    testAttribute(command0.querySelector('input'), 'value', 'test1')

    const command0Res = historyWrapper.children[1]
    expect(command0Res.children[0]).toHaveTextContent('testRes1-1')
    expect(command0Res.children[1]).toHaveTextContent('testRes1-2')

    const command1 = historyWrapper.children[2]
    testAttribute(command1.querySelector('input'), 'value', 'testError')

    const command1Res = historyWrapper.children[3]
    expect(command1Res).toHaveTextContent('testErrorRes')

    const currentCommandInput = container.querySelector(`.${styles.currentCommand} input`)

    testAttribute(currentCommandInput, 'value', 'Luke')

    expect(container.querySelector(`.${styles.loading}`)).not.toBeInTheDocument()
  })

  it('executes commands', async () => {
    const controlledPromise = jestFnControlledPromise()

    const { container } = await renderAndCheckA11Y(
      <Terminal initialExecutionHistory={history} onExecute={controlledPromise.fn} initialCommand="Luke" />,
    )

    expect(container.querySelector(`.${styles.history}`)!.children).toHaveLength(4)

    expect(container.querySelector(`.${styles.loading}`)).not.toBeInTheDocument()

    const currentCommandInputBefore = container.querySelector(`.${styles.currentCommand} input`)!

    testAttribute(currentCommandInputBefore, 'disabled')
    testAttribute(currentCommandInputBefore, 'value', 'Luke')

    await act(async () => {
      fireEvent.keyUp(currentCommandInputBefore, { key: 'Enter', charCode: 13 })
    })

    expect(container.querySelector(`.${styles.loading}`)).toBeInTheDocument()

    const currentCommandInputInProgress = container.querySelector(`.${styles.currentCommand} input`)!

    testAttribute(currentCommandInputInProgress, 'disabled', '')
    testAttribute(currentCommandInputInProgress, 'value', 'Luke')

    await act(async () => {
      controlledPromise.resolve(['lukeRes'])
      await controlledPromise.promise
    })

    expect(container.querySelector(`.${styles.loading}`)).not.toBeInTheDocument()

    const currentCommandInputInAfter = container.querySelector(`.${styles.currentCommand} input`)!

    testAttribute(currentCommandInputInAfter, 'disabled')
    testAttribute(currentCommandInputInAfter, 'value', '')

    expect(container.querySelector(`.${styles.history}`)!.children).toHaveLength(6)

    const historyWrapper = container.querySelector(`.${styles.history}`)!
    const lastCommand = historyWrapper.children[4]
    testAttribute(lastCommand.querySelector('input'), 'value', 'Luke')

    const lastCommandRes = historyWrapper.children[5]
    expect(lastCommandRes).toHaveTextContent('lukeRes')
  })
})
