import React from 'react'
import { X } from 'react-feather'

import { IconButton } from '../src/IconButton'

import styles from '../src/IconButton.module.scss'

export default {
  title: 'Components/IconButton',
  component: IconButton,
}

export const Default = () => <IconButton Icon={X} />

export const Focused = () => <IconButton className={styles.focus} Icon={X} />

export const Disabled = () => <IconButton disabled Icon={X} />
