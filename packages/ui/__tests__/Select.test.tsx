import React from 'react'
import { v4 as uuid } from 'uuid'
import { act } from 'react-dom/test-utils'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'

import { Select, SelectOption } from '../src/Select'
import { Label } from '../src/Label'
import { Error, errorId } from '../src/Error'

import styles from '../src/TextField.module.scss'

jest.mock('uuid')

const uuidMock = uuid as jest.Mock<ReturnType<typeof uuid>>

const selectId = 'selectId'
const selectName = 'selectName'
const selectValue = 'selectValue0'
const selectLabel = 'selectLabel'
const selectOptions: SelectOption[] = [
  { value: selectValue, text: selectValue },
  { value: 'selectValue1', text: 'selectValue1' },
  { value: 'selectValue2', text: 'selectValue2' },
]

describe('Select', () => {
  beforeEach(() => {
    uuidMock.mockImplementation(() => selectId)
  })

  it('Renders the default with correct props', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <Select name={selectName} value={selectValue} label={selectLabel} onBlur={onBlur} onChange={onChange} options={selectOptions} />,
    )

    expect(wrapper.find(Label).props()).toEqual({
      id: selectId,
      label: selectLabel,
    })

    expect(wrapper.find('select').props()).toEqual({
      id: selectId,
      value: selectValue,
      name: selectName,
      onChange,
      onBlur,
      'aria-invalid': false,
      'aria-required': undefined,
      'aria-describedby': undefined,
      'aria-errormessage': undefined,
      disabled: undefined,
      required: undefined,
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
      inputId: selectId,
    })
  })

  /* it('onChange works', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <TextField name="name" value="Yoda" placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} />,
    )

    const testEvent = { target: { value: 'Luke' } }

    expect(onChange).toBeCalledTimes(0)

    const input = wrapper.find('input')
    act(() => {
      input.simulate('change', testEvent)
    })

    expect(onChange).toBeCalledTimes(1)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(onChange.mock.calls[0][0]).toMatchObject(testEvent)
  }) */

  /* it('onBlur works', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <TextField name="name" value="Yoda" placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} />,
    )

    expect(onBlur).toBeCalledTimes(0)

    const input = wrapper.find('input')
    act(() => {
      input.simulate('blur')
    })

    expect(onBlur).toBeCalledTimes(1)
  }) */

  /* it('Renders helper text', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <TextField
        name="name"
        value="Yoda"
        placeholder="Enter the name"
        label="Wisest jedi"
        onBlur={onBlur}
        onChange={onChange}
        helperText="A long time ago in a galaxy far, far away...."
      />,
    )

    expect(wrapper.find(Label).props()).toEqual({
      id: 'republic',
      label: 'Wisest jedi',
    })

    expect(wrapper.find('input').props()).toEqual({
      type: 'text',
      id: 'republic',
      value: 'Yoda',
      name: 'name',
      onChange,
      onBlur,
      'aria-invalid': false,
      'aria-required': undefined,
      'aria-describedby': helpTooltipId('republic'),
      'aria-errormessage': undefined,
      disabled: undefined,
      placeholder: 'Enter the name',
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
      inputId: 'republic',
    })

    expect(wrapper.find(Help).props()).toEqual({
      parentId: 'republic',
      helperText: 'A long time ago in a galaxy far, far away....',
      className: styles.helperText,
    })
  }) */

  /* it('Renders error with correct props', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <TextField
        name="name"
        value="Yoda"
        placeholder="Enter the name"
        label="Wisest jedi"
        onBlur={onBlur}
        onChange={onChange}
        error="Dark side"
      />,
    )

    expect(wrapper.find(Label).props()).toEqual({
      id: 'republic',
      label: 'Wisest jedi',
    })

    expect(wrapper.find('input').props()).toEqual({
      type: 'text',
      id: 'republic',
      value: 'Yoda',
      name: 'name',
      onChange,
      onBlur,
      'aria-invalid': true,
      'aria-required': undefined,
      'aria-describedby': undefined,
      'aria-errormessage': errorId('republic'),
      disabled: undefined,
      placeholder: 'Enter the name',
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: 'Dark side',
      className: styles.errorContainer,
      inputId: 'republic',
    })

    expect(wrapper.find(Help).exists()).toBeFalsy()
  }) */

  /* it('Renders required with correct props', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <TextField name="name" value="Yoda" placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} required />,
    )

    expect(wrapper.find(Label).props()).toEqual({
      id: 'republic',
      label: 'Wisest jedi',
    })

    expect(wrapper.find('input').props()).toEqual({
      type: 'text',
      id: 'republic',
      value: 'Yoda',
      name: 'name',
      onChange,
      onBlur,
      'aria-invalid': false,
      'aria-required': true,
      'aria-describedby': undefined,
      'aria-errormessage': undefined,
      disabled: undefined,
      placeholder: 'Enter the name',
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
      inputId: 'republic',
    })

    expect(wrapper.find(Help).exists()).toBeFalsy()
  }) */

  /* it('Renders disabled with correct props', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <TextField name="name" value="Yoda" placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} disabled />,
    )

    expect(wrapper.find(Label).props()).toEqual({
      id: 'republic',
      label: 'Wisest jedi',
    })

    expect(wrapper.find('input').props()).toEqual({
      type: 'text',
      id: 'republic',
      value: 'Yoda',
      name: 'name',
      onChange,
      onBlur,
      'aria-invalid': false,
      'aria-required': undefined,
      'aria-describedby': undefined,
      'aria-errormessage': undefined,
      disabled: true,
      placeholder: 'Enter the name',
    })

    expect(wrapper.find(Error).props()).toEqual({
      error: undefined,
      className: styles.errorContainer,
      inputId: 'republic',
    })

    expect(wrapper.find(Help).exists()).toBeFalsy()
  }) */

  /* it('Renders inputContainerChild', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()
    const InputContainerChild = <div className="r2d2" />

    const wrapper = await mountAndCheckA11Y(
      <TextField
        name="name"
        value="Yoda"
        label="Wisest jedi"
        placeholder="Enter the name"
        onBlur={onBlur}
        onChange={onChange}
        inputContainerChild={InputContainerChild}
      />,
    )

    expect(wrapper.find(`.${styles.inputContainer}`).find('.r2d2').exists()).toBeTruthy()
  }) */
})