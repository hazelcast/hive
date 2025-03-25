import React, { useState } from 'react'
import { act, fireEvent, screen } from '@testing-library/react'
import { renderAndCheckA11Y } from '@hazelcast/test-helpers'
import { useUID } from 'react-uid'
import userEvent from '@testing-library/user-event'

import { TextField } from '../src/TextField'

import styles from '../src/TextField.module.scss'
import labelStyles from '../src/Label.module.scss'

jest.mock('react-uid')

const useUIDMock = useUID as jest.Mock<ReturnType<typeof useUID>>

describe('TextField', () => {
  beforeEach(() => {
    useUIDMock.mockImplementation(() => 'republic')
  })

  it('Renders the default with correct props', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()
    const onKeyDown = jest.fn()

    const { container } = await renderAndCheckA11Y(
      <TextField
        name="name"
        value="Yoda"
        placeholder="Enter the name"
        label="Wisest jedi"
        onBlur={onBlur}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />,
    )

    const label = screen.queryByTestId('text-field-header-label')!

    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('for', 'republic')
    expect(label).toHaveClass(styles.label)
    expect(label).toHaveClass(labelStyles.primary)
    expect(label).toHaveTextContent('Wisest jedi')

    const input = container.querySelector('input')!

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
    expect(input).toHaveAttribute('id', 'republic')
    expect(input).toHaveAttribute('value', 'Yoda')
    expect(input).toHaveAttribute('name', 'name')
    expect(input).toHaveAttribute('placeholder', 'Enter the name')
    expect(input).toHaveAttribute('aria-invalid', 'false')
    expect(input).not.toHaveAttribute('aria-required')
    expect(input).not.toHaveAttribute('aria-describedby')
    expect(input).not.toHaveAttribute('aria-errormessage')
    expect(input).not.toHaveAttribute('disabled')
    expect(input).not.toHaveClass()

    const errorEl = screen.getByTestId('text-field-error')!

    expect(errorEl).toBeInTheDocument()
    expect(errorEl).toHaveAttribute('id', 'republic-error')
    expect(errorEl).toHaveClass(styles.errorContainer)
    expect(errorEl).toHaveTextContent('')

    expect(screen.queryByTestId('ext-field-header-helperText')).not.toBeInTheDocument()
  })

  it('onChange works', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()
    const Wrapper = () => {
      const [value, setValue] = useState('')
      return (
        <TextField
          name="name"
          value={value}
          placeholder="Enter the name"
          label="Wisest jedi"
          onBlur={onBlur}
          onChange={(e) => {
            setValue(e.target.value)
            onChange(e)
          }}
        />
      )
    }

    const { container } = await renderAndCheckA11Y(<Wrapper />)

    expect(onChange).toBeCalledTimes(0)

    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      fireEvent.change(container.querySelector('input')!, { target: { value: 'Luke' } })
    })

    expect(onChange).toBeCalledTimes(1)
    expect(onChange.mock.calls[0][0]).toMatchObject({ target: { value: 'Luke' } })
  })

  it('onBlur works', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const { container } = await renderAndCheckA11Y(
      <TextField name="name" value="Yoda" placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} />,
    )

    expect(onBlur).toBeCalledTimes(0)

    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      fireEvent.blur(container.querySelector('input')!)
    })

    expect(onBlur).toBeCalledTimes(1)
  })

  it('Renders helper text', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const { container } = await renderAndCheckA11Y(
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

    const label = screen.queryByTestId('text-field-header-label')!

    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('for', 'republic')
    expect(label).toHaveClass(styles.label)
    expect(label).toHaveClass(labelStyles.primary)
    expect(label).toHaveTextContent('Wisest jedi')

    const input = container.querySelector('input')!

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
    expect(input).toHaveAttribute('id', 'republic')
    expect(input).toHaveAttribute('value', 'Yoda')
    expect(input).toHaveAttribute('name', 'name')
    expect(input).toHaveAttribute('placeholder', 'Enter the name')
    expect(input).toHaveAttribute('aria-invalid', 'false')
    expect(input).not.toHaveAttribute('aria-required')
    expect(input).toHaveAttribute('aria-describedby', 'republic-help')
    expect(input).not.toHaveAttribute('aria-errormessage')
    expect(input).not.toHaveAttribute('disabled')
    expect(input).not.toHaveClass()

    const errorEl = screen.getByTestId('text-field-error')!

    expect(errorEl).toBeInTheDocument()
    expect(errorEl).toHaveAttribute('id', 'republic-error')
    expect(errorEl).toHaveClass(styles.errorContainer)
    expect(errorEl).toHaveTextContent('')

    const helperEl = screen.queryByTestId('text-field-header-helperText')!

    expect(helperEl).toBeInTheDocument()
    expect(helperEl).toHaveClass(styles.helperText)
    expect(screen.queryByTestId('tooltip-sr')).toHaveAttribute('id', 'republic-help')
    expect(screen.queryByTestId('tooltip-overlay')).toHaveTextContent('A long time ago in a galaxy far, far away....')
  })

  it('Renders error with correct props', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const { container } = await renderAndCheckA11Y(
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

    const label = screen.queryByTestId('text-field-header-label')!

    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('for', 'republic')
    expect(label).toHaveClass(styles.label)
    expect(label).toHaveClass(labelStyles.primary)
    expect(label).toHaveTextContent('Wisest jedi')

    const input = container.querySelector('input')!

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
    expect(input).toHaveAttribute('id', 'republic')
    expect(input).toHaveAttribute('value', 'Yoda')
    expect(input).toHaveAttribute('name', 'name')
    expect(input).toHaveAttribute('placeholder', 'Enter the name')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).not.toHaveAttribute('aria-required')
    expect(input).not.toHaveAttribute('aria-describedby')
    expect(input).toHaveAttribute('aria-errormessage', 'republic-error')
    expect(input).not.toHaveAttribute('disabled')
    expect(input).not.toHaveClass()

    const errorEl = screen.getByTestId('text-field-error')!

    expect(errorEl).toBeInTheDocument()
    expect(errorEl).toHaveAttribute('id', 'republic-error')
    expect(errorEl).toHaveClass(styles.errorContainer)
    expect(errorEl).toHaveTextContent('Dark side')

    expect(screen.queryByTestId('ext-field-header-helperText')).not.toBeInTheDocument()
  })

  it('Renders required with correct props', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const { container } = await renderAndCheckA11Y(
      <TextField name="name" value="Yoda" placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} required />,
    )

    const label = screen.queryByTestId('text-field-header-label')!

    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('for', 'republic')
    expect(label).toHaveClass(styles.label)
    expect(label).toHaveClass(labelStyles.primary)
    expect(label).toHaveTextContent('Wisest jedi')

    const input = container.querySelector('input')!

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
    expect(input).toHaveAttribute('id', 'republic')
    expect(input).toHaveAttribute('value', 'Yoda')
    expect(input).toHaveAttribute('name', 'name')
    expect(input).toHaveAttribute('placeholder', 'Enter the name')
    expect(input).toHaveAttribute('aria-invalid', 'false')
    expect(input).toHaveAttribute('aria-required')
    expect(input).not.toHaveAttribute('aria-describedby')
    expect(input).not.toHaveAttribute('aria-errormessage')
    expect(input).not.toHaveAttribute('disabled')
    expect(input).not.toHaveClass()

    const errorEl = screen.getByTestId('text-field-error')!

    expect(errorEl).toBeInTheDocument()
    expect(errorEl).toHaveAttribute('id', 'republic-error')
    expect(errorEl).toHaveClass(styles.errorContainer)
    expect(errorEl).toHaveTextContent('')

    expect(screen.queryByTestId('ext-field-header-helperText')).not.toBeInTheDocument()
  })

  it('Renders disabled with correct props', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    const { container } = await renderAndCheckA11Y(
      <TextField name="name" value="Yoda" placeholder="Enter the name" label="Wisest jedi" onBlur={onBlur} onChange={onChange} disabled />,
    )

    const label = screen.queryByTestId('text-field-header-label')!

    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('for', 'republic')
    expect(label).toHaveClass(styles.label)
    expect(label).toHaveClass(labelStyles.primary)
    expect(label).toHaveTextContent('Wisest jedi')

    const input = container.querySelector('input')!

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
    expect(input).toHaveAttribute('id', 'republic')
    expect(input).toHaveAttribute('value', 'Yoda')
    expect(input).toHaveAttribute('name', 'name')
    expect(input).toHaveAttribute('placeholder', 'Enter the name')
    expect(input).toHaveAttribute('aria-invalid', 'false')
    expect(input).not.toHaveAttribute('aria-required')
    expect(input).not.toHaveAttribute('aria-describedby')
    expect(input).not.toHaveAttribute('aria-errormessage')
    expect(input).toHaveAttribute('disabled')
    expect(input).not.toHaveClass()

    const errorEl = screen.getByTestId('text-field-error')!

    expect(errorEl).toBeInTheDocument()
    expect(errorEl).toHaveAttribute('id', 'republic-error')
    expect(errorEl).toHaveClass(styles.errorContainer)
    expect(errorEl).toHaveTextContent('')

    expect(screen.queryByTestId('ext-field-header-helperText')).not.toBeInTheDocument()
  })

  it('Renders inputContainerChild', async () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()
    const InputContainerChild = <div className="r2d2" />

    const { container } = await renderAndCheckA11Y(
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

    expect(container.querySelector(`.${styles.inputContainer} .r2d2`)).toBeInTheDocument()
  })

  it('Should clear field', async () => {
    const onBlur = jest.fn()

    const Wrapper = () => {
      const [value, setValue] = useState('Yoda')

      return (
        <TextField
          data-test="test"
          name="name"
          value={value}
          label="Wisest jedi"
          placeholder="Enter the name"
          onBlur={onBlur}
          onChange={(e) => setValue(e.target.value)}
          clearable
        />
      )
    }
    const { container } = await renderAndCheckA11Y(<Wrapper />)

    expect(container.querySelector('input')).toHaveAttribute('value', 'Yoda')

    await act(() => userEvent.click(screen.getByTestId('test-clear')))

    expect(container.querySelector('input')).toHaveAttribute('value', '')
  })
})
