import { deleteDirectorySafeSync } from '@bemoje/node-util'
import fs from 'fs'
import path from 'path'
import { getPackages } from './util/getPackages'

getPackages().forEach(({ name, rootdir }) => {
  const dir = path.join(rootdir, 'node_modules', '@bemoje')
  if (fs.existsSync(dir)) {
    deleteDirectorySafeSync(dir)
    console.log(`Deleted ${name}/node_modules/@bemoje`)
  }
})
