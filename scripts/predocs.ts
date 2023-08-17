import fs from 'fs'
import path from 'path'
import { snakeCase } from 'snake-case'

const pkgspath = path.join(process.cwd(), 'pkg')
const indexpath = path.join(pkgspath, 'index.ts')
const src = fs
  .readdirSync(pkgspath)
  .filter((name) => name !== 'index.ts')
  .map((name) => `export * as ${snakeCase(name)} from './${name}/src'`)
  .join('\n')

fs.writeFileSync(indexpath, src)
