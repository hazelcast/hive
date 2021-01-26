import React, { FC } from 'react'
import cn from 'classnames'

import styles from './Code.module.scss'

type CodeProps = {
  language?: string
  className?: string
}

export const Code: FC<CodeProps> = ({
  language,
  children,
  className
}) => {
  return (
    <pre className={cn(styles.wrapper, className)}>
      {children}
    </pre>
  )
}
