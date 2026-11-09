import React from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { ToastContainer, toast } from '../../src'

describe('toast service', () => {
  afterEach(() => {
    act(() => toast.dismiss())
  })

  it('renders custom React content with a stable ID and close callback', async () => {
    const onClose = jest.fn()
    const id = toast.custom(({ closeToast }) => <button onClick={closeToast}>Close custom toast</button>, {
      toastId: 42,
      variant: 'warn',
      autoClose: false,
      closeButton: false,
      onClose,
    })

    expect(id).toBe('42')
    expect(toast.isActive(42)).toBe(true)
    render(<ToastContainer />)

    expect(screen.getByRole('list', { name: 'Notifications' })).toBeInTheDocument()
    act(() => fireEvent.click(screen.getByRole('button', { name: 'Close custom toast' })))

    expect(toast.isActive('42')).toBe(false)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('dismisses by ID and dismisses all remaining toasts once', () => {
    const firstOnClose = jest.fn()
    const secondOnClose = jest.fn()
    toast.info('First', { toastId: 'first', autoClose: false, onClose: firstOnClose })
    toast.error('Second', { toastId: 'second', autoClose: false, onClose: secondOnClose })

    act(() => toast.dismiss('first'))
    expect(toast.isActive('first')).toBe(false)
    expect(toast.isActive('second')).toBe(true)
    expect(firstOnClose).toHaveBeenCalledTimes(1)

    act(() => toast.dismiss())
    expect(toast.isActive('second')).toBe(false)
    expect(secondOnClose).toHaveBeenCalledTimes(1)
  })

  it('auto-dismisses after the requested duration', async () => {
    const id = toast.success('Short-lived', { toastId: 'timed', autoClose: 100 })
    render(<ToastContainer />)

    expect(await screen.findByText('Short-lived')).toBeInTheDocument()
    await waitFor(() => expect(toast.isActive(id)).toBe(false), { timeout: 1500 })
  })

  it('honors closeOnClick and can omit the close button', async () => {
    const clickableId = toast.info('Click to dismiss', {
      toastId: 'clickable',
      autoClose: false,
      closeButton: false,
      closeOnClick: true,
    })
    render(<ToastContainer />)

    expect(screen.queryByRole('button', { name: 'Close Info notification' })).not.toBeInTheDocument()
    act(() => fireEvent.click(screen.getByText('Click to dismiss')))
    expect(toast.isActive(clickableId)).toBe(false)

    let persistentId = ''
    act(() => {
      persistentId = toast.info('Keep open on click', {
        toastId: 'persistent',
        autoClose: false,
        closeButton: false,
        closeOnClick: false,
      })
    })
    await waitFor(() => expect(screen.getByText('Keep open on click')).toBeInTheDocument())
    act(() => fireEvent.click(screen.getByText('Keep open on click')))
    expect(toast.isActive(persistentId)).toBe(true)
  })
})
