import { getRepo } from './getRepo'
import { prompt } from '@bemoje/cli-prompt'

export async function promptUser(dirnames: string[]): Promise<string> {
  const result = await prompt
    .search('Enter search string or index: ', (p) => {
      p.choices(
        dirnames.map((dirname, i) => {
          return String(i) + '. ' + dirname
        })
      )
    })
    .run()
  if (result.selected === '<-') process.exit(0)
  return getRepo(dirnames, result.selected.split('. ')[1])
}
