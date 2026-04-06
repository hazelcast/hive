import React, { FC, useRef, useState, ReactNode } from 'react'
import cn from 'classnames'
import useIsomorphicLayoutEffect from 'react-use/lib/useIsomorphicLayoutEffect'
import { useUID } from 'react-uid'

import { DataTestProp } from '../helpers/types'
import { SimpleTooltip, TooltipPlacement } from './Tooltip'

import styles from './TruncatedText.module.scss'

interface TruncatedTextProps extends DataTestProp {
  text: ReactNode
  // Pass a new value to trigger a force re-render
  forceUpdateToken?: string | number | boolean
  className?: string
  multiline?: boolean
  tooltipVisible?: boolean
  tooltipClassName?: string
  tooltipPlacement?: TooltipPlacement
}

export const TruncatedText: FC<TruncatedTextProps> = ({
  text,
  forceUpdateToken,
  className,
  tooltipVisible,
  tooltipPlacement = 'top',
  multiline,
  tooltipClassName,
  'data-test': dataTest,
}) => {
  const textRef = useRef<HTMLDivElement>(null)
  const [isTruncated, setIsTruncated] = useState(false)
  const idTooltip = useUID()

  useIsomorphicLayoutEffect(() => {
    const span = textRef.current

    if (span === null) {
      return
    }

    // https://codepen.io/triple-j/pen/wadKQB
    setIsTruncated(span.offsetWidth < span.scrollWidth || span.offsetHeight < span.scrollHeight)
  }, [text, forceUpdateToken])

  const content = (
    <div ref={textRef} className={cn(styles.truncatedText, { [styles.multiline]: multiline }, className)}>
      <span data-test={dataTest} aria-labelledby={isTruncated ? idTooltip : undefined}>
        {text}
      </span>
    </div>
  )

  const tooltipOpen = typeof tooltipVisible === 'boolean' ? tooltipVisible : undefined

  return (
    <SimpleTooltip
      content={isTruncated ? text : undefined}
      open={tooltipOpen}
      placement={tooltipPlacement}
      id={idTooltip}
      className={tooltipClassName}
    >
      {content}
    </SimpleTooltip>
  )
}
