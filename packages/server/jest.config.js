const { compilerOptions } = require('./tsconfig.json')
const { pathsToModuleNameMapper } = require('ts-jest/utils')

const { baseUrl, paths } = compilerOptions

const moduleNameMapper = pathsToModuleNameMapper(paths, {
  prefix: `<rootDir>/${baseUrl}/`,
})

module.exports = {
  collectCoverage: true,
  moduleNameMapper,
  modulePaths: [`<rootDir>/${baseUrl}`],
  preset: 'ts-jest',
  testEnvironment: 'node',
}
