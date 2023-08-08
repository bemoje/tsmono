import { exec } from 'child_process'
import { Command } from 'commander'
import fs from 'fs'
import path from 'path'
// import { Config } from 'C:/Users/bemoj/Desktop/temp-repos/quick-typescript/commander-config'
import { Config } from '@bemoje/commander-config'

const config = new Config('bemoje', 'orepo', {
  rootdir: {
    description: 'Semicolon-separated list of absolute paths to directories that contain repositories.',
    default: '',
    required: true,
    parse: (string: string): string => {
      return string
        .split(';')
        .map((p: string) => {
          p = p.trim()
          if (!path.isAbsolute(p)) {
            throw new Error(`The path ${p} is not an absolute path.`)
          }
          if (!fs.existsSync(p)) {
            throw new Error(`The path ${p} does not exist.`)
          }
          return p
        })
        .join(';')
    },
  },
})

export const program = new Command()
  .name('Open Repository')
  .description('Shortcut to opening a local repository in VS Code.')
  .version('0.0.1')
  .argument('[search]', 'A full or partial directory name of the repository to find and open.')
  .action((search = '') => {
    config.assertNoMissingRequired()
    const dirnames = fs.readdirSync(config.settings['rootdir']).filter((dirname) => {
      return fs.statSync(path.join(config.settings['rootdir'], dirname)).isDirectory()
    })
    if (!search) {
      console.log(dirnames.reduce((acc, dirname, i) => acc + '\n' + i + '.' + dirname, ''))
      return
    }
    if (/^\d+$/g.test(search)) search = dirnames[Number(search)]
    const result = dirnames.filter((dirname) => {
      const fullpath = path.join(config.settings['rootdir'], dirname)
      if (!dirname.toLowerCase().includes(search.toLowerCase())) {
        return false
      }
      console.log('Opening repository: ', dirname)
      exec('code ' + fullpath)
      return true
    })
    if (!result.length) {
      console.log(`No repositories found matching '${search}'.`)
    }
  })

config.initialize(program)

program.parse()
