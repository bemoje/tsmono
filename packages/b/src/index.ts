import { TrieMap } from '@bemoje/trie-map'
import { Command } from 'commander'

const trie = new TrieMap<BCommand>()

class BCommand extends Command {
  constructor(command: string[]) {
    super()
    const name = command[command.length - 1]
    if (!name) throw new Error('name is undefined')
    trie.get(command.slice(0, command.length - 1))?.addCommand(this)
    this.name(name)
    trie.set(command, this)
  }
  getSiblings() {
    return this.parent?.commands.filter((cmd) => cmd !== this) || []
  }
  siblingNameHasCharAt(char: string, index: number) {
    for (const sibling of this.getSiblings()) {
      if (sibling.name().charAt(index) === char) return true
    }
    return false
  }
  setAlias() {
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
}

const b = new BCommand(['b'])
  .description("bemoje's cli tools")
  .addCommand(
    new BCommand(['b', 'repo'])
      .addCommand(
        new BCommand(['b', 'repo', 'create'])
          .option('-u, --user [username]', 'github username', '')
          .option('-a, --auth [token]', 'github access token', 'MY_TOKEN')
          .argument('[repo]', 'repository name')
          .action((repo, options, self) => {
            const { user, auth } = options
            if (!repo || !user || !auth) return self.help()
            console.log('created ' + user + 's github repo: ' + repo)
            console.log('created local repo: ' + repo)
          })
      )
      .addCommand(
        new BCommand(['b', 'repo', 'delete'])
          .option('-u, --user [username]', 'github username', '')
          .option('-a, --auth [token]', 'github access token', 'MY_TOKEN')
          .argument('[repo]', 'repository name')
          .action((repo, options, self) => {
            const { user, auth } = options
            if (!repo || !user || !auth) return self.help()
            console.log('deleted ' + user + 's github repo: ' + repo)
            console.log('deleted local repo: ' + repo)
          })
      )
  )
  .addCommand(
    new BCommand(['b', 'git'])
      .addCommand(
        new BCommand(['b', 'git', 'commit'])
          .option('-a, --add <path>', 'files to add to staged', '.')
          .argument('[message...]', 'commit message', ['update'])
          .action((message, options = {}, self) => {
            if (!message.length) return self.help()
            console.log('git add ' + options.add)
            console.log('git commit -m "' + message.join(' ') + '"')
          })
      )
      .addCommand(
        new BCommand(['b', 'git', 'push'])
          .option('-a, --add <path>', 'files to add to staged', '.')
          .option('-o, --origin <branch>', 'the origin branch to push to')
          .argument('[message...]', 'commit message', ['update'])
          .action((message, options = {}, self) => {
            if (!message.length) return self.help()
            const origin = options.origin ? '-u origin ' + options.origin : ''
            console.log('git add ' + options.add)
            console.log('git commit -m "' + message.join(' ') + '"')
            console.log('git push -u origin ' + origin)
          })
      )
      .addCommand(
        new BCommand(['b', 'git', 'branch'])
          .addCommand(
            new BCommand(['b', 'git', 'branch', 'list']).action(() => {
              console.log('git branch')
            })
          )
          .addCommand(
            new BCommand(['b', 'git', 'branch', 'checkout'])
              .argument('[branch]', 'branch name')
              .action((branch, options, self) => {
                if (!branch) return self.help()
                console.log('git branch ' + branch)
              })
          )
          .addCommand(
            new BCommand(['b', 'git', 'branch', 'delete'])
              .argument('[branches...]', 'branches to delete')
              .action((branches, options, self) => {
                if (!branches.length) return self.help()
                for (const branch of branches) {
                  console.log('git branch -D ' + branch)
                }
              })
          )
      )
  )
  .addCommand(
    new BCommand(['b', 'gpt'])
      //
      .argument('[args...]', 'commit args')
      .action((args, options, self) => {
        if (!args.length) return self.help()
        console.log('gpt')
      })
  )

//

console.log(b.commands.length)

trie.forEach([], (cmd: BCommand, prefix) => {
  cmd.setAlias()
})

trie.forEach([], (cmd, prefix) => {
  console.log({ name: cmd.name(), prefix: prefix.join(' '), aliases: cmd.aliases() })
})

b.parse()
