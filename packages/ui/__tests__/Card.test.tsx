import React from 'react'
import { Database } from 'react-feather'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'
import { DataTestProp } from '@hazelcast/helpers'

import { Card, IconButton, IconButtonProps, IconProps } from '../src'

import styles from '../src/Card.module.scss'

describe('Card', () => {
  const cardHeadingIcon = Database
  const cardHeadingTitle = 'Card title'
  const cardHeadingContent = <IconButton kind="primary" ariaLabel="Check out the Database" icon={Database} component="a" href="#" />
  const cardContent = 'Card content'

  it('renders title and content', async () => {
    const wrapper = await mountAndCheckA11Y(<Card title={cardHeadingTitle}>{cardContent}</Card>)

    const card = wrapper.findDataTest('card-wrapper')
    const title = card.findDataTest('card-heading').findDataTest('card-heading-title')
    const content = card.findDataTest('card-content')

    expect(title.props()).toEqual({
      'data-test': 'card-heading-title',
      className: styles.title,
      children: cardHeadingTitle,
    })

    expect(content.props()).toEqual({
      'data-test': 'card-content',
      className: styles.content,
      children: cardContent,
    })
  })

  it('renders heading with icon, title and additiona content, also renders separator and card content', async () => {
    const wrapper = await mountAndCheckA11Y(
      <Card headingIcon={cardHeadingIcon} title={cardHeadingTitle} headingContent={cardHeadingContent} separator>
        {cardContent}
      </Card>,
    )

    const card = wrapper.findDataTest('card-wrapper')
    const heading = card.findDataTest('card-heading')
    const headingIcon = heading.findDataTest('card-heading-icon')
    const headingTitle = heading.findDataTest('card-heading-title')
    const headingContent = heading.childAt(2)
    const separator = card.findDataTest('card-separator')
    const content = card.findDataTest('card-content')

    expect(headingIcon.props()).toEqual<IconProps & DataTestProp>({
      'data-test': 'card-heading-icon',
      className: styles.icon,
      ariaHidden: true,
      icon: cardHeadingIcon,
    })

    expect(headingTitle.props()).toEqual({
      'data-test': 'card-heading-title',
      className: `${styles.title} ${styles.space}`,
      children: cardHeadingTitle,
    })

    expect(separator.props()).toEqual({
      'data-test': 'card-separator',
      className: styles.separator,
    })

    expect(headingContent.type()).toEqual(IconButton)
    expect(headingContent.props()).toEqual<IconButtonProps>({
      kind: 'primary',
      ariaLabel: 'Check out the Database',
      icon: Database,
      component: 'a',
      href: '#',
    })

    expect(content.props()).toEqual({
      'data-test': 'card-content',
      className: styles.content,
      children: cardContent,
    })
  })
})
