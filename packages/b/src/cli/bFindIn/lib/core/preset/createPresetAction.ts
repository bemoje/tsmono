import { Command, OptionValues } from 'commander'
import { IPreset } from './IPreset'
import { optionsToCommandString_old } from '../../../../../core/util/optionsToCommandString'
import { PRESETS } from '../../bFindInCommand'

export function createPresetAction<O extends OptionValues = OptionValues>(
  parent: Command,
  cmd: Command,
  preset: IPreset<O>
) {
  const logStatus = (() => {
    interface IMergePresetEvent {
      preset: string
      status: string
      options: OptionValues
      argv: string[]
      argvSorted: { cmdArgs: string[]; theArgs: string[]; optArgs: string[] }
      defArgs: string[]
      command: string[]
    }

    let lastEvent: IMergePresetEvent = {
      preset: '',
      status: '',
      options: {},
      argv: [],
      argvSorted: { cmdArgs: [], theArgs: [], optArgs: [] },
      defArgs: [],
      command: [],
    }

    return function logStatus(_EVENT: IMergePresetEvent, preset?: string, status?: string) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const compare = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b)
      if (preset) _EVENT.preset = preset
      if (status) _EVENT.status = status
      const EVENT = JSON.parse(JSON.stringify(_EVENT))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const OUT: any = {}
      OUT.preset = EVENT.preset.toUpperCase()
      OUT.status = EVENT.status
      if (!compare(lastEvent.options, EVENT.options)) OUT.options = EVENT.options
      if (!compare(lastEvent.argv, EVENT.argv)) OUT.argv = EVENT.argv
      if (!compare(lastEvent.argvSorted, EVENT.argvSorted)) {
        OUT.argvSorted = {}
        if (!compare(lastEvent.argvSorted.cmdArgs, EVENT.argvSorted.cmdArgs))
          OUT.argvSorted.cmdArgs = EVENT.argvSorted.cmdArgs
        if (!compare(lastEvent.argvSorted.theArgs, EVENT.argvSorted.theArgs))
          OUT.argvSorted.theArgs = EVENT.argvSorted.theArgs
        if (!compare(lastEvent.argvSorted.optArgs, EVENT.argvSorted.optArgs))
          OUT.argvSorted.optArgs = EVENT.argvSorted.optArgs
      }
      if (!compare(lastEvent.defArgs, EVENT.defArgs)) OUT.defArgs = EVENT.defArgs
      if (!compare(lastEvent.command, EVENT.command)) OUT.command = EVENT.command
      lastEvent = EVENT
      console.dir(OUT, { depth: null })
    }
  })()

  return async function action() {
    const options = Object.assign({}, cmd.opts())
    const argv: string[] = process.argv.slice(process.argv.indexOf(preset.name))
    const defArgs: string[] = PRESETS.defaults.args.slice()
    const optArgs: string[] = []
    const cmdArgs: string[] = []
    const theArgs: string[] = []
    const command: string[] = []
    const EVENT = {
      preset: preset.name,
      status: 'ARGV-START',
      options,
      argv,
      argvSorted: { cmdArgs, theArgs, optArgs },
      defArgs,
      command,
    }
    logStatus(EVENT)

    // categorize argv
    let arg = argv.shift() || ''
    while (arg && arg.trim()) {
      arg = arg.trim()
      if (arg.startsWith('-')) {
        optArgs.push(arg.trim())
      } else if (Object.hasOwn(PRESETS, arg)) {
        cmdArgs.push(arg)
      } else {
        theArgs.push(arg.trim())
      }
      arg = argv.shift() || ''
    }

    // assert args length ok
    if (theArgs.length > defArgs.length) {
      logStatus(EVENT, void 0, 'ERROR')
      throw new Error('too many args. Expected 2. Got: ' + theArgs.length)
    } else {
      logStatus(EVENT, void 0, 'MERGE-START')
    }

    // merge
    for (const cmd of cmdArgs) {
      const preset = Object.values(PRESETS).find((p) => p.name === cmd)
      if (!preset) break
      preset.args.forEach((presetArg, i) => {
        if (!theArgs[i]) {
          theArgs[i] = presetArg ?? defArgs[i]
        }
      })
      Object.assign(options, preset.options)
      logStatus(EVENT, cmd, 'PRESET-MERGED')
    }

    // command
    command.push(...theArgs, ...new Set([...optionsToCommandString_old(options), ...optArgs]))
    logStatus(EVENT, void 0, 'COMMAND-START')
    await parent.parseAsync(command, { from: 'user' })
  }
}
