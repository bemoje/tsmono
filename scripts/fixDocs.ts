import { strReplaceAll } from '@bemoje/string'
import fs from 'fs'
import path from 'path'
import walkdir from 'walkdir'
import { getPackages } from './util/getPackages'

const packages = getPackages()
packages.forEach(({ name, rootdir }) => {
  const mdpath = path.join(rootdir, 'docs', 'md')
  fs.mkdirSync(mdpath, { recursive: true })
  const s = '](/docs/md/'
  const base = `](https://github.com/bemoje/tsmono/blob/main/pkg/${name}/docs/md/`
  const files = walkdir.sync(mdpath).filter((p) => p.endsWith('.md'))
  for (const fpath of files) {
    let content = fs.readFileSync(fpath, 'utf8')
    content = strReplaceAll(content, s, base)
    fs.writeFileSync(fpath, content)
  }
})
