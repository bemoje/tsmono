import { CommandBuilder } from '@bemoje/cli'
import { getRepo } from './getRepo'
import { openRepoInIde } from './openRepoInIde'
import { promptUser } from './promptUser'
import { readDirectoryStats } from '@bemoje/util'

export async function action(search: string, _: unknown, cmd: CommandBuilder) {
  const config = cmd.root.db.config
  const rootdir = config.get<string>('rootdir')
  if (!rootdir) throw new Error('No rootdir configured')
  const IDE = config.get<string>('IDE')

  const dirnames = (await readDirectoryStats(rootdir))
    .filter((stat) => stat.isDirectory())
    .sort((a, b) => a.birthtimeMs - b.birthtimeMs)
    .map((stat) => stat.name)

  if (search) {
    const dirname = getRepo(dirnames, search)
    if (dirname) return openRepoInIde(rootdir, IDE, dirname)
  }
  const dirname = await promptUser(dirnames)
  return openRepoInIde(rootdir, IDE, dirname)
}
