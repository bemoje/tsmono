import fs from 'fs'
import path from 'path'
import { deleteDirectorySafeSync } from '../packages/fs/src/lib/deleteDirectorySafeSync'
import { getPackages } from './util/getPackages'

const args = process.argv.slice(2)

getPackages().forEach(({ name, rootdir }) => {
  const dir = path.join(rootdir, 'node_modules', '@bemoje')
  const plock = path.join(rootdir, 'package-lock.json')
  if (fs.existsSync(dir)) {
    deleteDirectorySafeSync(dir)
    console.log(`Deleted ${name}/node_modules/@bemoje`)
  }
  if (fs.existsSync(plock)) {
    fs.rmSync(plock, { force: true })
    console.log(`Deleted ${name}/package-lock.json`)
  }
})
if (args.includes('all')) {
  const dir = path.join(process.cwd(), 'node_modules', '@bemoje')
  const plock = path.join(process.cwd(), 'package-lock.json')
  if (fs.existsSync(dir)) {
    deleteDirectorySafeSync(dir)
    console.log(`Deleted ${'tsmono'}/node_modules/@bemoje`)
  }
  if (fs.existsSync(plock)) {
    fs.rmSync(plock, { force: true })
    console.log(`Deleted ${'tsmono'}/package-lock.json`)
  }
}
