import React from 'react'
import cn from 'classnames'

import { MdxDocsPage } from '../MdxDocsPage'

import styles from './Gradients.module.scss'

export const Gradients = () => (
  <MdxDocsPage>
    <div className={styles.root}>
      {Object.entries(styles)
        .filter(([name]) => name.startsWith('gradient'))
        .map(([key, value]) => {
          return (
            <div key={key} className={cn(styles.item, value)}>
              <h1 className={cn(styles.name, styles.text)}>{key.replace('gradient', '')}</h1>
              <div className={cn(styles.preview, styles.bg)} />
            </div>
          )
        })}
    </div>
  </MdxDocsPage>
)
