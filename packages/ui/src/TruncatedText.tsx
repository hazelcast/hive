import React, { FC, useRef, useState, useLayoutEffect, ReactChild } from 'react'
import cn from 'classnames'

import { Tooltip } from './Tooltip'

import styles from './TruncatedText.module.scss'

interface TruncatedTextProps {
  text: string | number | ((...arg: unknown[]) => string)
  // Pass a new value to trigger a force re-render
  forceUpdateToken?: number | string
  className?: string
}

export const TruncatedText: FC<TruncatedTextProps> = ({ text, forceUpdateToken, className }) => {
  const textRef = useRef<HTMLDivElement>(null)
  const [tooltip, setTooltip] = useState<ReactChild | undefined>()

  useLayoutEffect(() => {
    const span = textRef.current

    if (span === null) {
      return
    }

    // https://codepen.io/triple-j/pen/wadKQB
    setTooltip(span.offsetWidth < span.scrollWidth ? text : undefined)
  }, [text, forceUpdateToken])

  return (
    <Tooltip placement="top" overlay={tooltip}>
      <div ref={textRef} className={cn(styles.truncatedText, className)}>
        {text}
      </div>
    </Tooltip>
  )
}
