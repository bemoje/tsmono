import { asyncTasksLimit, readFileSafe, regexEscapeString } from '@bemoje/util'
import { ISearchOptions } from '../ISearchOptions'

export async function filterByFileContents(results: string[], options: ISearchOptions): Promise<void> {
  const regterms = options.fterms.map((fterm) => {
    return new RegExp(regexEscapeString(fterm), 'i')
  })

  const tasks = results.map((fpath) => async () => {
    const src = await readFileSafe(fpath)
    if (!src) return
    for (const regterm of regterms) {
      if (!regterm.test(src)) return
    }
    console.log(fpath)
  })

  await asyncTasksLimit(10, tasks)
}
