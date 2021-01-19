import React from 'react'
import { Figma } from 'react-feather'

import { EmptyState } from '../src/EmptyState'

export default {
  title: 'components/EmptyState',
  component: EmptyState,
}

// Common
const title = 'Figma'
const titleLong = 'Figma Design Tool'
const descriptionShort = 'Figma is a collaborative interface design tool.'
const description =
  'Figma is a vector graphics editor and prototyping tool, with additional offline features enabled by desktop applications for macOS and Windows.'
const descriptionLong =
  'Figma is a vector graphics editor and prototyping tool which is primarily web-based, with additional offline features enabled by desktop applications for macOS and Windows. The Figma Mirror companion apps for Android and iOS allow viewing Figma prototypes on mobile devices. The feature set of Figma focuses on use in user interface and user experience design, with an emphasis on real-time collaboration.'
// Icon
const icon = Figma
const iconLabel = 'Icon Figma'
// Action
const action = 'Cool!'
const actionLong = 'Cool, my man!'
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
    description={descriptionShort}
    icon={icon}
    iconLabel={iconLabel}
    action={action}
    actionHref={actionHref}
  />
)
