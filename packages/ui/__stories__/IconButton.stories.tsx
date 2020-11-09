import React, { FC } from 'react'
import { X } from 'react-feather'

import { IconButton } from '../src/IconButton'

import styleConsts from '../styles/constants/export.scss'
import styles from '../src/IconButton.module.scss'

export default {
  title: 'Components/IconButton',
  component: IconButton,
}

export const Transparent = () => <IconButton kind="transparent" iconAriaLabel="Close icon" icon={X} />

export const TransparentHover = () => <IconButton kind="transparent" iconAriaLabel="Close icon" className={styles.hover} icon={X} />

export const TransparentFocused = () => <IconButton kind="transparent" iconAriaLabel="Close icon" className={styles.focus} icon={X} />

export const TransparentActive = () => <IconButton kind="transparent" iconAriaLabel="Close icon" className={styles.active} icon={X} />

export const TransparentDisabled = () => <IconButton kind="transparent" iconAriaLabel="Close icon" disabled icon={X} />

const InheritColorContainer: FC = ({ children }) => <div style={{ color: styleConsts.colorWarning }}>{children}</div>
export const TransparentInheritColor = () => (
  <InheritColorContainer>
    <IconButton kind="transparent" iconAriaLabel="Close icon" icon={X} />
  </InheritColorContainer>
)

export const TransparentInheritColorHover = () => (
  <InheritColorContainer>
    <IconButton kind="transparent" iconAriaLabel="Close icon" className={styles.hover} icon={X} />
  </InheritColorContainer>
)

export const TransparentInheritColorFocused = () => (
  <InheritColorContainer>
    <IconButton kind="transparent" iconAriaLabel="Close icon" className={styles.focus} icon={X} />
  </InheritColorContainer>
)

export const TransparentInheritColorActive = () => (
  <InheritColorContainer>
    <IconButton kind="transparent" iconAriaLabel="Close icon" className={styles.active} icon={X} />
  </InheritColorContainer>
)

export const TransparentInheritColorDisabled = () => (
  <InheritColorContainer>
    <IconButton kind="transparent" iconAriaLabel="Close icon" disabled icon={X} />
  </InheritColorContainer>
)

export const Primary = () => <IconButton kind="primary" iconAriaLabel="Close icon" icon={X} />

export const PrimaryHover = () => <IconButton kind="primary" iconAriaLabel="Close icon" className={styles.hover} icon={X} />

export const PrimaryFocused = () => <IconButton kind="primary" iconAriaLabel="Close icon" className={styles.focus} icon={X} />

export const PrimaryActive = () => <IconButton kind="primary" iconAriaLabel="Close icon" className={styles.active} icon={X} />

export const PrimaryDisabled = () => <IconButton kind="primary" iconAriaLabel="Close icon" disabled icon={X} />
