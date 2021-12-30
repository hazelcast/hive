module.exports = {
  roots: ['<rootDir>'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['node_modules/(?!@hazelcast)'],
  preset: 'ts-jest/presets/js-with-ts',
  testRegex: '^.+\\.(test|spec)\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  restoreMocks: true,
  clearMocks: true,
  collectCoverage: true,
  coveragePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
  coverageReporters: ['text-summary', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 70,
      lines: 80,
      statements: 80,
    },
  },
  // https://jestjs.io/docs/en/webpack.html#mocking-css-modules
  moduleNameMapper: {
    '\\.(s?css)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>setupTests.ts'],
}
