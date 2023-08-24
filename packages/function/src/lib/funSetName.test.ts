import { funSetName } from './funSetName'

describe('funSetName', () => {
  it('should set the name of a function', () => {
    expect(
      funSetName('myFunc', function () {
        //
      }).name,
    ).toBe('myFunc')
    expect(funSetName('myFunc', () => 1).name).toBe('myFunc')
  })
})
