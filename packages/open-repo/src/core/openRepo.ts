import { action } from '../lib/action'
import { CLI } from '@bemoje/cli'

export const openRepo = CLI('openRepo', (c) => {
  c.description('Shortcut to opening a local repository in VS Code.')
  c.version('1.2.6')
  c.enableBuiltinOptions()
  c.argument('[search]', 'A full or partial directory name of the repository to find and open.')
  c.action(action)

  c.config('rootdir', {
    description: 'An absolute path to the directory that contains your repositories.',
    defaultValue: '',
  })

  c.config('IDE', {
    description:
      'The command to open your IDE. It is assumed that your IDE will open the directory passed to it as an argument.',
    defaultValue: 'code',
  })
})
