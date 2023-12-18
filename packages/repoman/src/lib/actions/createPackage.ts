import path from 'path'
import {
  Any,
  execute,
  removeFileSync,
  updateJsonFileSafeSync,
  updateJsonFileSync,
  writeFileSafeSync,
  writeJsonFileSafeSync,
} from '@bemoje/util'
import { createRepoFiles } from './createRepoFiles'
import { fixPackageJson } from '../util/fixPackageJson'

export function createPackage(name: string, options: { isCli?: boolean } = {}) {
  if (!name) throw new Error('No name provided')

  execute(
    `nx g library ${name} --directory packages/${name} --name ${name} --importPath "@bemoje/${name}" --bundler rollup --testEnvironment node --unitTestRunner jest --compiler tsc`
  )

  const libRoot = path.join(process.cwd(), 'packages', name)

  writeFileSafeSync(
    path.join(libRoot, '.eslintrc.json'),
    JSON.stringify(
      {
        extends: ['../../.eslintrc.json'],
        ignorePatterns: ['!**/*'],
        overrides: [],
      },
      null,
      2
    )
  )

  updateJsonFileSafeSync(
    path.join(libRoot, 'project.json'),
    (project: Any) => {
      project.targets.build = {
        executor: 'nx:run-script',
        outputs: ['{options.outputPath}'],
        options: {
          script: 'build',
          project: `packages/${name}/package.json`,
        },
      }
      if (options.isCli) project.projectType = 'application'
      return project
    },
    '{}'
  )

  updateJsonFileSafeSync(
    path.join(libRoot, 'package.json'),
    (pkg: Any) => {
      pkg.main = 'cjs/index.js'
      pkg.module = 'esm/index.js'
      pkg.types = 'types/index.d.ts'
      pkg.type = 'commonjs'
      if (options.isCli) pkg.preferGlobal = true
      return pkg
    },
    '{}'
  )

  updateJsonFileSafeSync(
    path.join(libRoot, 'tsconfig.json'),
    () => {
      return {
        extends: '../../tsconfig.json',
        compilerOptions: {
          module: 'CommonJS',
          target: 'ES2022',
          strict: true,
          verbatimModuleSyntax: false,
          declaration: true,
          sourceMap: true,
          declarationMap: true,
          // "declarationDir": "./dist",
          sourceRoot: 'src',

          // "module": "commonjs",
          forceConsistentCasingInFileNames: true,
          disableSourceOfProjectReferenceRedirect: true,
          // "strict": true,
          noImplicitOverride: true,
          noPropertyAccessFromIndexSignature: true,
          noImplicitReturns: true,
          noFallthroughCasesInSwitch: true,
        },
        files: [],
        include: [],
        references: [],
      }
    },
    '{}'
  )

  writeFileSafeSync(
    path.join(libRoot, 'jest.config.ts'),
    [
      '/* eslint-disable */',
      'export default {',
      `  displayName: '${name}',`,
      "  preset: '../../jest.preset.js',",
      "  testEnvironment: 'node',",
      '  transform: {',
      "    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],",
      '  },',
      "  moduleFileExtensions: ['ts', 'js', 'html'],",
      `  coverageDirectory: '../../coverage/packages/${name}',`,
      '}',
    ].join('\n')
  )

  removeFileSync(path.join(libRoot, '.swcrc'))

  execute(`nx build ${name}`)

  fixPackageJson()

  updateJsonFileSync(path.join(process.cwd(), 'package.json'), (pkg: Any) => {
    const deps = pkg.dependencies as Record<string, string>
    deps['@bemoje/' + name] = 'latest'
    return pkg
  })

  const config = {
    name: name,
    type: options.isCli ? 'application' : 'library',
    npm: {
      publish: true,
      name: '@bemoje/' + name,
      usesNodeInternals: true,
      bin: options.isCli ? name : '',
      license: 'MIT',
      keywords: [],
    },
  }
  writeJsonFileSafeSync(path.join(libRoot, 'repoman.json'), config, { spaces: 2 })
  createRepoFiles([name])

  execute('npm publish --access public', {
    cwd: path.join(process.cwd(), 'dist', 'packages', name),
    noEcho: true,
    silent: true,
  })
}
