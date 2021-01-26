import React, { FC } from 'react'
import cn from 'classnames'

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
// import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
// import js from 'react-syntax-highlighter/dist/esm/languages/prism/js';
// import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism';

// SyntaxHighlighter.registerLanguage('jsx', jsx);
// SyntaxHighlighter.registerLanguage('js', js);

import styles from './Code.module.scss'

type CodeProps = {
  language?: string
  className?: string
}

/*
  Our Code component is based on react-syntax-highlighter:
  https://github.com/react-syntax-highlighter/react-syntax-highlighter#readme

  * react-syntax-highlighter itself is based on either one of these two popular js highlighters: Prism.js, highlightjs.org.

  * We're using the light version of the Prism backend.
*/
export const Code: FC<CodeProps> = ({
  language,
  children,
  className
}) => {
  return (
    // <pre className={cn(styles.wrapper, className)}>
    //   {children}
    // </pre>
    <SyntaxHighlighter language="javascript">
      {children}
    </SyntaxHighlighter>

  )
}
