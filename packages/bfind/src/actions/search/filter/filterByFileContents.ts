import { arrEvery, regexEscapeString } from '@bemoje/util'
import { readFile } from 'fs/promises'
import { ISearchOptions } from '../ISearchOptions'

export async function filterByFileContents(results: string[], options: ISearchOptions): Promise<void> {
  const regterms = options.fterms.map((fterm) => {
    return new RegExp(regexEscapeString(fterm), 'i')
  })
  for (const fpath of results) {
    try {
      const src = await readFile(fpath, 'utf8')
      if (arrEvery(regterms, (regterm) => regterm.test(src))) {
        console.log(fpath)
      }
    } catch (error) {
      continue
    }
  }
}
