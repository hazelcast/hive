import React from 'react'
import { render, screen, within } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import { TopNavigation } from '../../../src'
import styles from '../../../src/components/TopNavigation/TopNavigation.module.css'

describe('TopNavigation', () => {
  it('renders consumer content in a header in order', () => {
    render(
      <TopNavigation logo={<a href="/">Logo</a>} name="Cloud" navigation={<button>Cluster</button>} actions={<button>Account</button>}>
        <button>Search</button>
      </TopNavigation>,
    )

    const header = screen.getByRole('banner')
    expect(within(header).getByRole('link', { name: 'Logo' })).toHaveAttribute('href', '/')
    expect(header).toHaveTextContent('LogoCloudClusterSearchAccount')
  })

  it('forwards the controlled mobile menu state and activation', async () => {
    const onClick = jest.fn()
    const { rerender } = render(
      <>
        <TopNavigation mobile logo="Logo" mobileMenu={{ label: 'Open menu', expanded: false, controls: 'sidebar', onClick }} />
        <nav id="sidebar" aria-label="Sidebar" hidden />
      </>,
    )

    const button = screen.getByRole('button', { name: 'Open menu' })
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(button).toHaveAttribute('aria-controls', 'sidebar')
    const sidebar = document.getElementById(button.getAttribute('aria-controls')!)
    expect(sidebar).toBeInTheDocument()
    await userEvent.click(button)
    expect(onClick).toHaveBeenCalledTimes(1)
    rerender(
      <>
        <TopNavigation mobile logo="Logo" mobileMenu={{ label: 'Close menu', expanded: true, controls: 'sidebar', onClick }} />
        <nav id="sidebar" aria-label="Sidebar" />
      </>,
    )
    expect(screen.getByRole('button', { name: 'Close menu' })).toBe(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(document.getElementById(button.getAttribute('aria-controls')!)).toBe(sidebar)
  })

  it('supports alternate logos and independently supplied actions', () => {
    const onClick = jest.fn()
    const { rerender } = render(
      <TopNavigation
        logo={<a href="/">Full logo</a>}
        mobileLogo={<a href="/">Compact logo</a>}
        name="Cloud"
        layout="grouped"
        mobileMenu={{ label: 'Open menu', onClick }}
        actions={<button>Account</button>}
      />,
    )
    expect(screen.getByRole('banner')).toHaveClass(styles.grouped)
    expect(screen.getByRole('banner')).not.toHaveClass(styles.mobile)
    expect(screen.getByRole('link', { name: 'Full logo' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Compact logo' })).not.toBeInTheDocument()
    expect(screen.getByText('Cloud')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Open menu' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Account' })).toBeInTheDocument()
    rerender(
      <TopNavigation mobile logo={<a href="/">Full logo</a>} mobileLogo={<a href="/">Compact logo</a>} name="Cloud" layout="grouped" />,
    )
    expect(screen.getByRole('banner')).toHaveClass(styles.grouped, styles.mobile)
    expect(screen.queryByRole('link', { name: 'Full logo' })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Compact logo' })).toBeInTheDocument()
    expect(screen.queryByText('Cloud')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Open menu' })).not.toBeInTheDocument()
    rerender(<TopNavigation mobile logo={<a href="/">Full logo</a>} />)
    expect(screen.getByRole('link', { name: 'Full logo' })).toBeInTheDocument()
  })

  it('updates controlled menu state and supports keyboard activation', async () => {
    const onClick = jest.fn()
    const { rerender } = render(<TopNavigation mobile logo="Logo" mobileMenu={{ label: 'Open menu', expanded: false, onClick }} />)
    screen.getByRole('button', { name: 'Open menu' }).focus()
    await userEvent.keyboard('{Enter}')
    expect(onClick).toHaveBeenCalledTimes(1)
    rerender(<TopNavigation mobile logo="Logo" mobileMenu={{ label: 'Close menu', expanded: true, onClick }} />)
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true')
  })

  it('keeps focus on the menu button and supports Space activation', async () => {
    const user = userEvent.setup()
    const onClick = jest.fn()
    render(<TopNavigation mobile logo="Logo" mobileMenu={{ label: 'Open menu', expanded: false, onClick }} />)

    await user.tab()
    const button = screen.getByRole('button', { name: 'Open menu' })
    expect(button).toHaveFocus()
    expect(button.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
    await user.keyboard(' ')
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(button).toHaveFocus()
  })
})
