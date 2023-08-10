import { DirectoryPath } from '../../src/lib/DirectoryPath'
import { FilePath } from '../../src/lib/FilePath'

const dir = new DirectoryPath(process.cwd())
console.log(dir)
console.log({
  relative: dir.relative,
  root: dir.root,
  base: dir.base,
  parent: dir.parent,
  exists: dir.exists,
  statSync: dir.statSync(),
  toArray: dir.toArray(),
  relativeToArray: dir.relativeToArray(),
  toString: dir.toString(),
  valueOf: dir.valueOf(),
  readdirSync: dir.readdirSync(),
})

const file = new FilePath(__filename)

console.log(file)
console.log({
  relative: file.relative,
  root: file.root,
  base: file.base,
  name: file.name,
  extension: file.name,
  parent: file.parent,
  exists: file.exists,
  statSync: file.statSync(),
  toArray: file.toArray(),
  relativeToArray: dir.relativeToArray(),
  toString: file.toString(),
  valueOf: file.valueOf(),
})

console.log(file.parent.parent.parent)

console.log(file.substring(0, 5))

// example
;(async () => {
  return await dir.readdir()
})()
  .then(console.log)
  .catch(console.error)
