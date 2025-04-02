import React from 'react'
import { MdxDocsPage } from '../MdxDocsPage'
import cn from 'classnames'
import styles from './Intro.module.scss'
import { Card } from '../../src/components/Card'
import { Button } from '../../src'

export const Intro = () => {
  return (
    <MdxDocsPage>
      <section className={cn(styles.logoContainer)}>
        <img src="./images/hive.png" alt="hive" />
      </section>
      <main className={cn(styles.mainContainer)}>
        <h2 className={cn(styles.subheading)}>
          <strong>HIVE</strong> is an open source Design System for products and digital experiences. With Hazelcast Design Language at its
          core it consists of brand guidelines, design tools, code, resources and interface guidelines.
        </h2>
        <h4 className={cn(styles.paragraphHeading, styles.paragraph)}>Overview</h4>
        <p className={cn(styles.paragraph)}>
          A design system is a set of standardised guidelines, principles, and tools for designing and developing digital products such as
          websites, web applications, internal systems and other. It helps to create a consistent look and feel across a product, by
          defining the design elements that make up the product, such as colours, typography, icons, and layout.
        </p>
        <p className={cn(styles.paragraph)}>
          HIVE includes components such as code libraries, design patterns, and user interface (UI) templates, which can be used to build
          and maintain the product over time.
        </p>
        <p className={cn(styles.paragraph)}>
          HIVE is also used in other types of design work, such as branding and marketing materials. HIVE can help to improve the efficiency
          and effectiveness of the design process by providing a common language and set of tools that designers and developers can use to
          collaborate and build products more quickly and consistently.
        </p>
        <aside className={cn(styles.links)}>
          <Card contentClassName={cn(styles.cardLink)}>
            <img src="./images/figma.png" alt="figma" className={cn(styles.linkImg)} />
            <p>
              HIVE is available as a Figma library, for rapid prototyping of web based applications. It contains all the resources you need
              to get started
            </p>
            <Button
              component="a"
              href="https://www.figma.com/file/0CFsDZKJY5GMi8T3QKbjDm/HIVE-PORTAL?node-id=20%3A23&t=Y0g9peNGS9ZHfAWX-0"
              variant="outlined"
              target="_blank"
            >
              Get Started
            </Button>
          </Card>
          <Card contentClassName={cn(styles.cardLink)}>
            <img src="./images/github.png" alt="github" className={cn(styles.linkImg)} />
            <p>
              HIVE uses React as the underlying JS framework, it provides developers with React.js components, scss, css, html and assets
            </p>
            <Button component="a" href="https://github.com/hazelcast/hive" variant="outlined" target="_blank">
              Get Started
            </Button>
          </Card>
        </aside>
      </main>
    </MdxDocsPage>
  )
}
