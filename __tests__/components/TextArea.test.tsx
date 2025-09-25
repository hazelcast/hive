import React, { useState } from 'react'
import { act, screen, fireEvent } from '@testing-library/react'
import { renderAndCheckA11Y } from '../../src'
import { useUID } from 'react-uid'

import { TextArea } from '../../src/components/TextArea'
import { errorId } from '../../src/components/Error'

import styles from '../../src/components/TextArea.module.scss'

jest.mock('react-uid')

const useUIDMock = useUID as jest.Mock<ReturnType<typeof useUID>>

const inputId = 'inputId'
const inputName = 'inputName'
const inputValue = 'inputValue'
const inputPlaceholder = 'inputPlaceholder'
const inputLabel = 'inputLabel'
const helperText = 'Helper text'

describe('TextArea', () => {
  beforeEach(() => {
    useUIDMock.mockImplementation(() => inputId)
  })

  it('Renders the default with correct props', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const { container } = await renderAndCheckA11Y(
      <TextArea
        name={inputName}
        value={inputValue}
        placeholder={inputPlaceholder}
        label={inputLabel}
        onBlur={onBlur}
        onChange={onChange}
        rows={5}
      />,
    )

    const label = screen.queryByTestId('textarea-label')!

    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('for', inputId)
    expect(label).toHaveTextContent(inputLabel)

    const textarea = container.querySelector('textarea')!

    expect(textarea).toBeInTheDocument()
    expect(textarea).toHaveProperty('value', inputValue)
    expect(textarea).toHaveAttribute('placeholder', inputPlaceholder)
    expect(textarea).toHaveAttribute('id', inputId)
    expect(textarea).toHaveAttribute('name', inputName)
    expect(textarea).toHaveAttribute('aria-invalid', 'false')
    expect(textarea).not.toHaveAttribute('aria-required')
    expect(textarea).not.toHaveAttribute('aria-describedby')
    expect(textarea).not.toHaveAttribute('aria-errormessage')
    expect(textarea).not.toHaveAttribute('required')
    expect(textarea).not.toHaveAttribute('disabled')
    expect(textarea).toHaveAttribute('rows', '5')

    const error = screen.getByTestId('textarea-error')!

    expect(error).toBeInTheDocument()
    expect(error).toHaveAttribute('id', errorId(inputId))
    expect(error).toHaveClass(styles.errorContainer)
    expect(error).toHaveTextContent('')
  })

  it('onChange works', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()
    const Wrapper = () => {
      const [value, setValue] = useState(inputValue)

      return (
        <TextArea
          name={inputName}
          value={value}
          placeholder={inputPlaceholder}
          label={inputLabel}
          onBlur={onBlur}
          onChange={(e) => {
            setValue(e.target.value)
            onChange(e)
          }}
        />
      )
    }

    const { container } = await renderAndCheckA11Y(<Wrapper />)

    expect(onChange).toHaveBeenCalledTimes(0)

    const textarea = container.querySelector('textarea')!

    await act(async () => {
      fireEvent.change(container.querySelector('textarea')!, { target: { value: 'value' } })
    })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(textarea.value).toBe('value')
  })

  it('onBlur works', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const { container } = await renderAndCheckA11Y(
      <TextArea
        name={inputName}
        value={inputValue}
        placeholder={inputPlaceholder}
        label={inputLabel}
        onBlur={onBlur}
        onChange={onChange}
      />,
    )

    expect(onBlur).toHaveBeenCalledTimes(0)

    await act(async () => {
      fireEvent.blur(container.querySelector('textarea')!)
    })

    expect(onBlur).toHaveBeenCalledTimes(1)
  })

  it('Renders error with correct props', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()
    const error = 'error'

    const { container } = await renderAndCheckA11Y(
      <TextArea
        error={error}
        name={inputName}
        value={inputValue}
        placeholder={inputPlaceholder}
        label={inputLabel}
        onBlur={onBlur}
        onChange={onChange}
      />,
    )

    const label = screen.queryByTestId('textarea-label')!

    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('for', inputId)
    expect(label).toHaveTextContent(inputLabel)

    const textarea = container.querySelector('textarea')!

    expect(textarea).toBeInTheDocument()
    expect(textarea).toHaveProperty('value', inputValue)
    expect(textarea).toHaveAttribute('placeholder', inputPlaceholder)
    expect(textarea).toHaveAttribute('id', inputId)
    expect(textarea).toHaveAttribute('name', inputName)
    expect(textarea).toHaveAttribute('aria-invalid', 'true')
    expect(textarea).not.toHaveAttribute('aria-required')
    expect(textarea).not.toHaveAttribute('aria-describedby')
    expect(textarea).toHaveAttribute('aria-errormessage', 'inputId-error')
    expect(textarea).not.toHaveAttribute('required')
    expect(textarea).not.toHaveAttribute('disabled')
    expect(textarea).not.toHaveAttribute('rows')

    const errorEl = screen.getByTestId('textarea-error')!

    expect(errorEl).toBeInTheDocument()
    expect(errorEl).toHaveAttribute('id', errorId(inputId))
    expect(errorEl).toHaveClass(styles.errorContainer)
    expect(errorEl).toHaveTextContent(error)
  })

  it('Renders required with correct props', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const { container } = await renderAndCheckA11Y(
      <TextArea
        name={inputName}
        value={inputValue}
        placeholder={inputPlaceholder}
        label={inputLabel}
        onBlur={onBlur}
        onChange={onChange}
        required
      />,
    )

    const label = screen.queryByTestId('textarea-label')!

    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('for', inputId)
    expect(label).toHaveTextContent(inputLabel)

    const textarea = container.querySelector('textarea')!

    expect(textarea).toBeInTheDocument()
    expect(textarea).toHaveProperty('value', inputValue)
    expect(textarea).toHaveAttribute('placeholder', inputPlaceholder)
    expect(textarea).toHaveAttribute('id', inputId)
    expect(textarea).toHaveAttribute('name', inputName)
    expect(textarea).toHaveAttribute('aria-invalid', 'false')
    expect(textarea).toHaveAttribute('aria-required', 'true')
    expect(textarea).not.toHaveAttribute('aria-describedby')
    expect(textarea).not.toHaveAttribute('aria-errormessage')
    expect(textarea).toHaveAttribute('required')
    expect(textarea).not.toHaveAttribute('disabled')
    expect(textarea).not.toHaveAttribute('rows')

    const error = screen.getByTestId('textarea-error')!

    expect(error).toBeInTheDocument()
    expect(error).toHaveAttribute('id', errorId(inputId))
    expect(error).toHaveClass(styles.errorContainer)
    expect(error).toHaveTextContent('')
  })

  it('Renders disabled with correct props', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const { container } = await renderAndCheckA11Y(
      <TextArea
        name={inputName}
        value={inputValue}
        placeholder={inputPlaceholder}
        label={inputLabel}
        onBlur={onBlur}
        onChange={onChange}
        disabled
      />,
    )

    const label = screen.queryByTestId('textarea-label')!

    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('for', inputId)
    expect(label).toHaveTextContent(inputLabel)

    const textarea = container.querySelector('textarea')!

    expect(textarea).toBeInTheDocument()
    expect(textarea).toHaveProperty('value', inputValue)
    expect(textarea).toHaveAttribute('placeholder', inputPlaceholder)
    expect(textarea).toHaveAttribute('id', inputId)
    expect(textarea).toHaveAttribute('name', inputName)
    expect(textarea).toHaveAttribute('aria-invalid', 'false')
    expect(textarea).not.toHaveAttribute('aria-required')
    expect(textarea).not.toHaveAttribute('aria-describedby')
    expect(textarea).not.toHaveAttribute('aria-errormessage')
    expect(textarea).not.toHaveAttribute('required')
    expect(textarea).toHaveAttribute('disabled')
    expect(textarea).not.toHaveAttribute('rows')

    const errorEl = screen.getByTestId('textarea-error')!

    expect(errorEl).toBeInTheDocument()
    expect(errorEl).toHaveTextContent('')
    expect(errorEl).toHaveAttribute('id', errorId(inputId))
    expect(errorEl).toHaveClass(styles.errorContainer)
  })

  it('Renders helperText', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    await renderAndCheckA11Y(
      <TextArea
        name={inputName}
        value={inputValue}
        placeholder={inputPlaceholder}
        label={inputLabel}
        onBlur={onBlur}
        onChange={onChange}
        helperText={helperText}
      />,
    )

    const helperEl = screen.queryByTestId('textarea-helperText')!

    expect(helperEl).toBeInTheDocument()
  })
})
