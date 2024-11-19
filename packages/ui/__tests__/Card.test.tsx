import React, { ReactElement } from 'react'
import { Database } from 'react-feather'
import { axe, toHaveNoViolations } from 'jest-axe'
import { render, screen, within } from '@testing-library/react'

import { Card, IconButton } from '../src'

import styles from '../src/Card.module.scss'

expect.extend(toHaveNoViolations)
const renderAndCheckA11Y = async (node: ReactElement) => {
  const result = render(node)

  const results = await axe(result.container)
  expect(results).toHaveNoViolations()

  return result
}

describe('Card', () => {
  const cardHeadingIcon = Database
  const cardHeadingTitle = 'Card title'
  const cardHeadingContent = <IconButton kind="primary" ariaLabel="Check out the Database" icon={Database} component="a" href="#" />
  const cardContent = 'Card content'

  it('renders title and content', async () => {
    await renderAndCheckA11Y(<Card title={cardHeadingTitle}>{cardContent}</Card>)

    expect(screen.getByTestId('card-wrapper')).toBeInTheDocument()
    expect(screen.getByTestId('card-heading')).toBeInTheDocument()

    const cardTitle = screen.getByTestId('card-heading-title')
    expect(cardTitle).toBeInTheDocument()
    expect(cardTitle.tagName).toEqual('H2')
    expect(cardTitle.className).toEqual(styles.title)
    expect(within(cardTitle).queryByText(cardHeadingTitle))

    const content = screen.getByTestId('card-content')
    expect(content.className).toEqual(styles.content)
    expect(within(content).queryByText(cardContent)).toBeInTheDocument()
  })

  it('renders heading with icon, title and additional content, also renders separator and card content', async () => {
    await renderAndCheckA11Y(
      <Card headingIcon={cardHeadingIcon} title={cardHeadingTitle} headingContent={cardHeadingContent} separator>
        {cardContent}
      </Card>,
    )

    const title = screen.getByTestId('card-heading-title')
    expect(title).toBeInTheDocument()
    expect(title.className).toEqual(`${styles.title} ${styles.space}`)
    expect(within(title).queryByText(cardHeadingTitle)).toBeInTheDocument()

    expect(screen.queryByTestId('card-separator')).toBeInTheDocument()
    expect(screen.getByTestId('card-separator').className).toEqual(styles.separator)

    const content = screen.getByTestId('card-content')
    expect(content).toBeInTheDocument()
    expect(content.className).toEqual(styles.content)
    expect(within(content).queryByText(cardContent)).toBeInTheDocument()

    expect(screen.queryByTestId('card-heading-icon')).not.toBeInTheDocument()
  })

  it('renders caption', async () => {
    await renderAndCheckA11Y(<Card caption={<span id="caption">Caption</span>}>{cardContent}</Card>)

    expect(screen.queryByText('Caption')).toBeInTheDocument()
  })

  it('renders bordered variant', async () => {
    await renderAndCheckA11Y(
      <Card variant="bordered" title={cardHeadingTitle}>
        {cardContent}
      </Card>,
    )

    expect(screen.getByTestId('card-wrapper').className.includes(styles.bordered)).toBeTruthy()
  })

  it('renders custom title tag', async () => {
    await renderAndCheckA11Y(
      <Card titleTagName="h6" title={cardHeadingTitle}>
        {cardContent}
      </Card>,
    )

    expect(screen.getByTestId('card-heading-title').tagName).toEqual('H6')
  })
})
