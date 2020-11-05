import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import React from 'react'
import { Info, CheckCircle, AlertTriangle, AlertCircle } from 'react-feather'

import { Badge, BadgeType, IconDescriptor } from '../src/Badge'

import styles from '../src/Badge.module.scss'

const badgeContent = 'Badge Text'

describe('Badge', () => {
  it('Renders Badge with all necessary components', async () => {
    const wrapper = await mountAndCheckA11Y(<Badge type="neutral" content={badgeContent} />)

    expect(wrapper.findDataTest('badge-icon').exists()).toBeTruthy()
    expect(wrapper.findDataTest('badge-content').text()).toBe(badgeContent)
  })

  const typeTestData: [BadgeType, string, IconDescriptor][] = [
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
    const wrapper = await mountAndCheckA11Y(<Badge type={type} content={badgeContent} />)

    expect(wrapper.findDataTest('badge-container').prop('className')).toContain(className)
    expect(wrapper.findDataTest('badge-icon').props()).toMatchObject({
      ariaLabel,
      icon,
    })
  })
})
