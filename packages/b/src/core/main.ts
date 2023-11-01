import { prompt } from '@bemoje/util'
import { BCommand } from './BCommand'
import { trie } from './trie'

export async function main() {
  const program = new BCommand('b')
    .summary("bemoje's cli tools")
    .argument('[search...]', 'command search string')
    .action((search, options, self) => {
      if (search.length === 0) return self.help()
      // console.log({ search })

      // shortcut
      const shortcutResult = trie.get(['shortcuts', search[0]])
      if (shortcutResult) {
        console.log(shortcutResult.cmdpath + ' ' + search.slice(1).join(' '))
        shortcutResult.parse([undefined, undefined, ...search.slice(1)], options)
        return
      }

      // multiple kws, try match nearest child
      if (search.length > 1) {
        const kw = search[0]
        for (const cmd of self.commands) {
          if ((cmd.aliases()[0] || cmd.name()) === kw) {
            console.log(cmd.cmdpath + ' ' + search.slice(1).join(' '))
            cmd.parse([undefined, undefined, ...search.slice(2)], options)
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
      // console.log({ winner })
      if (winner) {
        const target = trie.get(winner[0].split(' '))
        if (target) {
          const args = [undefined, undefined, ...search.slice(1)]
          target.parse(args, options)
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
      if (!repo) repo = await prompt('repo: ', (input) => input.trim() || '')
      await self.exec('bCreateRepo ' + repo)
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
      if (!repo) repo = await prompt('repo: ', (input) => input.trim() || '')
      await self.exec('bDeleteRepo ' + repo)
      // const { user, auth } = options
      // if (!repo || !user || !auth) return self.help()
      // console.log('deleted ' + user + 's github repo: ' + repo)
      // console.log('deleted local repo: ' + repo)
    })

  new BCommand('b git') //
    .summary('git commands')

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
      // execSync('bCommit' + (msg ? ' ' + msg : ''), { stdio: 'inherit' })
      await self.exec('git add ' + options.add)
      await self.exec('git commit -m "' + msg + '"')
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
        origin = await prompt('origin: ', (input) => input.trim() || '')
      }
      origin = origin ? ' -u origin ' + origin : ''

      await self.exec('git add ' + options.add)
      await self.exec('git commit -m "' + msg + '"')
      await self.exec('git push' + origin)
    })

  new BCommand('b git checkout') //
    .argument('[branch]', 'branch name')
    .action(async (branch, options, self) => {
      if (!branch) branch = await prompt('branch: ', (input) => input.trim() || '')
      await self.exec('bCheckout ' + branch)
    })

  new BCommand('b git branch') //
    .summary('git branch commands')

  new BCommand('b git branch list') //
    .summary('list local branches')
    .action(async (options, self) => {
      await self.exec('git branch')
    })

  new BCommand('b git branch delete')
    .argument('[branches...]', 'branches to delete')
    .action(async (branches: string[], options, self) => {
      if (!branches.length) {
        branches = (await prompt('branches: ', (input) => input.trim() || '')).split(' ')
      }
      for (const branch of branches) {
        await self.exec('git branch -D ' + branch)
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
