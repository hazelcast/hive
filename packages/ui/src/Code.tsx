import React, { FC } from 'react'
import cn from 'classnames'

import styles from './Code.module.scss'

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'

// Let's hand pick the languages and themes we want to provide:
// We don't want a large bundle size.
//
// Languages:
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import cpp from 'react-syntax-highlighter/dist/esm/languages/prism/cpp'
import csharp from 'react-syntax-highlighter/dist/esm/languages/prism/csharp'
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java'
import kotlin from 'react-syntax-highlighter/dist/esm/languages/prism/kotlin'

// Themes
import darcula from 'react-syntax-highlighter/dist/esm/styles/prism/darcula'

SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('cpp', cpp)
SyntaxHighlighter.registerLanguage('csharp', csharp)
SyntaxHighlighter.registerLanguage('java', java)
SyntaxHighlighter.registerLanguage('kotlin', kotlin)

type language = 'jsx' | 'cpp' | 'csharp' | 'java' | 'kotlin'

type CodeProps = {
  language?: language
  className?: string
}

/*
  Our Code component is based on react-syntax-highlighter:
  https://github.com/react-syntax-highlighter/react-syntax-highlighter#readme

  * react-syntax-highlighter itself is based on either one of these two popular js highlighters: Prism.js, highlightjs.org.

  * We're using the light version of the Prism backend.
*/
export const Code: FC<CodeProps> = ({ language, children, className }) => {
  return (
    <div className={cn(styles.wrapper, className)}>
      <SyntaxHighlighter className="xxx" language={language} style={darcula}>
        {children}
      </SyntaxHighlighter>
    </div>
  )
}
