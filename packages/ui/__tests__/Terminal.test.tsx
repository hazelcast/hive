import { jestFnControlledPromise, mountAndCheckA11Y } from '@hazelcast/test-helpers'
import React from 'react'
import { act } from 'react-dom/test-utils'

import { ExecutionHistoryState, Terminal } from '../src/Terminal'
import styles from '../src/Terminal.module.scss'

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
    const wrapper = await mountAndCheckA11Y(
      <Terminal initialExecutionHistory={history} onExecute={jest.fn()} welcomeMessage="Hello" initialCommand="Luke" />,
    )

    expect(wrapper.findWhere((item) => item.hasClass(styles.welcome)).text()).toBe('Hello')

    const historyWrapper = wrapper.findWhere((item) => item.hasClass(styles.history))

    expect(historyWrapper.children().length).toBe(4)

    const command0 = historyWrapper.childAt(0)
    expect(command0.find('input').prop('value')).toBe('test1')

    const command0Res = historyWrapper.childAt(1)
    expect(command0Res.childAt(0).text()).toBe('testRes1-1')
    expect(command0Res.childAt(1).text()).toBe('testRes1-2')

    const command1 = historyWrapper.childAt(2)
    expect(command1.find('input').prop('value')).toBe('testError')

    const command1Res = historyWrapper.childAt(3)
    expect(command1Res.text()).toBe('testErrorRes')

    const currentCommandInput = wrapper.findWhere((item) => item.hasClass(styles.currentCommand)).find('input')

    expect(currentCommandInput.prop('value')).toBe('Luke')

    expect(wrapper.findWhere((item) => item.hasClass(styles.loading)).exists()).toBeFalsy()
  })

  it('executes commands', async () => {
    const controlledPromise = jestFnControlledPromise()

    const wrapper = await mountAndCheckA11Y(
      <Terminal initialExecutionHistory={history} onExecute={controlledPromise.fn} initialCommand="Luke" />,
    )

    expect(wrapper.findWhere((item) => item.hasClass(styles.history)).children().length).toBe(4)

    expect(wrapper.findWhere((item) => item.hasClass(styles.loading)).exists()).toBeFalsy()

    const currentCommandInputBefore = wrapper.findWhere((item) => item.hasClass(styles.currentCommand)).find('input')

    expect(currentCommandInputBefore.prop('disabled')).toBeFalsy()
    expect(currentCommandInputBefore.prop('value')).toBe('Luke')

    act(() => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion,@typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-argument
      currentCommandInputBefore.prop('onKeyUp')!({ key: 'Enter' } as any)
    })
    wrapper.update()

    expect(wrapper.findWhere((item) => item.hasClass(styles.loading)).exists()).toBeTruthy()

    const currentCommandInputInProgress = wrapper.findWhere((item) => item.hasClass(styles.currentCommand)).find('input')

    expect(currentCommandInputInProgress.prop('disabled')).toBeTruthy()
    expect(currentCommandInputInProgress.prop('value')).toBe('Luke')

    await act(async () => {
      controlledPromise.resolve(['lukeRes'])
      await controlledPromise.promise
    })
    wrapper.update()

    expect(wrapper.findWhere((item) => item.hasClass(styles.loading)).exists()).toBeFalsy()

    const currentCommandInputInAfter = wrapper.findWhere((item) => item.hasClass(styles.currentCommand)).find('input')

    expect(currentCommandInputInAfter.prop('disabled')).toBeFalsy()
    expect(currentCommandInputInAfter.prop('value')).toBe('')

    expect(wrapper.findWhere((item) => item.hasClass(styles.history)).children().length).toBe(6)

    const historyWrapper = wrapper.findWhere((item) => item.hasClass(styles.history))
    const lastCommand = historyWrapper.childAt(4)
    expect(lastCommand.find('input').prop('value')).toBe('Luke')

    const lastCommandRes = historyWrapper.childAt(5)
    expect(lastCommandRes.text()).toBe('lukeRes')
  })
})
