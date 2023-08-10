import { strUnwrap, tsExtractImports } from '@bemoje/node-util'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import { camelCase } from 'camel-case'
import fs from 'fs'
import path from 'path'
import minify from 'rollup-plugin-babel-minify'
import typescript2 from 'rollup-plugin-typescript2'
import walkdir from 'walkdir'
import PKG from './package.json'

function walkTsFiles(srcdir, filter, options) {
  const result = []
  walkdir.sync(srcdir, options, (filepath, stat) => {
    if (!stat.isFile()) return
    if (!/\.ts$/i.test(filepath)) return
    if (/\..+\.ts$/i.test(filepath)) return
    if (!filter(filepath, stat)) return
    result.push(filepath)
  })
  return result
}

function getImportedBuiltins(pkgroot) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
  const builtins = new Set(require('module').builtinModules)
  const srcdir = path.join(pkgroot, 'src')
  const fpaths = walkTsFiles(srcdir, (fpath) => !/node_modules/i.test(fpath))
  const imports = new Set()
  fpaths.forEach((fpath) => {
    tsExtractImports(fs.readFileSync(fpath, 'utf8')).forEach(({ match }) => {
      const imp = strUnwrap(match.substring(match.indexOf('from ') + 5).trim(), "'", "'")
      if (builtins.has(imp)) imports.add(imp)
    })
  })
  return [...imports]
}

// eslint-disable-next-line no-undef
const importedBuiltins = getImportedBuiltins(__dirname)
const dependencies = [...Object.keys(PKG.dependencies)]
const external = [...dependencies, ...importedBuiltins]

const name = camelCase(PKG.name.replace(/^@bemoje/i, ''))

const banner = `/*!
 * ${PKG.name} v${PKG.version}
 * (c) ${PKG.author.name}
 * Released under the ${PKG.license} License.
 */
`
const output = []
if (PKG.browser && !importedBuiltins.length)
  output.push({
    banner,
    name,
    file: PKG.browser,
    format: 'umd',
    plugins: [resolve()],
  })
if (PKG.main)
  output.push({
    banner,
    name,
    exports: 'named',
    sourcemap: true,
    file: PKG.main,
    format: 'commonjs',
    plugins: [commonjs()],
  })
if (PKG.module)
  output.push({
    banner,
    name,
    exports: 'named',
    sourcemap: true,
    file: PKG.module,
    format: 'esm',
  })

export default {
  input: './src/index.ts',
  external,
  output,
  plugins: [
    json(),
    typescript2({
      clean: true,
      useTsconfigDeclarationDir: true,
      tsconfig: './tsconfig.bundle.json',
    }),
    minify({ comments: false, builtIns: false, mangle: false, removeConsole: false }),
  ],
}
