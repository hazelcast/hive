import React, { FC, useRef, useState, ReactChild, ReactText, ReactElement } from 'react'
import mergeRefs from 'react-merge-refs'
import cn from 'classnames'
import useIsomorphicLayoutEffect from 'react-use/lib/useIsomorphicLayoutEffect'
import { useUID } from 'react-uid'

import { Tooltip, TooltipProps } from './Tooltip'

import styles from './TruncatedText.module.scss'

interface TruncatedTextProps {
  text: ReactText | ((...arg: unknown[]) => string) | ReactElement
  // Pass a new value to trigger a force re-render
  forceUpdateToken?: ReactText | boolean
  className?: string
  tooltipVisible?: boolean
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
}) => {
  const textRef = useRef<HTMLDivElement>(null)
  const [tooltip, setTooltip] = useState<ReactChild | undefined>()
  const idTooltip = useUID()

  useIsomorphicLayoutEffect(() => {
    const span = textRef.current

    if (span === null) {
      return
    }

    // https://codepen.io/triple-j/pen/wadKQB
    setTooltip(span.offsetWidth < span.scrollWidth ? text : undefined)
  }, [text, forceUpdateToken])

  return (
    <Tooltip
      id={idTooltip}
      content={tooltip}
      visible={tooltipVisible}
      placement={tooltipPlacement}
      updateToken={forceUpdateToken}
      hoverAbleTooltip={hoverAbleTooltip}
    >
      {(ref) => (
        <div ref={mergeRefs([textRef, ref])} className={cn(styles.truncatedText, className)}>
          <span aria-labelledby={tooltip ? idTooltip : undefined}>{text}</span>
        </div>
      )}
    </Tooltip>
  )
}
