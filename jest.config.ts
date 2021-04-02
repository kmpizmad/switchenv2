import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  forceExit: true,
  transform: {
    '\\.ts$': 'ts-jest',
  },
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)x?$',
  testPathIgnorePatterns: ['node_modules', 'build', '__coverage__'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  collectCoverageFrom: ['**/*.ts', '!**/node_modules/**', '!**/build/**'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coverageDirectory: '__coverage__',
};

export default config;
