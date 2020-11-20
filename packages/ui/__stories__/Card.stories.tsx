import React from 'react'
import { Archive, Database, Layers } from 'react-feather'

import { Card } from '../src'

import styles from './utils.scss'

const cardContent =
  'Hogshead topsail draft careen mizzen fluke gaff cog aye Buccaneer. To go on account topgallant Jolly Roger maroon overhaul ho landlubber or just lubber prow pillage clap of thunder. Holystone jack black jack sloop bowsprit Sea Legs matey aft fluke brigantine.'

export default {
  title: 'Components/Card',
  component: Card,
}

export const Primary = () => (
  <Card type="primary" title="Card title">
    {cardContent}
  </Card>
)

export const PrimaryWithSmallText = () => (
  <Card type="primary" title="Card title">
    <div className={styles.typographyBodySmall}>{cardContent}</div>
  </Card>
)

export const PrimaryWithIcon = () => (
  <Card type="primary" title="Card title" icon={Database}>
    {cardContent}
  </Card>
)

export const PrimaryWithIconButton = () => (
  <Card type="primary" title="Card title" iconButtonProps={{ iconAriaLabel: 'Database', icon: Database }}>
    {cardContent}
  </Card>
)

export const PrimaryWithoutHeader = () => <Card type="primary">{cardContent}</Card>

export const Secondary = () => (
  <Card type="secondary" title="Card title">
    {cardContent}
  </Card>
)

export const SecondaryWithSmallText = () => (
  <Card type="secondary" title="Card title">
    <div className={styles.typographyBodySmall}>{cardContent}</div>
  </Card>
)

export const SecondaryWithIcon = () => (
  <Card type="secondary" title="Card title" icon={Database}>
    {cardContent}
  </Card>
)

export const SecondaryWithIconButton = () => (
  <Card type="secondary" title="Card title" iconButtonProps={{ iconAriaLabel: 'Database', icon: Database }}>
    {cardContent}
  </Card>
)

export const SecondaryWithoutHeader = () => <Card type="secondary">{cardContent}</Card>

export const Highlighter = () => (
  <Card title="Card title" type="highlighter">
    {cardContent}
  </Card>
)

export const HighlighterWithSmallText = () => (
  <Card type="highlighter" title="Card title">
    <div className={styles.typographyBodySmall}>{cardContent}</div>
  </Card>
)

export const HighlighterWithIcon = () => (
  <Card title="Card title" type="highlighter" icon={Database}>
    {cardContent}
  </Card>
)

export const HighlighterWithIconButton = () => (
  <Card title="Card title" type="highlighter" iconButtonProps={{ iconAriaLabel: 'Database', icon: Database }}>
    {cardContent}
  </Card>
)

export const Stacked = () => (
  <Card title="Stacked cards" icon={Layers}>
    <Card title="Highlighter" type="highlighter">
      {cardContent}
    </Card>

    <br />

    <Card title="Archive" type="secondary" icon={Archive}>
      {cardContent}
    </Card>
  </Card>
)
