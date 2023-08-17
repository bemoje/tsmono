import path from 'path'
import { execBatch } from '../pkg/node/src/lib/execBatch'
const names = process.argv.slice(2)

const cwd = process.cwd()
const node_modules = path.join(cwd, 'node_modules')
// const bemoje_modules_real = path.join(node_modules, '@bemoje')
// const bemoje_modules_fake = path.join(node_modules, '@nobemoje')

execBatch([
  'npm run wipe-bemoje-modules',
  'nx run-many --parallel 4 -t build' + (names.length ? ' -p ' + names.join(',') : ''),
  'npm run wipe-bemoje-modules',
])
