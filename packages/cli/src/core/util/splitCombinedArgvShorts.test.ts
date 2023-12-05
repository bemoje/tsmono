import { splitCombinedArgvShorts } from './splitCombinedArgvShorts'

describe(splitCombinedArgvShorts.name, () => {
  it('should split only combined short name flags', () => {
    const argv = ['-abc', 'def', '-g', 'h', '-ab']
    const expected = ['-a', '-b', '-c', 'def', '-g', 'h', '-a', '-b']
    expect(splitCombinedArgvShorts(argv)).toEqual(expected)
  })
})
