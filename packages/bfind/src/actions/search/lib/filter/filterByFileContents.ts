import { asyncTasksLimit, readFileSafe, regexEscapeString } from '@bemoje/util'
import { ISearchOptions } from '../ISearchOptions'

export async function filterByFileContents(filepaths: string[], options: ISearchOptions): Promise<string[]> {
  const regterms = options.fileSearchTerms?.map((fterm) => {
    return new RegExp(regexEscapeString(fterm), 'i')
  })
  if (!regterms) return filepaths

  const results: string[] = []
  const tasks = filepaths.map((fpath) => async () => {
    const src = await readFileSafe(fpath)
    if (!src) return
    for (const regterm of regterms) {
      if (!regterm.test(src)) return
    }
    if (options.pipe) console.log(fpath)
    else results.push(fpath)
  })

  await asyncTasksLimit(10, tasks)
  return results
}
