import React from 'react'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import { DataTestProp } from '@hazelcast/helpers'
import { Database } from 'react-feather'

import { Card, CardProps, IconButton, IconButtonProps, IconProps } from '../src'

import styles from '../src/Card.module.scss'

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
      separator: false,
    },
    {
      title: cardTitle,
      iconButton: Database,
      iconButtonHref: '#',
      ariaLabel: 'Check out the Database',
    },
  ]

  it.each(cardLayoutTestData)('Renders correct layout for specific component configurations.', async (props) => {
    const wrapper = await mountAndCheckA11Y(<Card {...props}>{cardContent}</Card>)

    const icon = wrapper.findDataTest('card-icon')
    const title = wrapper.findDataTest('card-heading')
    const separator = wrapper.findDataTest('card-separator')

    expect(title.text()).toEqual(props.title)
    expect(title.getDOMNode().tagName).toEqual('H3')

    if (props.icon) {
      expect(icon.props()).toEqual<IconProps & DataTestProp>({
        'data-test': 'card-icon',
        icon: props.icon,
        className: 'icon',
        ariaHidden: true,
      })
    } else {
      expect(icon.exists()).toBe(false)
    }

    if (props.separator) {
      expect(separator.exists()).toBe(true)
    } else {
      expect(separator.exists()).toBe(false)
    }

    if (props.iconButton) {
      expect(wrapper.find(IconButton).props()).toEqual<IconButtonProps>({
        className: styles.iconButton,
        kind: 'primary',
        component: 'a',
        icon: props.iconButton,
        href: props.iconButtonHref,
        ariaLabel: props.ariaLabel,
      })
    }

    expect(wrapper.findDataTest('card-wrapper').exists()).toBe(true)
    expect(wrapper.findDataTest('card-content').exists()).toBe(true)
    expect(wrapper.findDataTest('card-content').text()).toEqual(cardContent)
  })
})
