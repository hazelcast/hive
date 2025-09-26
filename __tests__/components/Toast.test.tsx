import React from 'react'
import { act, within, screen, fireEvent } from '@testing-library/react'
import { AlertTriangle, CheckCircle, Info, AlertCircle } from 'react-feather'
import { renderAndCheckA11Y } from '../../src'
import userEvent from '@testing-library/user-event'

import { Toast, ToastType, ToastIconDescriptor } from '../../src/components/Toast'

const content = 'Toast Content'

describe('Toast', () => {
  const toastBasicTestData: [ToastType, ToastIconDescriptor][] = [
    [
      'success',
      {
        icon: CheckCircle,
        ariaLabel: 'Check circle icon',
      },
    ],
    [
      'info',
      {
        icon: Info,
        ariaLabel: 'Info circle icon',
      },
    ],
    [
      'warning',
      {
        icon: AlertTriangle,
        ariaLabel: 'Warning triangle icon',
      },
    ],
    [
      'critical',
      {
        icon: AlertCircle,
        ariaLabel: 'Info critical circle icon',
      },
    ],
  ]

  it.each(toastBasicTestData)('Renders %s Toast with correct icon and content', async (type, { ariaLabel }) => {
    await renderAndCheckA11Y(<Toast type={type} content={content} />)

    const AlertElement = screen.queryByTestId('toast')!

    expect(AlertElement).toBeInTheDocument()
    expect(within(AlertElement).queryByTestId('toast-content')).toHaveTextContent(content)

    const iconEl = screen.queryByTestId('toast-icon')!

    expect(iconEl).toBeInTheDocument()
    expect(iconEl.querySelector('svg')).toHaveAttribute('aria-label', ariaLabel)
  })

  it('Renders X as a close button when onClose is passed', async () => {
    const closeToast = jest.fn()

    await renderAndCheckA11Y(<Toast type="success" content={content} closeToast={closeToast} />)

    expect(screen.queryByTestId('toast-close')).toBeInTheDocument()
    expect(closeToast).toHaveBeenCalledTimes(0)

    await act(() => userEvent.click(screen.getByTestId('toast-close')))

    expect(closeToast).toHaveBeenCalledTimes(1)
  })

  it('Toast.closeToast called after simulating Escape key', async () => {
    const closeToast = jest.fn()

    await renderAndCheckA11Y(<Toast type="success" content={content} closeToast={closeToast} />)

    expect(closeToast).toHaveBeenCalledTimes(0)

    act(() => {
      const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
      document.dispatchEvent(event)
    })

    expect(closeToast).toHaveBeenCalledTimes(1)
  })

  it('Toast.dismissableByEscKey = false means no Esc key handling', async () => {
    const closeToast = jest.fn()

    await renderAndCheckA11Y(<Toast type="success" content={content} dismissableByEscKey={false} closeToast={closeToast} />)

    expect(closeToast).toHaveBeenCalledTimes(0)

    await act(async () => {
      fireEvent.keyDown(document, { key: 'Escape', bubbles: true })
    })

    expect(closeToast).toHaveBeenCalledTimes(0)
  })

  it('2 instances of Toast should close in order', async () => {
    const closeToast1 = jest.fn()
    const closeToast2 = jest.fn()

    await renderAndCheckA11Y(
      <div>
        <Toast type="success" content={content} closeToast={closeToast1} />
        <Toast type="info" content={content} closeToast={closeToast2} />
      </div>,
    )

    expect(closeToast1).toHaveBeenCalledTimes(0)
    expect(closeToast2).toHaveBeenCalledTimes(0)

    // first press

    await act(async () => {
      fireEvent.keyDown(document, { key: 'Escape', bubbles: true })
    })

    // first in first out
    expect(closeToast1).toHaveBeenCalledTimes(1)
    expect(closeToast2).toHaveBeenCalledTimes(0)

    // second press

    await act(async () => {
      fireEvent.keyDown(document, { key: 'Escape', bubbles: true })
    })

    expect(closeToast1).toHaveBeenCalledTimes(1)
    expect(closeToast2).toHaveBeenCalledTimes(1)
  })
})
