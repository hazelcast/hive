import React, { useState } from 'react'
import { Meta, StoryObj } from '@storybook/react-webpack5'
import { BookOpen, HelpCircle, Menu, PlusCircle, Settings } from 'react-feather'
import cls from 'classnames'

import { Icon, IconButton, TopNavigation } from '../src'
import styles from './TopNavigation.stories.module.css'

export default {
  title: 'App/Top Navigation',
  component: TopNavigation,
  parameters: {
    layout: 'fullscreen',
    docs: { canvas: { sourceState: 'hidden' } },
    controls: {
      exclude: [
        'logo',
        'mobileLogo',
        'navigation',
        'children',
        'actions',
        'mobileMenu',
        'className',
        'navigationClassName',
        'actionsClassName',
        'data-test',
      ],
    },
  },
  argTypes: {
    name: { control: 'text', description: 'Product or application name displayed beside the logo.', table: { category: 'Content' } },
    layout: {
      control: 'inline-radio',
      options: ['spaced', 'grouped'],
      description: 'Spacing between the brand and navigation slots.',
      table: { category: 'Layout' },
    },
    mobile: {
      control: 'boolean',
      description: 'Use the mobile layout; the application controls when this is enabled.',
      table: { category: 'Layout' },
    },
  },
} satisfies Meta<typeof TopNavigation>

type Story = StoryObj<typeof TopNavigation>

const Logo = ({ compact = false }: { compact?: boolean }) => (
  <a href="#home" className={compact ? styles.compactLogo : styles.logo} aria-label="Hazelcast home">
    {compact ? 'H' : 'Hazelcast'}
  </a>
)

const ClusterSelect = ({ compact = false, mobile = false }: { compact?: boolean; mobile?: boolean }) => {
  const [cluster, setCluster] = useState('Production')
  return (
    <select
      aria-label="Select cluster"
      className={cls(compact ? styles.cloudSelect : styles.mcSelect, { [styles.mobile]: mobile })}
      value={cluster}
      onChange={(event) => setCluster(event.target.value)}
    >
      <option>Production</option>
      <option>Development</option>
    </select>
  )
}

const Actions = ({ cloud = false, mobile = false }: { cloud?: boolean; mobile?: boolean }) => (
  <>
    <IconButton
      component="a"
      href="#documentation"
      icon={BookOpen}
      variant="ghost"
      color="secondary"
      ariaLabel="Documentation"
      tooltip="Documentation"
    />
    <IconButton component="a" href="#support" icon={HelpCircle} variant="ghost" color="secondary" ariaLabel="Support" tooltip="Support" />
    <details className={cls(styles.account, { [styles.mobile]: mobile })}>
      <summary aria-label="Account menu">
        {cloud ? (
          <>
            <span className={styles.accountName}>Alex Morgan</span>
            <span className={styles.avatar} aria-hidden="true">
              AM
            </span>
          </>
        ) : (
          <>
            <span className={styles.accountName}>Menu</span>
            <Icon icon={Menu} size="small" ariaHidden />
          </>
        )}
      </summary>
      <div className={styles.accountMenu}>
        <button type="button">
          <Icon icon={Settings} size="small" ariaHidden /> Settings
        </button>
        <button type="button">Sign out</button>
      </div>
    </details>
  </>
)

export const Playground: Story = {
  args: { logo: <Logo />, name: 'Cloud', layout: 'grouped', mobile: false },
  render: (args) => (
    <TopNavigation
      {...args}
      mobileLogo={<Logo compact />}
      navigation={<ClusterSelect compact mobile={args.mobile} />}
      actions={<Actions cloud mobile={args.mobile} />}
    />
  ),
}

export const Mobile: Story = {
  ...Playground,
  args: { ...Playground.args, mobile: true },
  tags: ['!dev'],
}

export const ManagementCenter: Story = {
  args: { logo: <Logo />, mobile: false },
  render: (args) => (
    <TopNavigation
      {...args}
      logo={<Logo />}
      mobileLogo={<Logo compact />}
      name={
        <div>
          Management Center<div className={styles.subtitle}>Instance name</div>
        </div>
      }
      navigation={<ClusterSelect mobile={args.mobile} />}
      actions={<Actions mobile={args.mobile} />}
    >
      <IconButton
        className={styles.connection}
        component="a"
        href="#cluster-connections"
        icon={PlusCircle}
        variant="ghost"
        color="secondary"
        ariaLabel="Cluster connections"
        tooltip="Cluster connections"
      />
    </TopNavigation>
  ),
  tags: ['!dev'],
}

export const Cloud: Story = {
  args: { logo: <Logo />, mobile: false },
  render: function CloudRender(args) {
    const [open, setOpen] = useState(false)
    return (
      <>
        <TopNavigation
          {...args}
          layout="grouped"
          logo={<Logo />}
          mobileLogo={<Logo compact />}
          name="Cloud"
          mobileMenu={{
            label: open ? 'Close menu' : 'Open menu',
            expanded: open,
            controls: 'example-cloud-sidebar',
            onClick: () => setOpen(!open),
          }}
          navigation={<ClusterSelect compact mobile={args.mobile} />}
          actions={<Actions cloud mobile={args.mobile} />}
        />
        <nav id="example-cloud-sidebar" aria-label="Example navigation" hidden={!args.mobile || !open} className={styles.sidebar}>
          <a href="#clusters">Clusters</a>
        </nav>
      </>
    )
  },
  tags: ['!dev'],
}
