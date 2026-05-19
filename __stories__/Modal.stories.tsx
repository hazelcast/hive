import React, { FC } from 'react'
import cn from 'classnames'
import { useUID } from 'react-uid'
import { AlertTriangle, CheckCircle, CloudLightning, Info, Trash2, RefreshCw } from 'react-feather'
import { Meta, StoryObj } from '@storybook/react'

import { Modal, ModalProps } from '../src/components/Modal'
import { Modal as LegacyModal, ModalProps as LegacyModalProps } from '../src/old/Modal'
import { Button } from '../src'

import styles from '../src/components/Modal.module.css'
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
  },
}
export default meta

type Story = StoryObj<typeof Modal>

export const Playground: Story = {
  args: {
    isOpen: true,
    title: 'Restart connector',
    eyebrow: 'Action',
    description:
      'Restarting will briefly interrupt streaming. Existing buffered events will be replayed when the connector comes back online.',
    intent: 'action',
    icon: RefreshCw,
    iconAriaLabel: 'Restart',
    onClose,
    actions: [{ children: 'Restart', onClick, autoFocus: true }],
    helperLink: { label: 'Learn more in docs', href: '#' },
  },
  render: (args) => <ModalWithPortalFactory {...args} />,
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

export const CustomHeaderAndFooter: Story = {
  tags: ['!dev'],
  render: () => (
    <ModalWithPortalFactory
      isOpen
      onClose={onClose}
      header={
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <CloudLightning size={20} aria-hidden />
          <strong style={{ fontSize: 18 }}>Fully custom header</strong>
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
      <div>
        The <code>header</code> and <code>footer</code> props accept any ReactNode and replace the default structured rendering, while the
        body slot remains the children. Use this when you need bespoke layouts that don&apos;t fit the title/eyebrow/description pattern.
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

export const WithHiddenModalActions = () => {
  const Content = (
    <div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis tortor sed nibh elementum congue. Phasellus leo mi, pellentesque
        in consequat sed, semper id felis. Quisque sed eros tristique, suscipit libero eu, varius ex. Mauris luctus sem et lorem tincidunt,
        id pellentesque eros pretium.
      </p>
      <div className={styles.footer}>
        <Button onClick={onClick}>Action</Button>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  )

  return (
    <ModalWithPortalFactory title={title} isOpen onClose={onClose} hideActions>
      {Content}
    </ModalWithPortalFactory>
  )
}

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
