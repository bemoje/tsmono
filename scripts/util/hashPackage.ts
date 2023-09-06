import fs from 'fs'
import path from 'path'
import stripComments from 'strip-comments'
import walkdir from 'walkdir'
import { strHashToString } from '../../packages/util/src'

/**
 * Hashes a package's dist-dir with the given name.
 * The source files are normalized so as to determine when to publish a new version to npm, so some things are ignored.
 */
export function hashPackage(name: string): string {
  const dirpath = path.join(process.cwd(), 'dist', 'packages', name)
  if (!fs.existsSync(dirpath)) throw new Error(`package ${name} does not exist in dist/packages`)
  const filepaths = walkdir
    .sync(dirpath)
    .filter((p) => !p.endsWith('.map') && fs.statSync(p).isFile())
    .sort()
  if (!filepaths) throw new Error(`package ${name} does not exist in dist/packages`)
  const normalized = filepaths
    .map((fpath) => {
      let res = ''

      try {
        res = fs.readFileSync(fpath, 'utf8') || ''
      } catch (error) {
        return 0
      }

      if (fpath.endsWith('.json')) {
        try {
          const parsed = JSON.parse(res)
          if (fpath.endsWith('package.json')) {
            delete parsed.scripts
            delete parsed.devDependencies
            delete parsed.version
          }
          res = JSON.stringify(parsed) || ''
        } catch (error) {
          console.error('could not parse json file: ' + fpath + '\n' + error.message)
        }
      } else {
        res = stripComments(res, {}) || ''
      }

      res = res.replace(/['"][0-9]+\.[0-9]+\.[0-9]+['"]/g, '') || ''
      res = res.replace(/[\r\n\t\s,]/g, '') || ''

      return res
    })
    .join('\n')
  return strHashToString(normalized, 'sha256', 'base64url')
}
