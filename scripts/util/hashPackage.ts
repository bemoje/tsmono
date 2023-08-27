import fs from 'fs'
import path from 'path'
import stripComments from 'strip-comments'
import UglifyJS from 'uglify-js'
import walkdir from 'walkdir'
import { strHashToString } from '../../packages/string/src'
import { tsStripDeclSourceMapComments } from '../../packages/tscode/src/lib/tsStripDeclSourceMapComments'

/**
 * Hashes a package's dist-dir with the given name.
 * The source files are normalized so as to determine when to publish a new version to npm, so some things are ignored.
 */
export function hashPackage(name: string): string {
  const normalized = walkdir
    .sync(path.join(process.cwd(), 'dist', 'packages', name))
    .filter((p) => !p.endsWith('.map') && fs.statSync(p).isFile())
    .sort()
    .map((fpath) => {
      let res = ''

      try {
        res = fs.readFileSync(fpath, 'utf8')
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
          res = JSON.stringify(parsed)
        } catch (error) {
          console.error('could not parse json file: ' + fpath + '\n' + error.message)
        }
      } else {
        res = stripComments(res, {})
      }

      if (fpath.endsWith('.d.ts')) {
        res = tsStripDeclSourceMapComments(res)
      } else if (fpath.endsWith('.js')) {
        try {
          res = UglifyJS.minify(res).code
        } catch (error) {
          console.error('could not minify file: ' + fpath + '\n' + error.message)
        }
      } else {
      }

      res = res.replace(/['"][0-9]+\.[0-9]+\.[0-9]+['"]/g, '"v"')
      res = res.replace(/[\r\n\t\s]/g, '')

      return res
    })
    .join('\n')

  return strHashToString(normalized, 'sha256', 'base64url')
}
