import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import { babel } from '@rollup/plugin-babel'
import { readFileSync } from 'fs'
import { resolve as pathResolve } from 'path'
import { glob } from 'glob'
import { fileURLToPath, URL } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// Read package.json to get list of dependencies
const packageJson = JSON.parse(readFileSync(pathResolve(__dirname, 'package.json'), 'utf-8'))
const dependencies = Object.keys(packageJson.dependencies || {})
const peerDependencies = Object.keys(packageJson.peerDependencies || {})

// External dependencies
const external = (id) => {
  // External: React and React DOM (peerDependencies)
  if (id === 'react' || id === 'react-dom' || id.startsWith('react/') || id.startsWith('react-dom/')) {
    return true
  }
  
  // External: all dependencies from package.json
  if (dependencies.includes(id) || peerDependencies.includes(id)) {
    return true
  }
  
  // External: scoped packages or packages with sub-imports
  if (dependencies.some(dep => id.startsWith(dep + '/')) || peerDependencies.some(dep => id.startsWith(dep + '/'))) {
    return true
  }
  
  // External: any package that doesn't start with . or / (npm packages)
  if (!id.startsWith('.') && !id.startsWith('/') && !id.includes('src/')) {
    return true
  }
  
  return false
}

// Create entry points for all TypeScript files in src
const createEntries = () => {
  const entries = {}
  
  // All component and utility files (exclude test files, stories, and declaration files)
  const srcFiles = glob.sync('src/**/*.{ts,tsx}', {
    ignore: [
      'src/**/*.{test,spec,stories}.{ts,tsx}',
      'src/**/__tests__/**/*',
      'src/**/__stories__/**/*',
      'src/**/*.d.ts',
      'src/test-helpers/**/*',
      'src/setupTests.ts',
      'src/docs/**/*',
      'src/lib/**/*'
    ]
  })
  
  srcFiles.forEach(file => {
    const relativePath = file.replace('src/', '').replace(/\.(ts|tsx)$/, '')
    entries[relativePath] = pathResolve(__dirname, file)
  })
  
  return entries
}

const entries = createEntries()

export default {
  input: entries,
  external,
  output: {
    dir: 'lib',
    format: 'cjs',
    exports: 'named',
    preserveModules: true,
    preserveModulesRoot: 'src',
    entryFileNames: '[name].js',
    sourcemap: true
  },
  plugins: [
    resolve({
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    }),
    commonjs({
      esmExternals: true,
      requireReturnsDefault: 'preferred',
      defaultIsModuleExports: true
    }),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'lib',
      rootDir: 'src',
      exclude: [
        '**/*.test.*',
        '**/*.spec.*', 
        '**/*.stories.*',
        '__tests__/**/*',
        '__stories__/**/*',
        'test-helpers/**/*',
        'setupTests.ts',
        'node_modules/**/*'
      ]
    }),
    postcss({
      extract: 'styles.css',
      minimize: true,
      modules: {
        localsConvention: 'camelCaseOnly',
        generateScopedName: '[name]__[local]___[hash:base64:5]'
      },
      use: ['sass']
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      presets: [
        ['@babel/preset-env', { targets: 'defaults' }],
        ['@babel/preset-react', { runtime: 'automatic' }],
        '@babel/preset-typescript'
      ]
    })
  ]
}