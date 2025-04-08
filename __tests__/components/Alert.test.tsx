import React from 'react'
import { fireEvent, screen, within } from '@testing-library/react'
import { renderAndCheckA11Y } from '../../src'

import { Clipboard } from 'react-feather'
import { ToastType } from '../../src/components/Toast'
import { Alert, AlertActionButton, AlertActionLink } from '../../src/components/Alert'

import styles from '../../src/components/Alert.module.scss'
import userEvent from '@testing-library/user-event'

const title = 'Alert Title'
const content = 'Alert Content'
const noOp = jest.fn()

const AlertAction1: AlertActionButton = {
  text: 'Copy',
  onClick: noOp,
  icon: Clipboard,
  ariaLabel: 'Icon copy to clipboard',
}

const AlertAction2: AlertActionLink = {
  text: 'Link',
  href: '#',
  target: '_blank',
  rel: 'nofollow',
}

describe('Alert', () => {
  const alertBasicTestData: [ToastType, string, string][] = [
    ['success', 'Check circle icon', styles.success],
    ['info', 'Info circle icon', styles.info],
    ['warning', 'Warning triangle icon', styles.warning],
    ['critical', 'Info critical circle icon', styles.critical],
  ]

  it.each(alertBasicTestData)('Renders %s Alert with correct className, icon, title and content', async (type, ariaLabel, className) => {
    await renderAndCheckA11Y(<Alert type={type} title={title} content={content} closeToast={noOp} />)

    expect(screen.getByTestId('alert')).toHaveClass(`alert ${className}`)
    expect(screen.getByTestId('alert-title')).toHaveTextContent(title)
    expect(screen.queryByText(content)).toBeInTheDocument()
    expect(within(screen.getByTestId('alert-icon')).queryByLabelText(ariaLabel)).toBeInTheDocument()
    expect(screen.queryByTestId('alert-close')).toBeInTheDocument()
    expect(screen.queryByTestId('alert-actions')).not.toBeInTheDocument()
  })

  it('Correct props are passed to an underlying Link Action component', async () => {
    await renderAndCheckA11Y(<Alert type="success" title={title} content={content} actions={[AlertAction2]} />)

    const link = screen.getByTestId('alert-actions').querySelector('a')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', AlertAction2.href)
    expect(link).toHaveAttribute('rel', AlertAction2.rel)
    expect(link).toHaveAttribute('target', AlertAction2.target)
  })

  it('Correct props are passed to an underlying Button Action component', async () => {
    await renderAndCheckA11Y(<Alert type="success" title={title} content={content} actions={[AlertAction1]} />)

    const actions = screen.getByTestId('alert-actions')
    expect(within(actions).queryByText(AlertAction1.text)).toBeInTheDocument()
    expect(within(actions).queryByLabelText(AlertAction1.ariaLabel)).toBeInTheDocument()
  })

  it('Close button calls closeToast prop handler', async () => {
    const closeToast = jest.fn()

    await renderAndCheckA11Y(<Alert type="success" title={title} content={content} closeToast={closeToast} />)

    expect(closeToast).toHaveBeenCalledTimes(0)

    await userEvent.click(screen.getByTestId('alert-close'))

    expect(closeToast).toHaveBeenCalledTimes(1)
  })

  const alertActionsTestData: Array<[string, Array<AlertActionLink | AlertActionButton>]> = [
    ['1 action', [AlertAction1]],
    ['2 actions', [AlertAction1, AlertAction2]],
  ]

  it.each(alertActionsTestData)('Renders correct text properties for Alert with %s', async (_, actions) => {
    await renderAndCheckA11Y(<Alert type="success" title={title} content={content} closeToast={noOp} actions={actions} />)

    actions.forEach((action) => {
      expect(screen.queryByText(action.text)).toBeInTheDocument()
    })
  })

  it('Renders only text content with an empty array passed as "actions" property', async () => {
    await renderAndCheckA11Y(<Alert type="success" title={title} content={content} closeToast={noOp} actions={[]} />)

    expect(screen.getByTestId('alert-body')).toHaveTextContent(content)
  })

  it('Alert.closeToast called after simulating Escape key', async () => {
    const closeToast = jest.fn()

    await renderAndCheckA11Y(<Alert type="success" title={title} content={content} closeToast={closeToast} />)

    expect(closeToast).toHaveBeenCalledTimes(0)

    fireEvent.keyDown(document.body, { key: 'Escape', charCode: 13 })

    expect(closeToast).toHaveBeenCalledTimes(1)
  })

  it('Alert.dismissibleByEscKey = false means no Esc key handling', async () => {
    const closeToast = jest.fn()

    await renderAndCheckA11Y(<Alert type="success" dismissableByEscKey={false} title={title} content={content} closeToast={closeToast} />)

    expect(closeToast).toHaveBeenCalledTimes(0)

    fireEvent.keyDown(document.body, { key: 'Escape', charCode: 13 })

    expect(closeToast).toHaveBeenCalledTimes(0)
  })
})
