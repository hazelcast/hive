import React, { FC, useState } from 'react'
import cn from 'classnames'
import { useUID } from 'react-uid'
import { AlertTriangle, CheckCircle, CloudLightning, Info, Trash2, RefreshCw } from 'react-feather'
import { Meta, StoryObj } from '@storybook/react'

import { Modal, ModalProps } from '../src/components/Modal'
import { Modal as LegacyModal, ModalProps as LegacyModalProps } from '../src/old/Modal'
import { Button, SegmentedControl, SelectField, TextField } from '../src'

import utilsStyles from './utils.module.scss'

// eslint-disable-next-line no-console
const onClose = () => console.log('onClose')
// eslint-disable-next-line no-console
const onClick = () => console.log('onClick')
const title = 'Modal title'
const children = 'Action'
const disabledTooltip = 'Disabled Tooltip'
const Content = (
  <div>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis tortor sed nibh elementum congue. Phasellus leo mi, pellentesque in
    consequat sed, semper id felis. Quisque sed eros tristique, suscipit libero eu, varius ex. Mauris luctus sem et lorem tincidunt, id
    pellentesque eros pretium.
  </div>
)

const ModalWithPortalFactory: FC<ModalProps> = ({ children, className, ...props }) => {
  const id = `s${useUID()}`
  return (
    <div id={id} className={utilsStyles.modalWrapper}>
      <Modal {...props} className={cn(className, utilsStyles.modal)} parentSelector={() => document.querySelector(`#${id}`) as HTMLElement}>
        {children}
      </Modal>
    </div>
  )
}

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 500,
    },
  },
  argTypes: {
    intent: {
      control: { type: 'inline-radio' },
      options: ['action', 'confirm', 'info', 'danger', 'success'],
    },
    closable: { control: 'boolean' },
    showCloseButton: { control: 'boolean' },
    hideActions: { control: 'boolean' },
    hideHeader: { control: 'boolean' },
    hideFooter: { control: 'boolean' },
    title: { control: 'text' },
    eyebrow: { control: 'text' },
    description: { control: 'text' },
    helperLink: { control: 'object' },
    header: { control: false },
    footer: { control: false },
    children: { control: false },
    icon: { control: false },
    actions: { control: false },
    onClose: { control: false },
    parentSelector: { control: false },
  },
}
export default meta

type Story = StoryObj<typeof Modal>

const iconOptions = {
  None: undefined,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Info,
  Trash2,
  CloudLightning,
}

type PlaygroundArgs = ModalProps & {
  iconName?: keyof typeof iconOptions
  showHelperLink?: boolean
  actionLabel?: string
}

export const Playground: StoryObj<PlaygroundArgs> = {
  argTypes: {
    iconName: {
      name: 'icon',
      control: { type: 'select' },
      options: Object.keys(iconOptions),
    },
    showHelperLink: { control: 'boolean', name: 'helperLink' },
    actionLabel: { control: 'text', name: 'action label' },
    cancelLabel: { control: 'text' },
    iconAriaLabel: { control: 'text' },
  },
  args: {
    isOpen: true,
    title: 'Restart connector',
    eyebrow: 'Action',
    description:
      'Restarting will briefly interrupt streaming. Existing buffered events will be replayed when the connector comes back online.',
    intent: 'action',
    iconName: 'RefreshCw',
    iconAriaLabel: 'Restart',
    onClose,
    actionLabel: 'Restart',
    cancelLabel: 'Cancel',
    showHelperLink: true,
  },
  render: ({ iconName, showHelperLink, actionLabel, ...args }) => (
    <ModalWithPortalFactory
      {...args}
      icon={iconName ? iconOptions[iconName] : undefined}
      actions={actionLabel ? [{ children: actionLabel, onClick, autoFocus: true }] : undefined}
      helperLink={showHelperLink ? { label: 'Learn more in docs', href: '#' } : undefined}
    />
  ),
}

export const Action: Story = {
  tags: ['!dev'],
  render: () => (
    <ModalWithPortalFactory
      isOpen
      onClose={onClose}
      intent="action"
      eyebrow="Action"
      icon={RefreshCw}
      iconAriaLabel="Restart"
      title="Restart connector"
      description="Restarting will briefly interrupt streaming. Existing buffered events will be replayed when the connector comes back online."
      actions={[{ children: 'Restart', onClick, autoFocus: true }]}
      helperLink={{ label: 'Learn more in docs', href: '#' }}
    />
  ),
}

export const Confirm: Story = {
  tags: ['!dev'],
  render: () => (
    <ModalWithPortalFactory
      isOpen
      onClose={onClose}
      intent="confirm"
      eyebrow="Confirm"
      icon={AlertTriangle}
      iconAriaLabel="Warning"
      title="Pause cluster"
      description="Pausing the cluster will disconnect all active clients. Saved data is retained and the cluster can be resumed at any time."
      actions={[{ children: 'Pause cluster', onClick, autoFocus: true }]}
      helperLink={{ label: 'Learn more in docs', href: '#' }}
    />
  ),
}

export const InfoModal: Story = {
  tags: ['!dev'],
  name: 'Info',
  render: () => (
    <ModalWithPortalFactory
      isOpen
      onClose={onClose}
      intent="info"
      eyebrow="Heads up"
      icon={Info}
      iconAriaLabel="Info"
      title="New version available"
      description="Hazelcast Cloud 5.6 is available. Upgrade your cluster to get the latest features and security patches."
      actions={[{ children: 'Upgrade', onClick, autoFocus: true }]}
      helperLink={{ label: 'Learn more in docs', href: '#' }}
    />
  ),
}

export const Danger: Story = {
  tags: ['!dev'],
  render: () => (
    <ModalWithPortalFactory
      isOpen
      onClose={onClose}
      intent="danger"
      eyebrow="Danger zone"
      icon={Trash2}
      iconAriaLabel="Delete"
      title="Delete cluster"
      description="This permanently deletes the cluster and all data. Backups, IP whitelists, and saved configuration will be removed. This action cannot be undone."
      actions={[{ children: 'Delete forever', onClick, color: 'danger' }]}
      helperLink={{ label: 'Learn more in docs', href: '#' }}
    />
  ),
}

export const Success: Story = {
  tags: ['!dev'],
  render: () => (
    <ModalWithPortalFactory
      isOpen
      onClose={onClose}
      intent="success"
      eyebrow="All set"
      icon={CheckCircle}
      iconAriaLabel="Success"
      title="Cluster is healthy"
      description="All members are connected, replication is current, and your client connections are healthy."
      actions={[{ children: 'Got it', onClick, autoFocus: true }]}
      helperLink={{ label: 'Learn more in docs', href: '#' }}
    />
  ),
}

export const HeaderOnly: Story = {
  tags: ['!dev'],
  render: () => (
    <ModalWithPortalFactory
      isOpen
      onClose={onClose}
      title="Heads up"
      description="No buttons, no body — just the structured header. Close via the X or overlay."
      hideFooter
    />
  ),
}

export const HeaderAndFooterOnly: Story = {
  tags: ['!dev'],
  render: () => (
    <ModalWithPortalFactory
      isOpen
      onClose={onClose}
      title="Pause cluster"
      description="Pausing the cluster will disconnect all active clients. Saved data is retained and the cluster can be resumed at any time."
      intent="confirm"
      eyebrow="Confirm"
      icon={AlertTriangle}
      iconAriaLabel="Warning"
      actions={[{ children: 'Pause cluster', onClick, autoFocus: true }]}
      helperLink={{ label: 'Learn more in docs', href: '#' }}
    />
  ),
}

export const BodyOnly: Story = {
  tags: ['!dev'],
  render: () => (
    <ModalWithPortalFactory isOpen onClose={onClose} hideHeader hideActions>
      <div style={{ padding: '16px 0' }}>
        Drop any content here — a chart, an embedded form, marketing copy — Modal renders the body slot verbatim with no chrome above or
        below it.
      </div>
    </ModalWithPortalFactory>
  ),
}

const UseCaseComposerRender = () => {
  const [clusterType, setClusterType] = useState<'production' | 'development'>('production')
  const [clusterName, setClusterName] = useState('calm-noble-reef')
  const [version, setVersion] = useState<string | null>('5.6.1-SNAPSHOT')

  return (
    <ModalWithPortalFactory
      isOpen
      onClose={onClose}
      className={utilsStyles.modalAuto}
      intent="action"
      eyebrow="New cluster"
      icon={CloudLightning}
      iconAriaLabel="Cluster"
      title="Ready to develop & deploy?"
      description="Start building real-time apps in minutes."
      helperLink={{ label: 'Learn more in docs', href: '#' }}
      actions={[{ children: 'Create cluster', onClick, autoFocus: true }]}
    >
      <div style={{ display: 'grid', gap: 16 }}>
        <ul
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12, margin: 0, padding: 0, listStyle: 'none' }}
        >
          {[
            'Fully managed, autonomous',
            'Pay-as-you-grow — auto-scales with your workload',
            'Integrates seamlessly into streaming pipelines',
            'Mission-critical data security',
          ].map((item) => (
            <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <CheckCircle size={16} aria-hidden style={{ flexShrink: 0, marginTop: 2 }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <SegmentedControl
          label="Cluster type"
          value={clusterType}
          onChange={setClusterType}
          options={[
            { value: 'production', label: 'Production' },
            { value: 'development', label: 'Development' },
          ]}
        />

        <TextField name="cluster-name" label="Cluster name" value={clusterName} onChange={(e) => setClusterName(e.target.value)} />

        <SelectField
          name="version"
          label="Hazelcast version"
          value={version}
          onChange={setVersion}
          options={[
            { value: '5.6.1-SNAPSHOT', label: '5.6.1-SNAPSHOT' },
            { value: '5.6.0', label: '5.6.0' },
            { value: '5.5.2', label: '5.5.2' },
          ]}
        />
      </div>
    </ModalWithPortalFactory>
  )
}

export const UseCaseComposer: Story = {
  tags: ['!dev'],
  render: () => <UseCaseComposerRender />,
}

export const CustomHeaderAndFooter: Story = {
  tags: ['!dev'],
  render: () => (
    <ModalWithPortalFactory
      isOpen
      onClose={onClose}
      title="Streaming Real-Time Data"
      header={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '20px 24px 18px',
            borderBottom: '1px solid var(--hive-color-border-v4)',
            background: 'var(--hive-color-neutral-white-v4)',
          }}
        >
          <CloudLightning size={20} aria-hidden />
          <div>
            <p style={{ margin: 0, fontSize: 12, textTransform: 'uppercase', color: 'var(--hive-color-text-secondary-v4)' }}>Use case</p>
            <strong style={{ fontSize: 18 }}>Streaming Real-Time Data</strong>
          </div>
        </div>
      }
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginLeft: 'auto' }}>
          <Button variant="ghost" color="secondary" size="small" onClick={onClose}>
            Skip
          </Button>
          <Button size="small" onClick={onClick}>
            Continue
          </Button>
        </div>
      }
    >
      <div style={{ display: 'grid', gap: 12 }}>
        <div>
          The <code>header</code> and <code>footer</code> props accept any ReactNode and replace the default structured rendering, while the
          body slot remains the children. Use this when you need bespoke layouts that don&apos;t fit the title/eyebrow/description pattern.
        </div>
        <div style={{ border: '1px solid var(--hive-color-border-v4)', borderRadius: 12, padding: 16 }}>
          <strong>Featured tutorial</strong>
          <p style={{ marginTop: 8, marginBottom: 0 }}>
            Query Streams from Confluent Cloud. In this tutorial, you&apos;ll learn how to connect your cluster to Confluent Cloud, using
            SQL.
          </p>
        </div>
      </div>
    </ModalWithPortalFactory>
  ),
}

export const Default = () => (
  <ModalWithPortalFactory title={title} isOpen onClose={onClose}>
    {Content}
  </ModalWithPortalFactory>
)

export const NotClosable = () => (
  <ModalWithPortalFactory title={title} isOpen onClose={onClose} closable={false}>
    {Content}
  </ModalWithPortalFactory>
)

export const WithIcon = () => (
  <ModalWithPortalFactory title={title} isOpen onClose={onClose} icon={CloudLightning} iconAriaLabel="Icon Cloud">
    {Content}
  </ModalWithPortalFactory>
)

export const WithAction = () => (
  <ModalWithPortalFactory
    title={title}
    isOpen
    onClose={onClose}
    actions={[
      {
        onClick,
        children: 'Action',
      },
    ]}
  >
    {Content}
  </ModalWithPortalFactory>
)

export const WithActionDisabled = () => (
  <ModalWithPortalFactory
    title={title}
    isOpen
    onClose={onClose}
    actions={[
      {
        children,
        onClick,
        disabled: true,
        disabledTooltip,
      },
    ]}
  >
    {Content}
  </ModalWithPortalFactory>
)

export const WithDangerAction = () => (
  <ModalWithPortalFactory
    title={title}
    isOpen
    onClose={onClose}
    actions={[
      {
        children,
        onClick,
        color: 'danger',
      },
    ]}
  >
    {Content}
  </ModalWithPortalFactory>
)

export const WithDangerActionDisabled = () => (
  <ModalWithPortalFactory
    title={title}
    isOpen
    onClose={onClose}
    actions={[
      {
        children,
        onClick,
        disabled: true,
        disabledTooltip,
        color: 'danger',
      },
    ]}
  >
    {Content}
  </ModalWithPortalFactory>
)

export const WithMultipleActions = () => (
  <ModalWithPortalFactory
    title={title}
    isOpen
    onClose={onClose}
    actions={[
      {
        children,
        onClick,
      },
      {
        children,
        onClick,
        color: 'danger',
      },
    ]}
  >
    {Content}
  </ModalWithPortalFactory>
)

export const WithLongTitle = () => (
  <ModalWithPortalFactory
    title="This is a veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery long title of this modal window."
    isOpen
    onClose={onClose}
  >
    {Content}
  </ModalWithPortalFactory>
)

export const WithHiddenModalActions = () => (
  <ModalWithPortalFactory
    title={title}
    isOpen
    onClose={onClose}
    footer={
      <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
        <Button variant="outlined" color="secondary" size="small" onClick={onClose}>
          Cancel
        </Button>
        <Button size="small" onClick={onClick}>
          Action
        </Button>
      </div>
    }
  >
    {Content}
  </ModalWithPortalFactory>
)

export const LongContent = () => (
  <ModalWithPortalFactory title={title} isOpen onClose={onClose}>
    {Content}
    {Content}
    {Content}
    {Content}
    {Content}
    {Content}
    {Content}
    {Content}
    {Content}
    {Content}
    {Content}
    {Content}
    {Content}
    {Content}
    {Content}
  </ModalWithPortalFactory>
)

export const SmallVariant = () => (
  <ModalWithPortalFactory
    title={title}
    isOpen
    onClose={onClose}
    actions={[
      {
        children: 'Submit',
      },
    ]}
  >
    {Content}
  </ModalWithPortalFactory>
)
SmallVariant.tags = ['!dev']
Default.tags = ['!dev']
NotClosable.tags = ['!dev']
WithIcon.tags = ['!dev']
WithAction.tags = ['!dev']
WithActionDisabled.tags = ['!dev']
WithDangerAction.tags = ['!dev']
WithDangerActionDisabled.tags = ['!dev']
WithMultipleActions.tags = ['!dev']
WithLongTitle.tags = ['!dev']
WithHiddenModalActions.tags = ['!dev']
LongContent.tags = ['!dev']

const LegacyModalWithPortal: FC<LegacyModalProps> = ({ children, className, ...props }) => {
  const id = `s${useUID()}`
  return (
    <div id={id} className={utilsStyles.modalWrapper}>
      <LegacyModal
        {...props}
        className={cn(className, utilsStyles.modal)}
        parentSelector={() => document.querySelector(`#${id}`) as HTMLElement}
      >
        {children}
      </LegacyModal>
    </div>
  )
}

export const LegacyV3 = () => (
  <LegacyModalWithPortal title={title} isOpen onClose={onClose} actions={[{ children: 'Action', onClick }]}>
    {Content}
  </LegacyModalWithPortal>
)
LegacyV3.tags = ['!dev']
