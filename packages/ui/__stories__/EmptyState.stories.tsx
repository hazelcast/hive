import React from 'react'
import { Cpu } from 'react-feather'

import { EmptyState } from '../src/EmptyState'

export default {
  title: 'components/EmptyState',
  component: EmptyState,
}

// Common
const title = 'Fancy new CPU'
const titleLong = 'Faaaaaaaaaaaaaancy new CPU!'
const description =
  'A central processing unit (CPU), is the electronic circuitry that executes instructions that make up a computer program.'
const descriptionLong =
  'A central processing unit (CPU), also called a central processor, main processor or just processor, is the electronic circuitry within a computer that executes instructions that make up a computer program.'
// Icon
const icon = Cpu
const iconLabel = 'Icon CPU'
// Action
const action = 'Aight!'
const actionLong = 'All right, my man!'
const actionOnClick = () => console.log('action')
const actionHref = ''

export const Vertical = () => <EmptyState title={title} icon={icon} iconLabel={iconLabel} action={action} actionOnClick={actionOnClick} />

export const VerticalWithDescription = () => (
  <EmptyState title={title} icon={icon} description={description} iconLabel={iconLabel} action={action} actionOnClick={actionOnClick} />
)

export const VerticalWithDescriptionLong = () => (
  <EmptyState
    title={titleLong}
    icon={icon}
    description={descriptionLong}
    iconLabel={iconLabel}
    action={actionLong}
    actionOnClick={actionOnClick}
  />
)

export const VerticalLarge = () => (
  <EmptyState size="large" title={title} icon={icon} iconLabel={iconLabel} action={action} actionOnClick={actionOnClick} />
)

export const VerticalWithDescriptionLarge = () => (
  <EmptyState
    size="large"
    title={title}
    icon={icon}
    description={description}
    iconLabel={iconLabel}
    action={action}
    actionOnClick={actionOnClick}
  />
)

export const VerticalWithDescriptionLargeLong = () => (
  <EmptyState
    size="large"
    title={titleLong}
    icon={icon}
    description={descriptionLong}
    iconLabel={iconLabel}
    action={actionLong}
    actionOnClick={actionOnClick}
  />
)

export const Horizontal = () => (
  <EmptyState direction="horizontal" title={title} icon={icon} iconLabel={iconLabel} action={action} actionHref={actionHref} />
)

export const HorizontalWithDescription = () => (
  <EmptyState
    direction="horizontal"
    title={title}
    description={description}
    icon={icon}
    iconLabel={iconLabel}
    action={action}
    actionHref={actionHref}
  />
)

export const HorizontalWithDescriptionLong = () => (
  <EmptyState
    direction="horizontal"
    title={titleLong}
    icon={icon}
    description={descriptionLong}
    iconLabel={iconLabel}
    action={actionLong}
    actionHref={actionHref}
  />
)
