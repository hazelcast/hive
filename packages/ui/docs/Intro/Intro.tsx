import React from 'react'
import { MdxDocsPage } from '../MdxDocsPage'
import cn from 'classnames'
import styles from './Intro.module.scss'

export const Intro = () => {
  return (
    <MdxDocsPage>
      <section className={cn(styles.logoSection)}>
        <img src="./images/hive.png" alt="hive" />
      </section>
      <h2>
        HIVE is an open source Design System for products and digital experiences. With Hazelcast Design Language at its core it consists of
        brand guidelines, design tools, code, resources and interface guidelines.
      </h2>
    </MdxDocsPage>
  )
}
