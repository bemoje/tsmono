import { readDirectoryStatsSafe } from '@bemoje/util'
import { config } from '../core/config'
import { getRepo } from './getRepo'
import { openRepoInIde } from './openRepoInIde'
import { promptUser } from './promptUser'

export async function openRepo(search?: string) {
  const rootdir = config.userconfig.get('rootdir')
  const IDE = config.userconfig.get('IDE')

  const dirnames = (await readDirectoryStatsSafe(rootdir))
    .filter((stat) => stat.isDirectory())
    .sort((a, b) => a.birthtimeMs - b.birthtimeMs)
    .map((stat) => stat.name)

  if (search) {
    const dirname = getRepo(dirnames, search)
    if (dirname) return openRepoInIde(rootdir, IDE, dirname)
  }
  const dirname = await promptUser(dirnames)
  console.log({ dirname })
  return openRepoInIde(rootdir, IDE, dirname)
}
