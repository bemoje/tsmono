import fs from 'fs'
import path from 'path'
import { getPackages } from './getPackages'
import { hashPackage } from './hashPackage'

export function rehash(packages?: string[]) {
  const hashesPath = path.join(process.cwd(), 'scripts', 'data', 'hashes.json')
  const hashes = JSON.parse(fs.readFileSync(hashesPath, 'utf8'))
  getPackages(packages).forEach(({ name }) => {
    hashes[name] = hashPackage(name)
  })
  fs.writeFileSync(hashesPath, JSON.stringify(hashes, null, 1), 'utf8')
}
