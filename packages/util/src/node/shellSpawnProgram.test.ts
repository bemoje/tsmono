import { shellSpawnProgram } from './shellSpawnProgram'

describe(shellSpawnProgram.name, () => {
  it('should recive one stdout output', async () => {
    const cmd = await shellSpawnProgram('ping', '-h', '--no-inherit')
    expect(cmd).toBe('ping -h')
  })

  it('should recive multiple stdout outputs', async () => {
    const cmd = await shellSpawnProgram('ping', 'localhost', '--no-inherit')
    expect(cmd).toBe('ping localhost')
  })
})
