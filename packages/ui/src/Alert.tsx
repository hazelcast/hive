import React, { AnchorHTMLAttributes, FC, ReactNode } from 'react'
import cn from 'classnames'
import { X, ChevronRight, Clipboard } from 'react-feather'

import { PartialRequired } from '@hazelcast/helpers'

import { Link } from './Link'
import { Button } from './Button'
import { ToastIcon, ToastType } from './Toast'
import { Icon } from './Icon'
import { IconButton } from './IconButton'

import styleConsts from '../styles/constants/export.scss'

import styles from './Alert.module.scss'

const CriticalCopyButton = () => (
  <Button
    kind="transparent"
    capitalize={false}
    className={styles.copyButton}
    iconLeft={Clipboard}
    iconLeftAriaLabel="Icon copy to clipboard"
    iconLeftClassName={styles.copyButtonIcon}
    iconLeftSize="small"
    iconLeftColor={styleConsts.colorNeutralWhite}
  >
    Copy
  </Button>
)

type AnchorAttributes = AnchorHTMLAttributes<HTMLAnchorElement>

export type AlertAction = {
  text: string
} & PartialRequired<AnchorAttributes, 'href'>

export type AlertActions = [] | [AlertAction]

type AlertProps = {
  type: ToastType
  title: string
  content: ReactNode
  actions?: AlertActions
  className?: string
  closeToast: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const Alert: FC<AlertProps> = ({ type, title, content, actions, className, closeToast }) => {
  const { icon, ariaLabel } = ToastIcon[type]

  const renderActions = type === 'critical' || actions?.length

  return (
    <div
      className={cn(className, styles.alert, {
        [styles.success]: type === 'success',
        [styles.info]: type === 'info',
        [styles.warning]: type === 'warning',
        [styles.critical]: type === 'critical',
      })}
    >
      <div className={styles.header}>
        <Icon ariaLabel={ariaLabel} icon={icon} className={styles.icon} />
        <div data-test="alert-title" className={styles.title}>
          {title}
        </div>
        {closeToast && (
          <IconButton
            data-test="alert-close"
            className={styles.close}
            iconClassName={styles.closeIcon}
            iconAriaLabel="Close icon"
            icon={X}
            onClick={closeToast}
          />
        )}
      </div>
      <div data-test="alert-body" className={styles.body}>
        <div data-test="alert-content">{content}</div>
        {renderActions && (
          <div data-test="alert-actions" className={styles.actions}>
            {type === 'critical' && <CriticalCopyButton />}
            {actions?.length &&
              actions.map(({ text, href }, aI) => (
                <Link
                  key={aI}
                  data-test="alert-action"
                  className={styles.action}
                  type="primary"
                  href={href}
                  Icon={ChevronRight}
                  iconAriaLabel="Icon chevron right"
                >
                  {text}
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
