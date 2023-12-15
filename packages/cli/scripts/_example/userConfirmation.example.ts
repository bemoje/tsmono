import { CommandBuilder } from '../../src/cmd/CommandBuilder'

new CommandBuilder('example', (c) => {
  c.argument('[filepath]', (a) => {
    a.description('The file to delete')
    a.userMustConfirmIf({
      predicate: (value) => value.includes('backup'),
      message: 'Are you sure you want to delete a backup file?',
    })
  })
  c.action(async (fileToDelete) => console.log({ fileToDelete }))
}).parseAsync()
