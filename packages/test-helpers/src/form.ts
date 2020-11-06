import { HTMLAttributes, ReactWrapper } from 'enzyme'

export const simulateChange = (input: ReactWrapper<HTMLAttributes>, newValue: unknown) => {
  const target = { value: newValue, name: input.prop('name') }
  input.simulate('change', {
    target,
    currentTarget: target,
  })
}
