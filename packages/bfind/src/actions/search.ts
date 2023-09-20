import { normalizeFileExtension } from '@bemoje/util'
import path from 'path'
import { ISearchOptions } from './search/ISearchOptions'
import { loadIndexPaths } from './search/loadIndexPaths'
import { loadIndexTrie } from './search/loadIndexTrie'
import { lookupFilepaths } from './search/lookupFilepaths'
import { lookupIndices } from './search/lookupIndices'
import { normalizeSearchKeys } from './search/normalizeSearchKeys'
import { printResults } from './search/printResults/printResults'

export async function search(keys: string[], options: ISearchOptions = {}): Promise<void> {
  if (!options.pipe && Object.keys(options).length) console.log(options)

  const keyset = new Set(keys)
  const normalized = normalizeSearchKeys(keys)

  const [FILEPATHS, TRIE] = await Promise.all([loadIndexPaths(), loadIndexTrie(normalized)])

  const indices = lookupIndices(normalized, TRIE)
  let results = lookupFilepaths(keyset, indices, FILEPATHS)

  if (options.extensions) {
    const exts = options.extensions.split(' ').map(normalizeFileExtension)
    results = results.filter((fpath) => {
      return exts.includes(path.extname(fpath))
    })
  }

  if (options.dir || options.cwd) {
    const dir = path.resolve(options.dir || process.cwd())
    results = results.filter((fpath) => {
      return path.normalize(fpath).startsWith(dir)
    })
  }

  if (options.pipe) {
    for (const p of results) console.log(p)
    return
  }

  await printResults(results, keyset)
}
