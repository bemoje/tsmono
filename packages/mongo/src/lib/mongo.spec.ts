import { mongo } from './mongo'

describe('mongo', () => {
  it('should work', () => {
    expect(mongo()).toEqual('mongo')
  })
})
