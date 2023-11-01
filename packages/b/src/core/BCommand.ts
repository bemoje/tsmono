import { execSync } from 'child_process'
import { Command } from 'commander'
import { trie } from './trie'

const debug = false

export class BCommand extends Command {
  static updateAliases() {
    trie.forEach(['b'], (cmd) => {
      cmd.setAliases()
    })
  }
  public cmdpath: string

  constructor(cmdpath: string) {
    const split = cmdpath.split(' ')
    const name = split[split.length - 1]
    if (!name) throw new Error('name is undefined')
    super(name)
    this.cmdpath = cmdpath

    // trie
    trie.set(split, this)
    trie.get(split.slice(0, split.length - 1))?.addCommand(this)
    this.addShortcutToTrie()
  }

  private addShortcutToTrie() {
    const shortcut = this.cmdpath
      .split(' ')
      .map((n) => n.charAt(0))
      .slice(1)
      .join('')
    trie.set(['shortcuts', shortcut], this)
  }

  private get siblings() {
    return this.parent?.commands.filter((cmd) => cmd !== this) || []
  }

  private siblingNameHasCharAt(char: string, index: number) {
    for (const sibling of this.siblings) {
      if (sibling.name().charAt(index) === char) return true
    }
    return false
  }

  private setAliases() {
    let isClear = false
    const name = this.name()
    const aliases = []
    for (let i = 0; i < name.length; i++) {
      if (!isClear) {
        if (this.siblingNameHasCharAt(name.charAt(i), i)) {
          continue
        } else {
          isClear = true
        }
      }
      const alias = name.substring(0, i + 1)
      if (alias === name) break
      aliases.push(alias)
    }
    this.aliases(aliases)
  }

  async exec(command: string) {
    if (debug) {
      console.log({ cmdpath: this.cmdpath, exec: command })
    } else {
      try {
        execSync(command, { stdio: 'inherit' })
      } catch (error) {
        console.log((error as Error).message)
      }
    }
  }
}
