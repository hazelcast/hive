import React from 'react'
import { render } from '@testing-library/react'
import ReactModal from 'react-modal'
import { Settings } from 'react-feather'
import { screen, within } from '@testing-library/react'
import cn from 'classnames'
import userEvent from '@testing-library/user-event'

import { Overlay } from '../src'

import styles from '../src/Overlay.module.scss'
import iconStyles from '../src/Icon.module.scss'

const title = 'Modal Title'
const icon = Settings
const content = <div>Content</div>
const onClose = jest.fn()

describe('Overlay', () => {
  beforeAll(() => {
    ReactModal.setAppElement('body')
  })

  it('Renders all expected components', () => {
    render(
      <Overlay isOpen onClose={onClose} title={title} icon={icon}>
        {content}
      </Overlay>,
    )

    const overlayWrapper = screen.getByTestId('overlay-wrapper')
    const header = within(overlayWrapper).getByTestId('overlay-header')
    const headerIcon = within(header).getByTestId('overlay-header-icon').querySelector('svg') as SVGElement
    const headerTitle = within(header).getByTestId('overlay-header-title')
    const headerCancelButton = within(header).getByTestId('overlay-header-cancel-button')
    const overlayContent = within(overlayWrapper).getByTestId('overlay-content')

    expect(overlayWrapper).toHaveClass(cn(styles.wrapper, styles.normal))
    expect(header).toHaveClass(styles.header)
    expect(headerIcon).toHaveClass(styles.icon)
    expect(headerIcon).toHaveClass(iconStyles.medium)
    expect(headerIcon).toHaveAttribute('aria-hidden', 'true')
    expect(headerTitle).toHaveClass(styles.title)
    expect(headerCancelButton).toHaveClass(styles.close)
    expect(overlayContent).toHaveClass(styles.content)
    expect(overlayContent).toHaveClass(styles.content)
    expect(overlayContent).toHaveTextContent('Content')
  })

  it('Renders fullscreen wrapper', () => {
    render(
      <Overlay isOpen onClose={onClose} title={title} icon={icon} contentWidth="fullscreen">
        {content}
      </Overlay>,
    )

    expect(screen.getByTestId('overlay-wrapper')).toHaveClass(cn(styles.wrapper, styles.fullscreen))
  })

  it('Does not render anything when isOpen is false', () => {
    render(
      <Overlay isOpen={false} onClose={onClose} title={title} icon={icon}>
        {content}
      </Overlay>,
    )

    expect(screen.queryByTestId('overlay-wrapper')).not.toBeInTheDocument()
  })

  it('Can be closed via top-right cancel button', async () => {
    render(
      <Overlay isOpen onClose={onClose} title={title} icon={icon}>
        {content}
      </Overlay>,
    )

    const closeButton = screen.getByTestId('overlay-header-cancel-button')

    expect(onClose).toHaveBeenCalledTimes(0)

    await userEvent.click(closeButton)

    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
