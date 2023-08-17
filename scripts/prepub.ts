import { execBatch } from '../pkg/node/src/lib/execBatch'
const names = process.argv.slice(2)

execBatch([
  'npm run fix-readmes',
  'npm run fix-dependencies',
  'npm run fix-entrypoints',
  'npm run lint' + (names.length ? ' -p ' + names.join(',') : ''),
  'npm run test' + (names.length ? ' -p ' + names.join(',') : ''),
  'npm run build' + (names.length ? ' -p ' + names.join(',') : ''),
  'npm run docs',
])
