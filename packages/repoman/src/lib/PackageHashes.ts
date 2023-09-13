import { getAppDataPath } from '@bemoje/util'
import fs from 'fs'
import path from 'path'
import { hashPackage } from './hashPackage'

export class PackageHashes {
  readonly hashesPath: string
  readonly hashes: Record<string, string>

  constructor() {
    const appdata = getAppDataPath('bemoje', 'repoman')
    fs.mkdirSync(appdata, { recursive: true })
    this.hashesPath = path.join(appdata, 'hashes.json')
    if (!fs.existsSync(this.hashesPath)) {
      fs.writeFileSync(this.hashesPath, '{}', 'utf8')
    }
    this.hashes = JSON.parse(fs.readFileSync(this.hashesPath, 'utf8'))
  }

  hash(name: string) {
    return hashPackage(name)
  }

  currentHash(name: string) {
    return this.hashes[name]
  }

  updateHash(name: string, hash?: string) {
    this.hashes[name] = hash ?? this.hash(name)
    fs.writeFileSync(this.hashesPath, JSON.stringify(this.hashes, null, 2), 'utf8')
  }
}
