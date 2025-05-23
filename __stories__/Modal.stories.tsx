import React, { FC } from 'react'
import cn from 'classnames'
import { useUID } from 'react-uid'
import { CloudLightning } from 'react-feather'

import { Modal, ModalProps } from '../src/components/Modal'
import { Button } from '../src'

import styles from '../src/components/Modal.module.scss'
import utilsStyles from './utils.module.scss'

export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 500,
    },
  },
}

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
        color: 'secondary',
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
        color: 'secondary',
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
        color: 'secondary',
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
        <Button variant="outlined" onClick={onClose}>
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
