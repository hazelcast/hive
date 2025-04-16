import { renderAndCheckA11Y } from '../../src'
import React from 'react'
import { Info, CheckCircle, AlertTriangle, AlertCircle } from 'react-feather'
import { screen, within } from '@testing-library/react'

import { Badge, BadgeType, BadgeSize, BadgeIconDescriptor } from '../../src/components/Badge'

import styles from '../../src/components/Badge.module.scss'

const badgeContent = 'Badge Text'

describe('Badge', () => {
  it('Renders Badge with all necessary components', async () => {
    await renderAndCheckA11Y(<Badge type="neutral" size="normal" content={badgeContent} />)

    expect(screen.getByTestId('badge-icon').querySelector('svg')).toHaveClass('medium')
    expect(screen.getByTestId('badge-content')).toHaveTextContent(badgeContent)
  })

  const typeTestData: [BadgeType, string, BadgeIconDescriptor][] = [
    [
      'neutral',
      styles.neutral,
      {
        icon: Info,
        ariaLabel: 'Info circle icon',
      },
    ],
    [
      'success',
      styles.success,
      {
        icon: CheckCircle,
        ariaLabel: 'Check circle icon',
      },
    ],
    [
      'warning',
      styles.warning,
      {
        icon: AlertTriangle,
        ariaLabel: 'Warning triangle icon',
      },
    ],
    [
      'info',
      styles.info,
      {
        icon: Info,
        ariaLabel: 'Info circle icon',
      },
    ],
    [
      'critical',
      styles.critical,
      {
        icon: AlertCircle,
        ariaLabel: 'Info critical circle icon',
      },
    ],
  ]

  it.each(typeTestData)('Renders correct styles for %s Badge type', async (type, className, { ariaLabel }) => {
    await renderAndCheckA11Y(<Badge type={type} size="small" content={badgeContent} />)

    expect(screen.getByTestId('badge-container')).toHaveClass(className)
    expect(within(screen.getByTestId('badge-icon')).queryByLabelText(ariaLabel)).toBeInTheDocument()
    expect(screen.getByTestId('badge-icon').querySelector('svg')).toHaveClass('small')
  })

  const sizeTestData: [BadgeSize, string][] = [
    ['normal', styles.normal],
    ['small', styles.small],
  ]

  it.each(sizeTestData)('Renders correct styles for %s Badge size', async (size, className) => {
    await renderAndCheckA11Y(<Badge type="neutral" size={size} content={badgeContent} />)

    expect(screen.getByTestId('badge-container')).toHaveClass(className)
  })
})
