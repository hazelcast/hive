import { readFileSync } from 'fs'
import { resolve } from 'path'

describe('package metadata', () => {
  it('retains CSS files as side effects without disabling JavaScript tree-shaking', () => {
    const packageJson = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf8')) as {
      sideEffects: false | string[]
      files: string[]
    }

    expect(packageJson.sideEffects).toEqual(['**/*.css'])
    expect(packageJson.files).toContain('styles')
  })
})
