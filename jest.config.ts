import type { Config } from '@jest/types'

export default async (): Promise<Config.InitialOptions> => {
  return {
    clearMocks: true,
    resetMocks: true,
    resetModules: true,
    testTimeout: 180000,
    testRegex: '/__tests__/.*\\.(spec|test)\\.[tj]sx?$',
    testPathIgnorePatterns: [
      '/node_modules/',
      '/build/',
      '/dist/',
      '/coverage/'
    ],
    transform: {
      '\\.ts$': 'ts-jest'
    },
    verbose: true
  }
}
