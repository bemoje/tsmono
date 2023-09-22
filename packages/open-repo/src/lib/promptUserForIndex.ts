import { exec } from 'child_process'
import path from 'path'
import prompt from 'prompt'
import { printRepoList } from './printRepoList'

export async function promptUserForIndex(rootdir: string, IDE: string, dirnames: string[]): Promise<void> {
  printRepoList(dirnames)
  prompt.start()
  const { index } = await prompt.get([
    {
      name: 'index',
      required: true,
      type: 'integer',
      conform: (n) => n >= 0 && n < dirnames.length - 1,
      message: 'Must be an integer larger than or equal to 0 and less than or equal to ' + (dirnames.length - 1),
    },
  ])
  const dirname = dirnames[index]
  exec(`${IDE} ${path.join(rootdir, dirname)}`)
}
