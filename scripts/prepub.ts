import { execBatch } from '../packages/node/src/lib/execBatch'
const names = process.argv.slice(2)

execBatch([
  'npm run fix-readmes',
  'npm run fix-dependencies',
  'npm run fix-entrypoints',
  'nx run-many -t "lint,test,build"' + (names.length ? ' -p ' + names.join(',') : ''),
  'npm run docs',
])
