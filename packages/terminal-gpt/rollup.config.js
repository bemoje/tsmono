import json from '@rollup/plugin-json'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/index.ts', // your main TypeScript file
  output: {
    file: 'dist/bundle.js', // output file
    format: 'cjs', // output format
  },
  plugins: [
    resolve(), // so Rollup can find dependencies in node_modules
    commonjs(), // so Rollup can convert CommonJS to ES6
    typescript(), // so Rollup can compile TypeScript
    json(), // so Rollup can import JSON files
  ],
}
