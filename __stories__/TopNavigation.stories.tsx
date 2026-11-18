import React, { useState } from 'react'
import { Meta, StoryObj } from '@storybook/react-webpack5'
import { BookOpen, HelpCircle, MoreHorizontal, PlusCircle, Settings } from 'react-feather'
import cls from 'classnames'

import { Button, Icon, IconButton, Overlay, Popover, SelectField, SideNavigation, ThemeSwitcher, TopNavigation, useThemePreference } from '../src'
import type { TopNavigationProps } from '../src/components/TopNavigation'
import styles from './TopNavigation.stories.module.css'

type PlaygroundArgs = TopNavigationProps & {
  composition: 'cloud' | 'management-center'
  showCluster: boolean
  showDocumentation: boolean
  showSupport: boolean
  showTheme: boolean
  showAccount: boolean
  showMobileMenu: boolean
}

const SharedNavigation = ({ controlFeedback }: Pick<TopNavigationProps, 'controlFeedback'>) => {
  const [overlayOpen, setOverlayOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null)

  return (
    <>
      <TopNavigation
        logo="Management Center"
        controlFeedback={controlFeedback}
        navigation={<IconButton icon={PlusCircle} ariaLabel="Add cluster" title="Add cluster" variant="ghost" />}
        actions={
          <>
            <Button ref={setAnchor} variant="ghost" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
              Account
            </Button>
            <div id="shared-navigation-actions" />
            {anchor && (
              <Popover open={menuOpen} anchorElement={anchor} container="shared-navigation-actions" onClose={() => setMenuOpen(false)}>
                <Button variant="ghost">Profile</Button>
              </Popover>
            )}
          </>
        }
      />
      <div style={{ display: 'flex', height: 320 }}>
        <SideNavigation ariaLabel="Main navigation" initialOpen footer="Version" footerVariant="subtle" />
        <div>
          <Button onClick={() => setOverlayOpen(true)}>Open settings</Button>
        </div>
      </div>
      <Overlay isOpen={overlayOpen} title="Settings" onClose={() => setOverlayOpen(false)} />
    </>
  )
}

export const SharedNavigationStyles: StoryObj<TopNavigationProps> = {
  args: { logo: 'Management Center', controlFeedback: 'none' },
  render: ({ controlFeedback }) => <SharedNavigation controlFeedback={controlFeedback} />,
}

export default {
  title: 'Components/Top Navigation',
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
    composition: {
      control: 'inline-radio',
      options: ['cloud', 'management-center'],
      description: 'Select the example product composition.',
      table: { category: 'Content' },
    },
    showCluster: { control: 'boolean', description: 'Show the example cluster selector.', table: { category: 'Content' } },
    showDocumentation: { control: 'boolean', description: 'Show the documentation action.', table: { category: 'Actions' } },
    showSupport: { control: 'boolean', description: 'Show the support action.', table: { category: 'Actions' } },
    showTheme: { control: 'boolean', description: 'Show the theme action.', table: { category: 'Actions' } },
    showAccount: { control: 'boolean', description: 'Show the account menu.', table: { category: 'Actions' } },
    showMobileMenu: { control: 'boolean', description: 'Show the navigation trigger in mobile mode.', table: { category: 'Layout' } },
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
} satisfies Meta<PlaygroundArgs>

type Story = StoryObj<PlaygroundArgs>

const Logo = ({ compact = false, href = '/' }: { compact?: boolean; href?: string }) => (
  <a href={href} className={compact ? styles.compactLogo : styles.logo} aria-label="Hazelcast home">
    {compact ? (
      <img src="/images/hazelcast-compact.png" alt="" />
    ) : (
      <>
        <img className={styles.lightWordmark} src="/images/hazelcast-wordmark-light-theme.png" alt="" />
        <img className={styles.darkWordmark} src="/images/hazelcast-wordmark-dark-theme.png" alt="" />
      </>
    )}
  </a>
)

const ClusterSelect = ({ compact = false, mobile = false }: { compact?: boolean; mobile?: boolean }) => {
  const [cluster, setCluster] = useState('Production')
  return (
    <SelectField
      name="cluster"
      label="Select cluster"
      showAriaLabel
      isSearchable={false}
      className={cls(compact ? styles.cloudSelectWidth : styles.mcSelectWidth, { [styles.mobile]: mobile })}
      value={cluster}
      onChange={(value) => setCluster(value ?? '')}
      options={[
        { label: 'Production', value: 'Production' },
        { label: 'Development', value: 'Development' },
      ]}
    />
  )
}

const Actions = ({
  cloud = false,
  mobile = false,
  showDocumentation = true,
  showSupport = true,
  showTheme = true,
  showAccount = true,
}: {
  cloud?: boolean
  mobile?: boolean
  showDocumentation?: boolean
  showSupport?: boolean
  showTheme?: boolean
  showAccount?: boolean
}) => {
  const { preference, setPreference } = useThemePreference()

  return (
    <>
      {showDocumentation && (
        <IconButton
          component="a"
          href="#documentation"
          icon={BookOpen}
          variant="ghost"
          color="secondary"
          ariaLabel="Documentation"
          title={cloud ? undefined : 'Documentation'}
          tooltip={cloud ? 'Documentation' : undefined}
        />
      )}
      {showSupport && (
        <IconButton
          component="a"
          href="#support"
          icon={HelpCircle}
          variant="ghost"
          color="secondary"
          ariaLabel="Support"
          title={cloud ? undefined : 'Support'}
          tooltip={cloud ? 'Support' : undefined}
        />
      )}
      {showTheme && <ThemeSwitcher value={preference} onChange={setPreference} aria-label="Theme" />}
      {showAccount && (
        <details className={cls(styles.account, { [styles.mobile]: mobile })}>
          <summary aria-label={cloud ? 'Account menu' : 'Menu'} title={cloud ? undefined : 'Menu'}>
            {cloud ? (
              <>
                <span className={styles.accountName}>Alex Morgan</span>
                <span className={styles.avatar} aria-hidden="true">
                  AM
                </span>
              </>
            ) : (
              <Icon icon={MoreHorizontal} size="small" ariaHidden />
            )}
          </summary>
          <div className={styles.accountMenu}>
            <button type="button">
              <Icon icon={Settings} size="small" ariaHidden /> Settings
            </button>
            <button className={styles.signOut} type="button">
              Sign out
            </button>
          </div>
        </details>
      )}
    </>
  )
}

export const Playground: Story = {
  args: {
    logo: <Logo />,
    composition: 'management-center',
    mobile: false,
    showCluster: true,
    showDocumentation: true,
    showSupport: true,
    showTheme: true,
    showAccount: true,
    showMobileMenu: true,
  },
  render: function PlaygroundRender({
    composition,
    showCluster,
    showDocumentation,
    showSupport,
    showTheme,
    showAccount,
    showMobileMenu,
    ...args
  }) {
    const [open, setOpen] = useState(false)
    const cloud = composition === 'cloud'
    return (
      <>
        <TopNavigation
          {...args}
          className={styles.storyHeader}
          controlFeedback={args.controlFeedback ?? (cloud ? 'default' : 'none')}
          layout={args.layout ?? (cloud ? 'grouped' : 'spaced')}
          name={args.name ?? (cloud ? 'Cloud' : 'Management Center')}
          mobileLogo={<Logo compact />}
          mobileMenu={
            showMobileMenu
              ? {
                  label: open ? 'Close menu' : 'Open menu',
                  expanded: open,
                  controls: 'playground-navigation',
                  onClick: () => setOpen(!open),
                }
              : undefined
          }
          navigation={showCluster ? <ClusterSelect compact={cloud} mobile={args.mobile} /> : undefined}
          actions={
            <Actions
              cloud={cloud}
              mobile={args.mobile}
              showDocumentation={showDocumentation}
              showSupport={showSupport}
              showTheme={showTheme}
              showAccount={showAccount}
            />
          }
        >
          {!cloud && (
            <IconButton
              className={styles.connection}
              component="a"
              href="#cluster-connections"
              icon={PlusCircle}
              variant="ghost"
              color="secondary"
              ariaLabel="Cluster connections"
              title="Cluster connections"
            />
          )}
        </TopNavigation>
        <nav
          id="playground-navigation"
          aria-label="Example navigation"
          hidden={!args.mobile || !showMobileMenu || !open}
          className={styles.sidebar}
        >
          <a href="#clusters" onClick={() => setOpen(false)}>
            Clusters
          </a>
        </nav>
      </>
    )
  },
}

export const Mobile: Story = {
  ...Playground,
  args: { ...Playground.args, mobile: true },
  tags: ['!dev'],
}

export const ManagementCenter: Story = {
  args: { logo: <Logo />, mobile: false, controlFeedback: 'none' },
  render: (args) => (
    <TopNavigation
      {...args}
      className={styles.storyHeader}
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
        title="Cluster connections"
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
          className={styles.storyHeader}
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
