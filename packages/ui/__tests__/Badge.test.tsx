import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import React from 'react'
import { Info, CheckCircle, AlertTriangle, AlertCircle } from 'react-feather'

import { Badge, BadgeType, BadgeSize, BadgeIconDescriptor } from '../src/Badge'

import styles from '../src/Badge.module.scss'

const badgeContent = 'Badge Text'

describe('Badge', () => {
  it('Renders Badge with all necessary components', async () => {
    const wrapper = await mountAndCheckA11Y(<Badge type="neutral" size="normal" content={badgeContent} />)

    expect(wrapper.findDataTest('badge-icon').prop('size')).toBe('medium')
    expect(wrapper.findDataTest('badge-content').text()).toBe(badgeContent)
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

  it.each(typeTestData)('Renders correct styles for %s Badge type', async (type, className, { icon, ariaLabel }) => {
    const wrapper = await mountAndCheckA11Y(<Badge type={type} size="normal" content={badgeContent} />)

    expect(wrapper.findDataTest('badge-container').prop('className')).toContain(className)
    expect(wrapper.findDataTest('badge-icon').props()).toMatchObject({
      ariaLabel,
      icon,
      size: 'medium',
    })
  })

  const sizeTestData: [BadgeSize, string][] = [
    ['normal', styles.normal],
    ['small', styles.small],
  ]

  it.each(sizeTestData)('Renders correct styles for %s Badge size', async (size, className) => {
    const wrapper = await mountAndCheckA11Y(<Badge type="neutral" size={size} content={badgeContent} />)

    expect(wrapper.findDataTest('badge-container').prop('className')).toContain(className)
  })
})
