import { mountAndCheckA11Y, simulateChange } from '@hazelcast/test-helpers'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { useUID } from 'react-uid'

import { Error, errorId, Label } from '../src'
import { TimeField } from '../src/TimeField'

const id = 'id'
const name = 'time'
const label = 'label'
const value = '10:00'

jest.mock('react-uid')

const useUIDMock = useUID as jest.Mock<ReturnType<typeof useUID>>

describe('TimeField', () => {
  beforeEach(() => {
    useUIDMock.mockImplementation(() => id)
  })

  it('Renders the default with correct props', async () => {
    const onChange = jest.fn()
    const onBlur = jest.fn()

    const wrapper = await mountAndCheckA11Y(<TimeField name={name} onChange={onChange} onBlur={onBlur} value={value} label={label} />)

    expect(wrapper.find(Label).props()).toMatchObject({
      id: 'id',
      label,
    })

    expect(wrapper.find('input').props()).toMatchObject({
      type: 'time',
      id,
      value,
      name,
      onChange,
      onBlur,
      'aria-invalid': false,
      'aria-required': undefined,
      'aria-errormessage': undefined,
      disabled: undefined,
    })

    expect(wrapper.find(Error).props()).toMatchObject({
      error: undefined,
      inputId: id,
    })
  })

  it('onChange works', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(<TimeField name={name} onChange={onChange} onBlur={onBlur} value={value} label={label} />)

    expect(onChange).toBeCalledTimes(0)

    let event: object
    act(() => {
      event = simulateChange(wrapper.find('input'), 'Luke')
    })

    expect(onChange).toBeCalledTimes(1)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-non-null-assertion
    expect(onChange.mock.calls[0][0]).toMatchObject(event!)
  })

  it('onBlur works', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(<TimeField name={name} onChange={onChange} onBlur={onBlur} value={value} label={label} />)

    expect(onBlur).toBeCalledTimes(0)

    const input = wrapper.find('input')
    act(() => {
      input.simulate('blur')
    })

    expect(onBlur).toBeCalledTimes(1)
  })

  it('Renders error with correct props', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()
    const error = 'Oops'

    const wrapper = await mountAndCheckA11Y(
      <TimeField name={name} onChange={onChange} onBlur={onBlur} value={value} label={label} error={error} />,
    )

    expect(wrapper.find(Label).props()).toMatchObject({
      id,
      label,
    })

    expect(wrapper.find('input').props()).toMatchObject({
      type: 'time',
      id,
      value,
      name,
      onChange,
      onBlur,
      'aria-invalid': true,
      'aria-required': undefined,
      'aria-errormessage': errorId(id),
      disabled: undefined,
    })

    expect(wrapper.find(Error).props()).toMatchObject({
      error,
      inputId: id,
    })
  })

  it('Renders required with correct props', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <TimeField name={name} onChange={onChange} onBlur={onBlur} value={value} label={label} required />,
    )

    expect(wrapper.find(Label).props()).toMatchObject({
      id,
      label,
    })

    expect(wrapper.find('input').props()).toMatchObject({
      type: 'time',
      id,
      value,
      name,
      onChange,
      onBlur,
      'aria-invalid': false,
      'aria-required': true,
      'aria-errormessage': undefined,
      disabled: undefined,
    })

    expect(wrapper.find(Error).props()).toMatchObject({
      error: undefined,
      inputId: id,
    })
  })

  it('Renders disabled with correct props', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <TimeField name={name} onChange={onChange} onBlur={onBlur} value={value} label={label} disabled />,
    )

    expect(wrapper.find(Label).props()).toMatchObject({
      id,
      label,
    })

    expect(wrapper.find('input').props()).toMatchObject({
      type: 'time',
      id,
      value,
      name,
      onChange,
      onBlur,
      'aria-invalid': false,
      'aria-required': undefined,
      'aria-errormessage': undefined,
      disabled: true,
    })

    expect(wrapper.find(Error).props()).toMatchObject({
      error: undefined,
      inputId: id,
    })
  })
})
