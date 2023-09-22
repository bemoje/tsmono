import fs from 'fs'
import path from 'path'
import { config } from '../core/config'
import { findRepo } from './findRepo'
import { promptUserForIndex } from './promptUserForIndex'

export async function openRepo(search?: string) {
  const rootdir = config.userconfig.get('rootdir')
  const IDE = config.userconfig.get('IDE')

  const dirnames = (await fs.promises.readdir(rootdir)).filter((dirname) => {
    return fs.statSync(path.join(rootdir, dirname)).isDirectory()
  })

  if (search) {
    findRepo(rootdir, IDE, dirnames, search)
  } else {
    await promptUserForIndex(rootdir, IDE, dirnames)
  }
}
