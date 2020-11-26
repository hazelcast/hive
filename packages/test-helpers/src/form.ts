import { HTMLAttributes, ReactWrapper } from 'enzyme'

export const simulateChange = (input: ReactWrapper<HTMLAttributes>, newValue: unknown) => {
  const event = {
    target: { value: newValue, name: input.prop('name') },
  }
  input.simulate('change', event)
  return event
}

export const simulateBlur = (input: ReactWrapper<HTMLAttributes>) => {
  const event = {
    target: { name: input.prop('name') },
  }
  input.simulate('blur', event)
  return event
}
