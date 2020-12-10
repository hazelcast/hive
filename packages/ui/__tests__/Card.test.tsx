import React from 'react'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'

import { Card, CardProps, Icon, IconProps } from '../src'
import { Database } from 'react-feather'

describe('Card', () => {
  const cardTitle = 'Card title'
  const cardContent = 'Card content'

  const cardLayoutTestData: CardProps[] = [
    {
      title: cardTitle,
    },
    {
      title: cardTitle,
      icon: Database,
    },
    {
      title: cardTitle,
      icon: Database,
      separator: true,
    },
    {
      title: cardTitle,
      icon: Database,
      separator: true,
    },
  ]

  it.each(cardLayoutTestData)('Renders correct layout for specific component configurations.', async (props) => {
    const wrapper = await mountAndCheckA11Y(<Card {...props}>{cardContent}</Card>)

    const icon = wrapper.find(Icon)
    const title = wrapper.findDataTest('card-heading')
    const separator = wrapper.findDataTest('card-separator')

    if (props.title) {
      expect(title.text()).toEqual(props.title)
      expect(title.getDOMNode().tagName).toEqual('H3')
    } else {
      expect(title.length).toEqual(0)
    }

    if (props.icon) {
      expect(wrapper.find(Icon).props()).toEqual<IconProps>({
        icon: props.icon,
        className: 'icon',
        ariaHidden: true,
      })
    } else {
      expect(icon.length).toEqual(0)
    }

    if (props.separator) {
      expect(separator.length).toEqual(1)
    } else {
      expect(separator.length).toEqual(0)
    }

    expect(wrapper.findDataTest('card-wrapper').length).toEqual(1)
    expect(wrapper.findDataTest('card-content').length).toEqual(1)
    expect(wrapper.findDataTest('card-content').text()).toEqual(cardContent)
  })
})
