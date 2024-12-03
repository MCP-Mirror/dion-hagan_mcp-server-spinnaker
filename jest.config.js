export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  setupFiles: ['<rootDir>/src/__tests__/setup.ts'],
  // Only run .test.ts files
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  // Exclude declaration files
  testPathIgnorePatterns: ['\\.d\\.ts$', 'dist/'],
};