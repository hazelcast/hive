import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import postcss from 'postcss'

import { COLOR_SCHEME_STORAGE_KEY, getColorSchemeBootstrapScript, initializeColorScheme } from '../../src/utils/colorScheme'

const mockSystemScheme = (dark: boolean) => {
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    matches: dark && query === '(prefers-color-scheme: dark)',
    media: query,
  }))
}

describe('color scheme bootstrap', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.style.colorScheme = ''
    mockSystemScheme(false)
  })

  it('keeps existing consumers light by default, regardless of the OS', () => {
    mockSystemScheme(true)
    const css = readFileSync(join(__dirname, '../../styles/variables.css'), 'utf8')
    const rootRule = postcss.parse(css).nodes.find((node) => node.type === 'rule' && node.selector === ':root')
    const colorScheme = rootRule?.nodes?.find((node) => node.type === 'decl' && node.prop === 'color-scheme')

    expect(colorScheme?.value).toBe('light')
  })

  it('uses the OS preference when opted in without a saved choice', () => {
    mockSystemScheme(true)

    expect(initializeColorScheme()).toBe('dark')
    expect(document.documentElement.style.colorScheme).toBe('dark')
    expect(localStorage.getItem(COLOR_SCHEME_STORAGE_KEY)).toBeNull()
  })

  it('prefers a valid saved choice over the OS preference', () => {
    mockSystemScheme(true)
    localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, JSON.stringify('light'))

    expect(initializeColorScheme()).toBe('light')
    expect(document.documentElement.style.colorScheme).toBe('light')
  })

  it('resolves a saved System preference against the OS before paint', () => {
    mockSystemScheme(true)
    localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, JSON.stringify('system'))
    expect(initializeColorScheme()).toBe('dark')
    expect(localStorage.getItem(COLOR_SCHEME_STORAGE_KEY)).toBe('"system"')
  })

  it('falls back to the OS preference for invalid stored data', () => {
    mockSystemScheme(true)
    localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, JSON.stringify('blue'))

    expect(initializeColorScheme()).toBe('dark')
    expect(document.documentElement.style.colorScheme).toBe('dark')
  })

  it('generates a self-contained script with the same initialization behavior', () => {
    const script = getColorSchemeBootstrapScript()

    expect(script).toContain(JSON.stringify(COLOR_SCHEME_STORAGE_KEY))
    expect(script).toContain('document.documentElement.style.colorScheme')
    expect(script).toContain("'(prefers-color-scheme: dark)'")
  })
})
