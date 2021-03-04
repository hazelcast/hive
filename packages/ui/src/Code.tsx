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
import go from 'react-syntax-highlighter/dist/esm/languages/prism/go'
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java'
import kotlin from 'react-syntax-highlighter/dist/esm/languages/prism/kotlin'
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python'
import scala from 'react-syntax-highlighter/dist/esm/languages/prism/scala'

// Themes
import vs from 'react-syntax-highlighter/dist/esm/styles/prism/vs'
import darcula from 'react-syntax-highlighter/dist/esm/styles/prism/darcula'

// Register these builtin languages we'd use frequently
SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('cpp', cpp)
SyntaxHighlighter.registerLanguage('csharp', csharp)
SyntaxHighlighter.registerLanguage('go', go)
SyntaxHighlighter.registerLanguage('java', java)
SyntaxHighlighter.registerLanguage('kotlin', kotlin)
SyntaxHighlighter.registerLanguage('python', python)
SyntaxHighlighter.registerLanguage('scala', scala)

// Export SyntaxHighlighter for allowing user to register other languages
export { SyntaxHighlighter }

type BUILTIN_LANGUAGES = 'jsx' | 'cpp' | 'csharp' | 'java' | 'kotlin' | 'go' | 'python' | 'scala'

// Allow passing any custom language name.
export type Language = BUILTIN_LANGUAGES | string

type BUILTIN_THEMES = 'light' | 'dark'

// Allow passing any custom theme.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Theme = BUILTIN_THEMES | any

type ThemeToStyleMapping = { [key in Theme]: unknown }

const THEME_TO_STYLE_MAPPING: ThemeToStyleMapping = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  light: vs,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  dark: darcula,
}

export type CodeProps = {
  language?: Language
  theme?: Theme
  showLineNumbers?: boolean
  wrapLongLines?: boolean
  className?: string
}

/*
  Our Code component is based on react-syntax-highlighter:
  https://github.com/react-syntax-highlighter/react-syntax-highlighter#readme

  * react-syntax-highlighter itself is based on either one of these two popular js highlighters: Prism.js, highlightjs.org.

  * We're using the light version of the Prism backend.

  * Only a select number of languages declared above are supported to keep it light.

  * Using other languages is possible with .language and .theme props. See storybook for an example.
*/
export const Code: FC<CodeProps> = ({ language, theme = 'light', showLineNumbers, wrapLongLines, children, className }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const style: unknown = THEME_TO_STYLE_MAPPING[theme] || theme
  return (
    <div className={cn(styles.container, className)}>
      <SyntaxHighlighter
        className={cn(styles.syntaxHighlighter)}
        language={language}
        showLineNumbers={showLineNumbers}
        wrapLongLines={wrapLongLines}
        style={style}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  )
}
