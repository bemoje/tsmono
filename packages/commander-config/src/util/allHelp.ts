import { colors, execute, getAppDataPath } from '@bemoje/util'
import type { Command } from 'commander'
import fs from 'fs'
import path from 'path'

export function allHelp(program: Command) {
  const APPDATADIR = getAppDataPath('bemoje', program.name())
  fs.mkdirSync(APPDATADIR, { recursive: true })
  const helpfilepath = path.join(APPDATADIR, 'help.txt')
  const version = execute(program.name() + ` --version`, { noEcho: true, silent: true }).trim()
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
    log('\n\n' + colors.bold(colors.magenta(program.name() + ' ' + cmd.name())))
    log(colors.gray(colors.dim('---------------------------------------------')))
    let help = execute(`rman help ${cmd.name()}`, { noEcho: true, silent: true })
    help = help
      .replace(/^Usage:/gm, colors.cyan('Usage:'))
      .replace(/^Description:/gm, colors.cyan('Description:'))
      .replace(/^Example Usage:/gm, colors.cyan('Example Usage:'))
      .replace(/^Options:/gm, colors.cyan('Options:'))
      .replace(/^Aliases:/gm, colors.cyan('Aliases:'))
      .replace(/^Arguments:/gm, colors.cyan('Arguments:'))
      .replace(/^- /gm, colors.gray('- '))
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
      .replace(/^Arguments:/gm, colors.cyan('Arguments:'))
      .replace(/^- /gm, colors.gray('- '))
      .replace(/\r*\n\r*\n/g, '\n')
  )
  log('')
  fs.mkdirSync(APPDATADIR, { recursive: true })
  fs.writeFileSync(helpfilepath, helps.join('\n'), 'utf8')
}
