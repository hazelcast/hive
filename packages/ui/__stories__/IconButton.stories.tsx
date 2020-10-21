import React from 'react'
import { X } from 'react-feather'

import { IconButton } from '../src/IconButton'

import styles from '../src/IconButton.module.scss'

export default {
  title: 'Components/IconButton',
  component: IconButton,
}

export const Default = () => <IconButton iconAriaLabel="Close icon" icon={X} />

export const Hover = () => <IconButton iconAriaLabel="Close icon" className={styles.hover} icon={X} />

export const Focused = () => <IconButton iconAriaLabel="Close icon" className={styles.focus} icon={X} />

export const Active = () => <IconButton iconAriaLabel="Close icon" className={styles.active} icon={X} />

export const Disabled = () => <IconButton iconAriaLabel="Close icon" disabled icon={X} />
