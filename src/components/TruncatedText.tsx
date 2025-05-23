import React, { FC, useRef, useState, ReactNode } from 'react'
import mergeRefs from 'react-merge-refs'
import cn from 'classnames'
import useIsomorphicLayoutEffect from 'react-use/lib/useIsomorphicLayoutEffect'
import { useUID } from 'react-uid'

import { DataTestProp } from '../helpers/types'
import { Tooltip, TooltipProps } from './Tooltip'

import styles from './TruncatedText.module.scss'

interface TruncatedTextProps extends DataTestProp {
  text: ReactNode
  // Pass a new value to trigger a force re-render
  forceUpdateToken?: string | number | boolean
  className?: string
  multiline?: boolean
  tooltipVisible?: boolean
  tooltipClassName?: string
  hoverAbleTooltip?: boolean
  tooltipPlacement?: TooltipProps['placement']
}

export const TruncatedText: FC<TruncatedTextProps> = ({
  text,
  forceUpdateToken,
  className,
  tooltipVisible,
  tooltipPlacement = 'top',
  hoverAbleTooltip,
  multiline,
  tooltipClassName,
  'data-test': dataTest,
}) => {
  const textRef = useRef<HTMLDivElement>(null)
  const [tooltip, setTooltip] = useState<ReactNode | undefined>()
  const idTooltip = useUID()

  useIsomorphicLayoutEffect(() => {
    const span = textRef.current

    if (span === null) {
      return
    }

    // https://codepen.io/triple-j/pen/wadKQB
    setTooltip(span.offsetWidth < span.scrollWidth || span.offsetHeight < span.scrollHeight ? text : undefined)
  }, [text, forceUpdateToken])

  return (
    <Tooltip
      id={idTooltip}
      content={tooltip}
      visible={tooltipVisible}
      className={tooltipClassName}
      placement={tooltipPlacement}
      updateToken={forceUpdateToken}
      hoverAbleTooltip={hoverAbleTooltip}
    >
      {(ref) => (
        <div ref={mergeRefs([textRef, ref])} className={cn(styles.truncatedText, { [styles.multiline]: multiline }, className)}>
          <span data-test={dataTest} aria-labelledby={tooltip ? idTooltip : undefined}>
            {text}
          </span>
        </div>
      )}
    </Tooltip>
  )
}
