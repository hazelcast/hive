import fs from 'fs'
import path from 'path'

import { styleConstants } from '../../src/utils/styleConstants'

const variablesCss = fs.readFileSync(path.join(__dirname, '../../styles/variables.css'), 'utf-8')

const readCssVar = (name: string): string => {
  const match = variablesCss.match(new RegExp(`--${name}:\\s*([^;]+);`))
  if (!match) {
    throw new Error(`--${name} not found in styles/variables.css`)
  }
  return match[1].trim()
}

// styleConstants duplicates a handful of design tokens for use in JS/TS logic (not just CSS).
// This guards against the two copies drifting apart when one of them is updated.
describe('utils/styleConstants', () => {
  it.each([
    ['colorPrimary', 'hive-color-primary'],
    ['colorSuccess', 'hive-color-success'],
    ['iconStrokeWidth', 'hive-icon-stroke-width'],
    ['iconStrokeWidthBold', 'hive-icon-stroke-width-bold'],
  ] as const)('%s matches --%s in styles/variables.css', (constantKey, cssVarName) => {
    expect(styleConstants[constantKey]).toBe(readCssVar(cssVarName))
  })

  it.each([
    ['tableColumnMinWidth', 'hive-table-column-min-width'],
    ['tableColumnWidth', 'hive-table-column-width'],
    ['tableColumnMaxWidth', 'hive-table-column-max-width'],
  ] as const)('%s matches the pixel value of --%s in styles/variables.css', (constantKey, cssVarName) => {
    expect(`${styleConstants[constantKey]}px`).toBe(readCssVar(cssVarName))
  })
})
