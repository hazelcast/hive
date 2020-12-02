import React, { FC, useRef, useState, ReactChild } from 'react'
import mergeRefs from 'react-merge-refs'
import { v4 as uuid } from 'uuid'
import cn from 'classnames'
import useIsomorphicLayoutEffect from 'react-use/lib/useIsomorphicLayoutEffect'

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

  const idTooltip = `${uuid()}-tooltip`

  useIsomorphicLayoutEffect(() => {
    const span = textRef.current

    if (span === null) {
      return
    }

    // https://codepen.io/triple-j/pen/wadKQB
    setTooltip(span.offsetWidth < span.scrollWidth ? text : undefined)
  }, [text, forceUpdateToken])

  return (
    <Tooltip id={idTooltip} placement="top" content={tooltip}>
      {(ref) => (
        <div ref={mergeRefs([textRef, ref])} className={cn(styles.truncatedText, className)}>
          <span aria-labelledby={tooltip ? idTooltip : undefined}>{text}</span>
        </div>
      )}
    </Tooltip>
  )
}
