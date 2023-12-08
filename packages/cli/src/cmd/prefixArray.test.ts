import { CLI } from './CLI'
import { CommandBuilder } from './CommandBuilder'

describe('prefixArray', () => {
  it('single command', () => {
    const cmd = new CommandBuilder('cmd')
    expect(cmd.getPrefixArray()).toEqual(['cmd'])
  })

  it('nested commands', () => {
    CLI('test', (test: CommandBuilder) => {
      test.command('sub1', (sub1) => {
        sub1.command('sub2', (sub2) => {
          expect(sub2.getPrefixArray()).toEqual(['test', 'sub1', 'sub2'])
        })
      })
    })
  })
})
