import React from 'react'
import { Database } from 'react-feather'

import { Card, IconButton } from '../src'

import styles from './utils.scss'

const cardContent =
  'Hogshead topsail draft careen mizzen fluke gaff cog aye Buccaneer. To go on account topgallant Jolly Roger maroon overhaul ho landlubber or just lubber prow pillage clap of thunder. Holystone jack black jack sloop bowsprit Sea Legs matey aft fluke brigantine.'

export default {
  title: 'Components/Card',
  component: Card,
}

export const Simple = () => <Card title="Card title">{cardContent}</Card>

Simple.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE-Hazelcast-Design-System?node-id=10093%3A8',
  },
}

export const WithSeparator = () => (
  <Card title="Card title" separator>
    {cardContent}
  </Card>
)

WithSeparator.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE-Hazelcast-Design-System?node-id=10093%3A21',
  },
}

export const WithIcon = () => (
  <Card title="Card title" headingIcon={Database}>
    {cardContent}
  </Card>
)

WithIcon.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE-Hazelcast-Design-System?node-id=10181%3A15',
  },
}

export const WithIconAndSeparator = () => (
  <Card title="Card title" headingIcon={Database} separator>
    {cardContent}
  </Card>
)

export const WithSmallText = () => (
  <Card title="Card title">
    <div className={styles.typographyBodySmall}>{cardContent}</div>
  </Card>
)

export const WithHeadingContent = () => (
  <Card
    title="Card title"
    headingContent={<IconButton kind="primary" ariaLabel="Check out the Database" icon={Database} component="a" href="#" />}
  >
    {cardContent}
  </Card>
)

export const WithoutTitle = () => <Card>{cardContent}</Card>
