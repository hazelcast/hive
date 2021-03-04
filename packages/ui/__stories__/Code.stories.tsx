import React from 'react'
import { Code, SyntaxHighlighter } from '../src'
import pascal from 'react-syntax-highlighter/dist/esm/languages/prism/pascal'
import twilight from 'react-syntax-highlighter/dist/esm/styles/prism/twilight'

SyntaxHighlighter.registerLanguage('pascal', pascal)

export default {
  title: 'Components/Code',
  component: Code,
}

const SAMPLE_CODE = `
// https://stackoverflow.com/a/17623252
for (let i = 1; i <= 100; i++) {
  let out = '';
  if (i % 3 === 0) out += 'Fizz';
  if (i % 5 === 0) out += 'Buzz';
  console.log(out || i);
}
`

export const Default = () => {
  return <Code language="jsx">{SAMPLE_CODE}</Code>
}

export const DarkWithLineNumbers = () => {
  return (
    <Code language="jsx" theme="dark" showLineNumbers={true}>
      {SAMPLE_CODE}
    </Code>
  )
}

export const WrapLongLines = () => {
  return (
    <Code wrapLongLines>
      Hazelcast IMDG clients and programming language APIs allow you to extend the benefits of operational in-memory computing to
      applications in these languages. These clients and APIs (except Scala) are open source and supported by Hazelcast.
    </Code>
  )
}

const PASCAL_SAMPLE = ` // do not forget to register your language (eg. SyntaxHighlighter.registerLanguage('pascal', pascal))
program ObjectPascalExample;
type
  THelloWorld = object
      procedure Put;
  end;

procedure THelloWorld.Put;
begin
  WriteLn('Hello, World!');
end;

var
  HelloWorld: THelloWorld; { allocated on the stack and can be used without explicit allocation. }
begin
  HelloWorld.Put;
end.`

export const NonBuiltinLanguage = () => {
  return (
    <Code language={"pascal"}>
      {PASCAL_SAMPLE}
    </Code>
  )
}

export const NonBuiltinTheme = () => {
  return (

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <Code language={"pascal"} theme={twilight}>
      {PASCAL_SAMPLE}
    </Code>
  )
}
