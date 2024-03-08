/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line no-undef
const baseConfig = require('../jest.react.config.js');

// eslint-disable-next-line no-undef
module.exports = {
  ...baseConfig,
  setupFiles: ['jest-localstorage-mock'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testEnvironment: 'jest-environment-jsdom',
  coveragePathIgnorePatterns: ['node_modules', '__tests__', '.stories.'],
};
