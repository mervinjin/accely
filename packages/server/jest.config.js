const { compilerOptions } = require('./tsconfig.json')
const { pathsToModuleNameMapper } = require('ts-jest/utils')

const { baseUrl, paths } = compilerOptions

const moduleNameMapper = pathsToModuleNameMapper(paths, {
  prefix: `<rootDir>/${baseUrl}/`,
})

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.type.ts',
    '!src/decorators/**',
    '!src/types/**',
    '!src/index.ts',
    '!src/utils/auth-checker.ts',
    '!src/utils/create-schema.ts',
  ],
  moduleNameMapper,
  modulePaths: [`<rootDir>/${baseUrl}`],
  preset: 'ts-jest',
  testEnvironment: 'node',
}
