import React, { FC } from 'react'
import cn from 'classnames'
import { v4 as uuid } from 'uuid'

import { Dialog, DialogProps } from '../src/Dialog'

import utilsStyles from './utils.scss'
import styles from '../src/Dialog.module.scss'

export default {
  title: 'Components/Dialog',
  component: Dialog,
}

const onClose = console.log('onClose')
const onAction = console.log('onAction')

const DialogWithPortalFactory: FC<DialogProps> = ({ children, className, ...props }) => {
  // We need dynamic id in order not to portal Default & Normal into same sandbox
  const id = `s${uuid()}`
  return (
    <div id={id} className={utilsStyles.modalWrapper}>
      <Dialog
        {...props}
        modalClassName={cn(className, utilsStyles.modal)}
        parentSelector={() => document.querySelector(`#${id}`) as HTMLElement}
      >
        <div className={utilsStyles.modalChildrenWrapper}>{children}</div>
      </Dialog>
    </div>
  )
}

export const Default = () => (
  <DialogWithPortalFactory title="Title of the Modal" isOpen onClose={onClose}>
    <div>Content</div>
  </DialogWithPortalFactory>
)

export const Focused = () => (
  <DialogWithPortalFactory className={styles.focus} title="Title of the Modal" isOpen onClose={onClose}>
    <div>Content</div>
  </DialogWithPortalFactory>
)

export const WithPrimaryAction = () => (
  <DialogWithPortalFactory title="Title of the Modal" isOpen action="Submit" onAction={onAction} onClose={onClose}>
    <div>Content</div>
  </DialogWithPortalFactory>
)

export const WithDangerAction = () => (
  <DialogWithPortalFactory title="Title of the Modal" isOpen action="Submit" onAction={onAction}>
    <div>Content</div>
  </DialogWithPortalFactory>
)
