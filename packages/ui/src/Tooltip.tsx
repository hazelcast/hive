import React, { FC, ReactElement } from 'react'
import RCTooltip from 'rc-tooltip'
import { TooltipProps as RCTooltipProps } from 'rc-tooltip/lib/Tooltip'

import 'rc-tooltip/assets/bootstrap.css'

import styles from './Tooltip.module.scss'

export type TooltipProps = RCTooltipProps & {
  wrapMaxWidth?: boolean
  wrapElement?: boolean
}

export const Tooltip: FC<TooltipProps & { children: ReactElement }> = ({
  overlay,
  wrapMaxWidth = true,
  wrapElement = false,
  children,
  ...props
}) => {
  return overlay ? (
    <RCTooltip
      overlay={wrapMaxWidth ? <div className={styles.wrapper}>{overlay}</div> : overlay}
      overlayClassName={styles.overlay}
      {...props}
    >
      {wrapElement ? (
        // TODO: remove once https://github.com/react-component/tooltip/issues/18#issuecomment-411476678 has been resolved
        <div style={{ display: 'inline-block' }}>{children}</div>
      ) : (
        children
      )}
    </RCTooltip>
  ) : (
    children
  )
}
