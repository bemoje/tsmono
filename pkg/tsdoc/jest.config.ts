/* eslint-disable */
const pkg = require('./package.json')
const name = pkg.name.split('@')[1]
export default {
  displayName: name,
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/pkg/' + name,
}
