import React, { PropsWithChildren } from 'react'
import { X } from 'react-feather'

import { IconButton } from '../src/components/IconButton'

import styleConsts from '../styles/constants/export.module.scss'
import styles from '../src/components/IconButton.module.scss'

export default {
  title: 'Components/IconButton',
  component: IconButton,
}

export const Transparent = () => <IconButton kind="transparent" ariaLabel="Close icon" icon={X} />

export const TransparentSmall = () => <IconButton kind="transparent" ariaLabel="Close icon" icon={X} size="small" />

export const TransparentXLarge = () => <IconButton kind="transparent" ariaLabel="Close icon" icon={X} size="xlarge" />

export const TransparentHover = () => <IconButton kind="transparent" ariaLabel="Close icon" className={styles.hover} icon={X} />

export const TransparentFocused = () => <IconButton kind="transparent" ariaLabel="Close icon" className={styles.focus} icon={X} />

export const TransparentActive = () => <IconButton kind="transparent" ariaLabel="Close icon" className={styles.active} icon={X} />

export const TransparentDisabled = () => <IconButton kind="transparent" ariaLabel="Close icon" disabled icon={X} disabledTooltip="Yoda" />

export const TransparentLoading = () => <IconButton kind="transparent" ariaLabel="Close icon" icon={X} loading />

export const TransparentLinkSemantics = () => <IconButton kind="transparent" ariaLabel="Close icon" icon={X} component="a" href="#" />

const InheritColorContainer = ({ children }: PropsWithChildren) => <div style={{ color: styleConsts.colorWarning }}>{children}</div>
export const TransparentInheritColor = () => (
  <InheritColorContainer>
    <IconButton kind="transparent" ariaLabel="Close icon" icon={X} />
  </InheritColorContainer>
)

export const TransparentInheritColorHover = () => (
  <InheritColorContainer>
    <IconButton kind="transparent" ariaLabel="Close icon" className={styles.hover} icon={X} />
  </InheritColorContainer>
)

export const TransparentInheritColorFocused = () => (
  <InheritColorContainer>
    <IconButton kind="transparent" ariaLabel="Close icon" className={styles.focus} icon={X} />
  </InheritColorContainer>
)

export const TransparentInheritColorActive = () => (
  <InheritColorContainer>
    <IconButton kind="transparent" ariaLabel="Close icon" className={styles.active} icon={X} />
  </InheritColorContainer>
)

export const TransparentInheritColorDisabled = () => (
  <InheritColorContainer>
    <IconButton kind="transparent" ariaLabel="Close icon" disabled icon={X} disabledTooltip="Yoda" />
  </InheritColorContainer>
)

export const TransparentInheritColorLoading = () => (
  <InheritColorContainer>
    <IconButton kind="transparent" ariaLabel="Close icon" icon={X} loading />
  </InheritColorContainer>
)

export const TransparentInheritColorLinkSemantics = () => (
  <InheritColorContainer>
    <IconButton kind="transparent" ariaLabel="Close icon" icon={X} component="a" href="#" />
  </InheritColorContainer>
)

export const Primary = () => <IconButton kind="primary" ariaLabel="Close icon" icon={X} />

export const PrimarySmall = () => <IconButton kind="primary" ariaLabel="Close icon" icon={X} size="small" />

export const PrimaryXLarge = () => <IconButton kind="primary" ariaLabel="Close icon" icon={X} size="xlarge" />

export const PrimaryHover = () => <IconButton kind="primary" ariaLabel="Close icon" className={styles.hover} icon={X} />

export const PrimaryFocused = () => <IconButton kind="primary" ariaLabel="Close icon" className={styles.focus} icon={X} />

export const PrimaryActive = () => <IconButton kind="primary" ariaLabel="Close icon" className={styles.active} icon={X} />

export const PrimaryDisabled = () => <IconButton kind="primary" ariaLabel="Close icon" disabled icon={X} disabledTooltip="Yoda" />

export const PrimaryLoading = () => <IconButton kind="primary" ariaLabel="Close icon" icon={X} loading />

export const PrimaryLinkSemantics = () => <IconButton kind="primary" ariaLabel="Close icon" icon={X} component="a" href="#" />

export const PrimaryPaddingNormal = () => <IconButton kind="primary" ariaLabel="Close icon" padding="normal" icon={X} />

export const WithTooltip = () => (
  <IconButton
    kind="transparent"
    ariaLabel="Close icon"
    icon={X}
    loading
    tooltipVisible
    tooltipPlacement="bottom"
    tooltip="Button tooltip"
  />
)
