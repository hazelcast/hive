import React from 'react'
import { mount } from 'enzyme'

interface HooksWrapperProps<A, T> {
  args?: A
  hook: (args?: A) => T
  spyHookRes: (hookRes: T) => unknown
}
const HooksWrapper = <A, T>({ hook, spyHookRes, args }: HooksWrapperProps<A, T>) => {
  const res = hook(args)
  spyHookRes(res)
  return <div />
}

export const testHook = <A, T>(hook: (args?: A) => T, initialArgs?: A) => {
  const spyHookRes = jest.fn() as jest.Mock<unknown, [T]>

  const wrapper = mount(<HooksWrapper hook={hook} spyHookRes={spyHookRes} args={initialArgs} />)

  return {
    spyHookRes,
    update: () => wrapper.update(),
    unmount: () => wrapper.unmount(),
    setArgs: (newArgs?: A) => {
      wrapper.setProps({
        args: newArgs,
      })
    },
  }
}

export const getHookRes = <T,>(spyHookRes: jest.Mock<unknown, [T]>, callNumber?: number) => {
  callNumber = callNumber !== undefined ? callNumber : spyHookRes.mock.calls.length - 1
  expect(spyHookRes.mock.calls.length).toBeGreaterThanOrEqual(callNumber + 1)
  return spyHookRes.mock.calls[callNumber][0]
}
