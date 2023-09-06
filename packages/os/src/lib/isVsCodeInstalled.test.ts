import { isVsCodeInstalled } from './isVsCodeInstalled'

describe(isVsCodeInstalled.name, () => {
  it('should return a boolean for whether VSCode is installed.', () => {
    expect(typeof isVsCodeInstalled()).toBe('boolean')
  })
})
