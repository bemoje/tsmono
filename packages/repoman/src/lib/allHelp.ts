import { colors, execute, getAppDataPath } from '@bemoje/util'
import type { Command } from 'commander'
import fs from 'fs'
import path from 'path'

export function allHelp(program: Command) {
  const APPDATADIR = getAppDataPath('bemoje', 'repoman')
  const helpfilepath = path.join(APPDATADIR, 'help.txt')
  const version = execute(`rman --version`, { noEcho: true, silent: true }).trim()
  if (fs.existsSync(helpfilepath)) {
    const lines = fs.readFileSync(helpfilepath, 'utf8').split('\n')
    const helpVersion = lines.shift() as unknown as string
    console.log({ version, helpVersion })
    if (version === helpVersion) {
      console.log(lines.join('\n'))
      return
    }
    fs.rmSync(helpfilepath)
  }
  const helps: string[] = [version]
  const log = (s: string) => {
    console.log(s)
    helps.push(s)
  }
  program.commands.forEach((cmd) => {
    const aliases = cmd.aliases()
    if (!aliases) return
    const alias = aliases[0]
    if (!alias) return
    log('\n\n' + colors.bold(colors.magenta('rman ' + alias)))
    log(colors.gray(colors.dim('---------------------------------------------')))
    let help = execute(`rman help ${alias}`, { noEcho: true, silent: true })
    help = help
      .replace(/^Usage:/gm, colors.cyan('Usage:'))
      .replace(/^Description:/gm, colors.cyan('Description:'))
      .replace(/^Example Usage:/gm, colors.cyan('Example Usage:'))
      .replace(/^Options:/gm, colors.cyan('Options:'))
      .replace(/\r*\n\r*\n/g, '\n')
    log(help)
  })

  log('\n\n' + colors.green(colors.bold('rman')))
  log(colors.gray(colors.dim('---------------------------------------------')))
  const help = execute(`rman help`, { noEcho: true, silent: true })
  log(
    help
      .replace(/^Usage:/gm, colors.cyan('Usage:'))
      .replace(/^Description:/gm, colors.cyan('Description:'))
      .replace(/^Commands:/gm, colors.cyan('Commands:'))
      .replace(/^Options:/gm, colors.cyan('Options:'))
      .replace(/\r*\n\r*\n/g, '\n')
  )
  console.log()
  fs.writeFileSync(helpfilepath, helps.join('\n'), 'utf8')
}
