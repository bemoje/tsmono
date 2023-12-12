import { CLI } from './CLI'

describe(CLI.name, () => {
  it('should not initialize immediately', () => {
    let hasRun = false
    const init = CLI('test', () => {
      hasRun = true
    })
    expect(typeof init).toBe('function')
    expect(hasRun).toBe(false)
    init()
    expect(hasRun).toBe(true)
  })
})
