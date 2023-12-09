import { Option } from 'commander'
import { optionUtils } from './optionUtils'

describe(optionUtils.getArgumentName.name, () => {
  const flags = '--alpha '
  it('required arg', () => {
    const arg = '<arg>'
    expect(optionUtils.getArgumentName(new Option(flags + arg))).toBe(arg)
  })
  it('optional arg', () => {
    const arg = '[arg]'
    expect(optionUtils.getArgumentName(new Option(flags + arg))).toBe(arg)
  })
  it('required variadic arg', () => {
    const arg = '<arg...>'
    expect(optionUtils.getArgumentName(new Option(flags + arg))).toBe(arg)
  })
  it('optional variadic arg', () => {
    const arg = '[arg...]'
    expect(optionUtils.getArgumentName(new Option(flags + arg))).toBe(arg)
  })
  it('no arg', () => {
    expect(optionUtils.getArgumentName(new Option(flags.trim()))).toBe(undefined)
  })
})

describe(optionUtils.hasArgument.name, () => {
  it('no argument - with short', () => {
    const opt = new Option('-a, --alpha')
    expect(optionUtils.hasArgument(opt)).toBe(false)
  })
  it('no argument - without short', () => {
    const opt = new Option('--alpha')
    expect(optionUtils.hasArgument(opt)).toBe(false)
  })
  it('has optional argument - with short', () => {
    const opt = new Option('-a, --alpha [value]')
    expect(optionUtils.hasArgument(opt)).toBe(true)
  })
  it('has optional argument - without short', () => {
    const opt = new Option('--alpha [value]')
    expect(optionUtils.hasArgument(opt)).toBe(true)
  })
  it('has required argument - with short', () => {
    const opt = new Option('-a, --alpha <value>')
    expect(optionUtils.hasArgument(opt)).toBe(true)
  })
  it('has required argument - without short', () => {
    const opt = new Option('--alpha <value>')
    expect(optionUtils.hasArgument(opt)).toBe(true)
  })
})

describe(optionUtils.renderFlags.name, () => {
  describe('should render correctly when provided', () => {
    it('short', () => {
      const flags = '-a'
      expect(optionUtils.renderFlags(new Option(flags))).toBe(flags)
    })
    it('long', () => {
      const flags = '--alpha'
      expect(optionUtils.renderFlags(new Option(flags))).toBe(flags)
    })
    it('short, long', () => {
      const flags = '-a, --alpha'
      expect(optionUtils.renderFlags(new Option(flags))).toBe(flags)
    })
    it('short, arg', () => {
      const flags = '-a <arg>'
      expect(optionUtils.renderFlags(new Option(flags))).toBe(flags)
    })
    it('long, arg', () => {
      const flags = '--alpha <arg>'
      expect(optionUtils.renderFlags(new Option(flags))).toBe(flags)
    })
    it('short, long, arg', () => {
      const flags = '-a, --alpha <arg>'
      expect(optionUtils.renderFlags(new Option(flags))).toBe(flags)
    })
  })
})

describe(optionUtils.setLong.name, () => {
  describe('when long name not initially provided', () => {
    describe('short property', () => {
      it('should set the long property', () => {
        const opt = new Option('-a')
        optionUtils.setLong(opt, '--alpha')
        expect(opt.long).toBe('--alpha')
      })

      it('should set the long property with dash prefix even if not provided', () => {
        const opt = new Option('-a')
        optionUtils.setLong(opt, 'alpha')
        expect(opt.long).toBe('--alpha')
      })

      it('should set the long property with too many dashes', () => {
        const opt = new Option('-a')
        optionUtils.setLong(opt, '---alpha')
        expect(opt.long).toBe('--alpha')
      })
    })

    describe('flags property', () => {
      it('should set the flags property', () => {
        const opt = new Option('-a')
        optionUtils.setLong(opt, '--alpha')
        expect(opt.flags).toBe('-a, --alpha')
      })

      it('should set the flags property no flags provided', () => {
        const opt = new Option('')
        optionUtils.setLong(opt, '--alpha')
        expect(opt.flags).toBe('--alpha')
      })

      it('should set the flags property when there is an option argument', () => {
        const opt = new Option('-a <arg>')
        optionUtils.setLong(opt, '--alpha')
        expect(opt.flags).toBe('-a, --alpha <arg>')
      })

      it('should set the flags property when there is a variadic option argument', () => {
        const opt = new Option('-a <arg...>')
        optionUtils.setLong(opt, '--alpha')
        expect(opt.flags).toBe('-a, --alpha <arg...>')
      })
    })
  })

  describe('when long name initially provided', () => {
    describe('short property', () => {
      it('should set the long property', () => {
        const opt = new Option('-a, --beta')
        optionUtils.setLong(opt, '--alpha')
        expect(opt.long).toBe('--alpha')
      })
    })

    describe('flags property', () => {
      it('should set the flags property', () => {
        const opt = new Option('-a, --beta')
        optionUtils.setLong(opt, '--alpha')
        expect(opt.flags).toBe('-a, --alpha')
      })

      it('should set the flags property when there is an option argument', () => {
        const opt = new Option('-a, --beta <arg>')
        optionUtils.setLong(opt, '--alpha')
        expect(opt.flags).toBe('-a, --alpha <arg>')
      })
    })
  })
})

describe(optionUtils.setShort.name, () => {
  describe('when short name not initially provided', () => {
    describe('short property', () => {
      it('should set the short property', () => {
        const opt = new Option('--alpha')
        optionUtils.setShort(opt, '-a')
        expect(opt.short).toBe('-a')
      })

      it('should set the short property with dash prefix even if not provided', () => {
        const opt = new Option('--alpha')
        optionUtils.setShort(opt, 'a')
        expect(opt.short).toBe('-a')
      })

      it('should set the short property with too many dashes', () => {
        const opt = new Option('--alpha')
        optionUtils.setShort(opt, '--a')
        expect(opt.short).toBe('-a')
      })
    })

    describe('flags property', () => {
      it('should set the flags property', () => {
        const opt = new Option('--alpha')
        optionUtils.setShort(opt, '-a')
        expect(opt.flags).toBe('-a, --alpha')
      })

      it('should set the flags property no flags provided', () => {
        const opt = new Option('')
        optionUtils.setShort(opt, '-a')
        expect(opt.flags).toBe('-a')
      })

      it('should set the flags property when there is an option argument', () => {
        const opt = new Option('--alpha <arg>')
        optionUtils.setShort(opt, '-a')
        expect(opt.flags).toBe('-a, --alpha <arg>')
      })

      it('should set the flags property when there is a variadic option argument', () => {
        const opt = new Option('--alpha <arg...>')
        optionUtils.setShort(opt, '-a')
        expect(opt.flags).toBe('-a, --alpha <arg...>')
      })
    })
  })

  describe('when short name initially provided', () => {
    describe('short property', () => {
      it('should set the short property', () => {
        const opt = new Option('-b, --alpha')
        optionUtils.setShort(opt, '-a')
        expect(opt.short).toBe('-a')
      })
    })

    describe('flags property', () => {
      it('should set the flags property', () => {
        const opt = new Option('-b, --alpha')
        optionUtils.setShort(opt, '-a')
        expect(opt.flags).toBe('-a, --alpha')
      })

      it('should set the flags property when there is an option argument', () => {
        const opt = new Option('-b, --alpha <arg>')
        optionUtils.setShort(opt, '-a')
        expect(opt.flags).toBe('-a, --alpha <arg>')
      })
    })
  })
})
