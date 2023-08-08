import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { camelCase } from 'camel-case'
import typescript2 from 'rollup-plugin-typescript2'
import PKG from './package.json'

const name = camelCase(PKG.name.replace(/^@bemoje/i, ''))

const banner = `/*!
 * ${PKG.name} v${PKG.version}
 * (c) ${PKG.author.name}
 * Released under the ${PKG.license} License.
 */
`

export default {
  input: './src/index.ts',
  external: [...Array.from(Object.keys(PKG.dependencies)), 'fs', 'path', 'child_process'],
  output: [
    {
      banner,
      name,
      exports: 'named',
      sourcemap: true,
      file: './dist/index.cjs.js',
      format: 'commonjs',
    },
    {
      banner,
      name,
      exports: 'named',
      sourcemap: true,
      file: './dist/index.esm.js',
      format: 'esm',
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript2({
      clean: true,
      useTsconfigDeclarationDir: true,
      tsconfig: './tsconfig.bundle.json',
    }),
  ],
}
