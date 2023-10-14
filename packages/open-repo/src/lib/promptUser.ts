import { prompt } from '@bemoje/util'
import { getRepo } from './getRepo'
import { printRepoList } from './printRepoList'

export async function promptUser(dirnames: string[]): Promise<string> {
  printRepoList(dirnames)
  return await prompt('Enter search string or index: ', (input: string) => {
    return getRepo(dirnames, input)
  })
}
