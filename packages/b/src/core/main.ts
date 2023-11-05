import { execInherit, prompt } from '@bemoje/util'
import { BCommand } from './BCommand'
import { trie } from './trie'

export async function main() {
  const program = new BCommand('b')
  program
    .summary("bemoje's cli tools")
    .argument('[search...]', 'command search string')
    .action(async (search: string[], options, self) => {
      if (search.length === 0) return self.help()
      // console.log({ search })

      // multiple kws, try match nearest child
      if (search.length > 1) {
        const kw = search[0]
        for (const cmd of self.commands) {
          if ((cmd.aliases()[0] || cmd.name()) === kw) {
            console.log(program.cmdpath + ' ' + search.slice(1).join(' '))
            cmd.parse(search.slice(2), { from: 'user' })
            return
          }
        }
      }

      // single kw or no matches above, match whole path
      const matches = new Map<string, Set<string>>()
      trie.forEach(['b'], (child, prefix) => {
        for (const kw of search) {
          const cmdpath = child.cmdpath
          if (cmdpath.includes(kw)) {
            let m = matches.get(child.cmdpath)
            if (!m) {
              m = new Set([kw])
              matches.set(child.cmdpath, m)
            } else {
              m.add(kw)
            }
          }
        }
      })
      // console.log({ matches })
      const ranked = [...matches.entries()].sort((a, b) => b[1].size - a[1].size)
      const winner = ranked[0]
      if (winner) {
        console.log({ search, match: winner[0] })
        const target = trie.get(winner[0].split(' '))
        if (target) {
          const args = search.slice(1)
          target.parse(args, { from: 'user' })
        }
        return
      }

      // no matches
      console.log('no matches')
    })

  //
  new BCommand('b repo') //
    .summary('github repository management')

  new BCommand('b repo create')
    // .option('-u, --user [username]', 'github username', '')
    // .option('-a, --auth [token]', 'github access token', 'MY_TOKEN')
    .argument('[repo]', 'repository name')
    .action(async (repo, options, self) => {
      if (!repo) repo = await prompt('repo: ')
      await execInherit(`bCreateRepo ${repo}`)
      // const { user, auth } = options
      // if (!repo || !user || !auth) return self.help()
      // console.log('created ' + user + 's github repo: ' + repo)
      // console.log('created local repo: ' + repo)
    })

  new BCommand('b repo delete')
    .option('-u, --user [username]', 'github username', '')
    .option('-a, --auth [token]', 'github access token', 'MY_TOKEN')
    .argument('[repo]', 'repository name')
    .action(async (repo, options, self) => {
      if (!repo) repo = await prompt('repo: ')
      await execInherit(`bDeleteRepo ${repo}`)
      // const { user, auth } = options
      // if (!repo || !user || !auth) return self.help()
      // console.log('deleted ' + user + 's github repo: ' + repo)
      // console.log('deleted local repo: ' + repo)
    })

  const bgit = new BCommand('b git') //
    .description('git commands for you')
    .arg('cmd')
    .argOptional()
    .setVariadic(true)
    .getParentCommand()
    .action(async (options, self) => {
      console.log({ options, self })
    })

  new BCommand('b git commit')
    .option('-a, --add <path>', 'files to add to staged', '.')
    .argument('[message...]', 'commit message')
    .action(async (message: string[], options, self) => {
      let msg = ''
      if (!message.length) {
        msg = await prompt('commit message: ', (input) => input.trim() || 'update')
      } else {
        msg = message.join(' ').trim()
      }
      await execInherit(`git add ${options.add}`)
      await execInherit(`git commit -m "${msg}"`)
    })

  new BCommand('b git push')
    .option('-a, --add <path>', 'files to add to staged', '.')
    .option('-o, --origin <branch>', 'the origin branch to push to')
    .argument('[message...]', 'commit message')
    .action(async (message: string[], options = {}, self) => {
      let msg = ''
      if (!message.length) {
        msg = await prompt('commit message: ', (input) => input.trim() || 'update')
      } else {
        msg = message.join(' ').trim()
      }

      let origin = ''
      if (!options.origin) {
        origin = await prompt('origin: ')
      }
      origin = origin ? ' -u origin ' + origin : ''

      await execInherit(`git add ${options.add}`)
      await execInherit(`git commit -m "${msg}"`)
      await execInherit(`git push${origin}`)
    })

  new BCommand('b git checkout') //
    .argument('[branch]', 'branch name')
    .action(async (branch, options, self) => {
      if (!branch) branch = await prompt('branch: ')
      await execInherit(`bCheckout ${branch}`)
    })

  new BCommand('b git branch') //
    .summary('git branch commands')

  new BCommand('b git branch list') //
    .summary('list branches')
    .option('-r, --remotes', 'list only remote branches')
    .option('-l, --local', 'list only local branches')
    .argument('[...args]')
    .action(async (args, options = {}, self) => {
      if (options.remotes) {
        await execInherit(`git branch -r`)
      } else if (options.local) {
        await execInherit(`git branch`)
      } else {
        await execInherit(`git branch --all`)
      }
    })

  new BCommand('b git branch delete')
    .argument('[branches...]', 'branches to delete')
    .action(async (branches: string[], options, self: BCommand) => {
      if (!branches.length) {
        // branches = (await prompt('branches: ')).split(' ')
        console.log({ wizard: self.wizard() })
      }
      for (const branch of branches) {
        await execInherit(`git branch -D ${branch}`)
      }
    })

  //
  //

  BCommand.updateAliases()

  //

  // trie.forEach(['b'], (cmd, prefix) => {
  //   console.log({ cmdpath: cmd.cmdpath, prefix: prefix, aliases: cmd.aliases() })
  // })

  //

  program.parse()
}

// const program = new BCommand('blah')
// program.showHelpAfterError(true)
// program.showSuggestionAfterError(true)
// program.configureHelp({
//   helpWidth: 140,
//   sortSubcommands: true,
//   sortOptions: true,
//   showGlobalOptions: true,
// })
// program.helpInformation()
// program.parse()
