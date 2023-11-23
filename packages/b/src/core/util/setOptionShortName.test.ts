import { Option } from 'commander'
import { setOptionShortName } from './setOptionShortName'

describe(setOptionShortName.name, () => {
  describe('when short name not initially provided', () => {
    describe('short property', () => {
      it('should set the short property', () => {
        const opt = new Option('--alpha')
        setOptionShortName(opt, '-a')
        expect(opt.short).toBe('-a')
      })

      it('should set the short property with dash prefix even if not provided', () => {
        const opt = new Option('--alpha')
        setOptionShortName(opt, 'a')
        expect(opt.short).toBe('-a')
      })

      it('should set the short property with too many dashes', () => {
        const opt = new Option('--alpha')
        setOptionShortName(opt, '--a')
        expect(opt.short).toBe('-a')
      })
    })

    describe('flags property', () => {
      it('should set the flags property', () => {
        const opt = new Option('--alpha')
        setOptionShortName(opt, '-a')
        expect(opt.flags).toBe('-a, --alpha')
      })

      it('should set the flags property no flags provided', () => {
        const opt = new Option('')
        setOptionShortName(opt, '-a')
        expect(opt.flags).toBe('-a')
      })

      it('should set the flags property when there is an option argument', () => {
        const opt = new Option('--alpha <arg>')
        setOptionShortName(opt, '-a')
        expect(opt.flags).toBe('-a, --alpha <arg>')
      })

      it('should set the flags property when there is a variadic option argument', () => {
        const opt = new Option('--alpha <arg...>')
        setOptionShortName(opt, '-a')
        expect(opt.flags).toBe('-a, --alpha <arg...>')
      })
    })
  })

  describe('when short name initially provided', () => {
    describe('short property', () => {
      it('should set the short property', () => {
        const opt = new Option('-b, --alpha')
        setOptionShortName(opt, '-a')
        expect(opt.short).toBe('-a')
      })
    })

    describe('flags property', () => {
      it('should set the flags property', () => {
        const opt = new Option('-b, --alpha')
        setOptionShortName(opt, '-a')
        expect(opt.flags).toBe('-a, --alpha')
      })

      it('should set the flags property when there is an option argument', () => {
        const opt = new Option('-b, --alpha <arg>')
        setOptionShortName(opt, '-a')
        expect(opt.flags).toBe('-a, --alpha <arg>')
      })
    })
  })
})
