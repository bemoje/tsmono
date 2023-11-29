import { CommandBuilder } from '../CommandBuilder/CommandBuilder'
import { prefixArray } from './prefixArray'

describe(prefixArray.name, () => {
  it('single command', () => {
    const cmd = new CommandBuilder('cmd')
    expect(prefixArray(cmd)).toEqual(['cmd'])
  })

  it('nested commands', () => {
    new CommandBuilder('test', (test) => {
      test.command('sub1', (sub1) => {
        sub1.command('sub2', (sub2) => {
          expect(prefixArray(sub2)).toEqual(['test', 'sub1', 'sub2'])
        })
      })
    })
  })
})
