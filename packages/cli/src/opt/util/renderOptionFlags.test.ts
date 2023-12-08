import { Option } from 'commander'
import { renderOptionFlags } from './renderOptionFlags'

describe(renderOptionFlags.name, () => {
  describe('should render correctly when provided', () => {
    it('short', () => {
      const flags = '-a'
      expect(renderOptionFlags(new Option(flags))).toBe(flags)
    })
    it('long', () => {
      const flags = '--alpha'
      expect(renderOptionFlags(new Option(flags))).toBe(flags)
    })
    it('short, long', () => {
      const flags = '-a, --alpha'
      expect(renderOptionFlags(new Option(flags))).toBe(flags)
    })
    it('short, arg', () => {
      const flags = '-a <arg>'
      expect(renderOptionFlags(new Option(flags))).toBe(flags)
    })
    it('long, arg', () => {
      const flags = '--alpha <arg>'
      expect(renderOptionFlags(new Option(flags))).toBe(flags)
    })
    it('short, long, arg', () => {
      const flags = '-a, --alpha <arg>'
      expect(renderOptionFlags(new Option(flags))).toBe(flags)
    })
  })
})
