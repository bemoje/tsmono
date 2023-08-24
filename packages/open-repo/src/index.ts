import { Config } from '@bemoje/commander-config'
import { exec } from 'child_process'
import { Command } from 'commander'
import fs from 'fs'
import path from 'path'
import readline from 'readline'

const config = new Config('bemoje', 'open-repo', {
  rootdir: {
    description: 'Semicolon-separated list of absolute paths to directories that contain repositories.',
    default: '',
    parse: (string: string): string => {
      return string
        .split(';')
        .map((p: string) => {
          p = p.trim()
          if (!path.isAbsolute(p)) {
            console.log(`The path ${p} is not an absolute path.`)
            process.exit(0)
          }
          if (!fs.existsSync(p)) {
            console.log(`The path ${p} does not exist.`)
            process.exit(0)
          }
          return p
        })
        .join(';')
    },
  },
  IDE: {
    description:
      'The command to open your IDE. It is assumed that your IDE will open the directory passed to it as an argument.',
    default: 'code',
    parse: (string) => string.trim(),
  },
})

export const program = new Command()
  .name('Open Repository')
  .description('Shortcut to opening a local repository in VS Code.')
  .version('0.0.0')
  .argument('[search]', 'A full or partial directory name of the repository to find and open.')
  .action((search = '') => {
    const dirnames = fs.readdirSync(config.appdata.user.get('rootdir')).filter((dirname) => {
      return fs.statSync(path.join(config.appdata.user.get('rootdir'), dirname)).isDirectory()
    })
    if (!search) {
      console.log(dirnames.reduce((acc, dirname, i) => acc + '\n' + i + '.' + dirname, ''))
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      })
      rl.question('#: ', (string: string) => {
        const int = Number(string)
        if (!string || !Number.isInteger(int) || int < 0 || int >= dirnames.length - 1) {
          console.log(`Please enter the number (0-${dirnames.length - 1}) of the repo to open.`)
          process.exit()
        }
        const dirname = dirnames[Number(string)]
        exec('code ' + path.join(config.appdata.user.get('rootdir'), dirname))
        rl.close()
      })
      return
    }

    if (/^\d+$/g.test(search)) search = dirnames[Number(search)]
    let found = false
    dirnames.forEach((dirname) => {
      if (found) return
      const fullpath = path.join(config.appdata.user.get('rootdir'), dirname)
      if (!dirname.toLowerCase().includes(search.toLowerCase())) {
        return false
      }
      console.log('Opening repository: ', dirname)

      exec(`${config.appdata.user.get('IDE')} ${fullpath}`)
      found = true
      return true
    })
    if (!found) {
      console.log(`No repositories found matching '${search}'.`)
    }
  })

config.initialize(program)

program.parse()
