import { execSync } from 'child_process'
import fs from 'fs'
import mdit from 'markdown-it'
import path from 'path'

function isVsCodeInstalled() {
  try {
    const stdout = execSync('code --help').toString()
    return stdout.startsWith('Visual Studio Code') && stdout.includes('-w --wait')
  } catch (e) {
    return false
  }
}

console.log(isVsCodeInstalled())

const safari = 'open -a "Safari" /path/to/file.html'

path
fs

const md = fs.readFileSync(
  'C:/Users/bemoj/AppData/Roaming/bemoje/terminal-gpt/appdata/ts/text/2023.08.24_21.07.56.293.md',
  'utf8',
)

const MD = mdit()
let html = MD.render(md, {
  html: true,
  linkify: true,
  typographer: true,
})

html = `

<!doctype html>
<html lang="en">
<body>
${html}
</body>
</html>
`

const outfilepath = __filename + '.html'
fs.writeFileSync(outfilepath, html, 'utf8')
console.log(outfilepath)
