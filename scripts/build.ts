import fs from 'fs'
import path from 'path'
import { execBatch } from '../pkg/node/src/lib/execBatch'
const names = process.argv.slice(2)

const cwd = process.cwd()
const node_modules = path.join(cwd, 'node_modules')
const bemoje_modules_real = path.join(node_modules, '@bemoje')
const bemoje_modules_fake = path.join(node_modules, '@nobemoje')

if (fs.existsSync(bemoje_modules_fake)) {
  if (fs.existsSync(bemoje_modules_real)) {
    fs.rmdirSync(bemoje_modules_fake, { recursive: true })
    execBatch(['npm update @bemoje/*'])
  }
  fs.renameSync(bemoje_modules_fake, bemoje_modules_real)
  fs.rmdirSync(bemoje_modules_fake, { recursive: true })
  console.log('enabled @bemoje in node_modules')
}

execBatch([
  'npm run wipe-bemoje-modules',
  'npm update @bemoje/*',
  'nx run-many --parallel 4 -t build' + (names.length ? ' -p ' + names.join(',') : ''),
  'npm run wipe-bemoje-modules',
])

if (fs.existsSync(bemoje_modules_real)) {
  if (fs.existsSync(bemoje_modules_fake)) {
    fs.rmdirSync(bemoje_modules_fake, { recursive: true })
  }
  fs.renameSync(bemoje_modules_real, bemoje_modules_fake)
  console.log('disabled @bemoje in node_modules')
}
