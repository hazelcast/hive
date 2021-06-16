import React, { FC, ReactNode } from 'react'
import ReactModal, { Props as ReactModalProps } from 'react-modal'
import { X } from 'react-feather'
import cn from 'classnames'
import { DataTestProp } from '@hazelcast/helpers'

import { ButtonProps, ButtonTypeButtonProps } from './Button'
import { Icon, IconProps } from './Icon'
import { Link } from './Link'

import styles from './Overlay.module.scss'
import useIsomorphicLayoutEffect from 'react-use/lib/useIsomorphicLayoutEffect'

export type OverlayActionProps = ButtonProps<ButtonTypeButtonProps>
export type OverlayProps = {
  children?: ReactNode
  closable?: boolean
  headerClassName?: string
  contentClassName?: string
  icon?: IconProps['icon']
  onClose: ReactModalProps['onRequestClose']
  contentWidth?: 'fullscreen' | 'normal'
  title: string
} & DataTestProp &
  Exclude<ReactModalProps, 'onRequestClose' | 'shouldFocusAfterRender' | 'shouldReturnFocusAfterClose'>

/*
 * ### Purpose
 * Overlay is a full-screen modal. Windows under an Overlay are inert. That is, users cannot interact with content outside an active Overlay window.
 * Overlay should be used to drive a more complex actions (e.g. filling and saving forms). In case of a confirmation action, use a Dialog.
 *
 * ### General Info
 * - Overlay always contains a title, cancel button in the top right corner, and content.
 * - To close the Overlay, use cancel button in the top right corner or press "Esc" key.
 */
export const Overlay: FC<OverlayProps> = ({
  'data-test': dataTest,
  children,
  className,
  headerClassName,
  contentClassName,
  icon,
  onClose,
  title,
  contentWidth = 'normal',
  isOpen,
  closable = true,
  ...rest
}) => {
  useIsomorphicLayoutEffect(() => {
    if (isOpen) {
      document.body.classList.add(styles.overlayed)
    } else {
      document.body.classList.remove(styles.overlayed)
    }
  }, [isOpen])

  return (
    <ReactModal
      data-test={dataTest}
      portalClassName={styles.portal}
      className={cn(styles.modal, className)}
      contentLabel={title}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={closable}
      shouldFocusAfterRender
      shouldReturnFocusAfterClose
      isOpen={isOpen}
      {...rest}
    >
      <div
        data-test="overlay-wrapper"
        className={cn(styles.wrapper, { [styles.normal]: contentWidth === 'normal', [styles.fullscreen]: contentWidth === 'fullscreen' })}
      >
        <div data-test="overlay-header" className={cn(styles.header, headerClassName)}>
          {icon && <Icon data-test="overlay-header-icon" className={styles.icon} size="medium" icon={icon} ariaHidden />}
          <h1 data-test="overlay-header-title" className={styles.title}>
            {title}
          </h1>
          {closable && (
            <Link
              data-test="overlay-header-cancel-button"
              className={styles.close}
              component="button"
              onClick={onClose}
              size="small"
              iconClassName={styles.closeIcon}
              icon={X}
              ariaLabel="Cancel"
            >
              Cancel
            </Link>
          )}
        </div>
        <div data-test="overlay-content" className={cn(styles.content, contentClassName)}>
          {children}
        </div>
      </div>
    </ReactModal>
  )
}
