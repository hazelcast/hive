module.exports = {
  roots: ['<rootDir>'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['node_modules/(?!serialize-error)'],
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
  testRegex: '^.+\\.(test|spec)\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  restoreMocks: true,
  clearMocks: true,
  collectCoverage: true,
  coveragePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
  coverageReporters: ['text-summary', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 70,
      lines: 78,
      statements: 78,
    },
  },
  // https://jestjs.io/docs/en/webpack.html#mocking-css-modules
  moduleNameMapper: {
    '\\.(s?css)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>setupTests.ts'],
}
