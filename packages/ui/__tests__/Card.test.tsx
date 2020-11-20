import React from 'react'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'

import { Card, CardProps, Icon } from '../src'
import { Archive, Database } from 'react-feather'
import { IconButton } from '../src/IconButton'

describe('Card', () => {
  const cardTitle = 'Card title'
  const cardContent = 'Card content'

  const cardLayoutTestData: (CardProps & { headingType?: 'H2' | 'H3' })[] = [
    {
      title: cardTitle,
      headingType: 'H2',
    },
    {
      title: cardTitle,
      type: 'primary',
      headingType: 'H2',
      icon: Database,
    },
    {
      title: cardTitle,
      type: 'secondary',
      headingType: 'H3',
      iconButton: {
        iconAriaLabel: 'label',
        icon: Archive,
      },
    },
    {
      title: cardTitle,
      type: 'highlighter',
      headingType: 'H3',
    },
    {
      type: 'primary',
    },
    {
      type: 'secondary',
    },
  ]

  it.each(cardLayoutTestData)('Renders correct layout for specific component configurations.', async ({ headingType, ...rest }) => {
    const wrapper = await mountAndCheckA11Y(<Card {...rest}>{cardContent}</Card>)

    if (rest.title) {
      expect(wrapper.findDataTest('card-heading').getDOMNode().tagName).toBe(headingType)
    }

    if (!rest.title) {
      expect(wrapper.findDataTest('card-heading').length).toBe(0)
    }

   if (rest.icon) {
      expect(wrapper.find(Icon).props()).toEqual<IconProps>({
        icon: rest.icon,
        color: styleConsts.colorPrimary,
        size: rest.type === undefined || rest.type === 'primary' ? 'normal' : 'small',
        ariaHidden: true,
      })
    }

    if (rest.iconButton) {
      expect(wrapper.find(IconButton).props()).toEqual<IconButtonProps>({
        kind: 'transparent',
        color: styleConsts.colorPrimary,
        size: rest.type === undefined || rest.type === 'primary' ? 'normal' : 'small',
        ...rest.iconButton,
      })
    }

    expect(wrapper.findDataTest('card-wrapper').length).toBe(1)
    expect(wrapper.findDataTest('card-content').length).toBe(1)
    expect(wrapper.findDataTest('card-content').text()).toBe(cardContent)
  })
})
