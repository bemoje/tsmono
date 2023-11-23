import { CommandBuilder } from './CommandBuilder'
import { IPresets } from './IPreset'
import { JsonValue, XtError } from '@bemoje/util'
import { MethodDisabler } from './MethodDisabler'
import { Option, OptionValues } from 'commander'
import { parseArgs } from '../util/parseArgs'

const stdoutMd = new MethodDisabler(process.stdout, 'write')
const stderrMd = new MethodDisabler(process.stderr, 'write')
const infoMd = new MethodDisabler(console, 'info')
const debugMd = new MethodDisabler(console, 'debug')
debugMd.disable()

/**
 *
 */
export function actionWrapper(cb: CommandBuilder) {
  return async () => {
    const { presetArgs, presetOpts } = await getPresetArgsAndOpts(cb)
    const args = await mergeArgsAndPresetArgs(cb, presetArgs)
    const opts = await mergeOptsAndPresetOpts(cb, presetOpts)
    await handleQuietSilentTrace(cb, args, opts)
    if (opts['dryRun'] && !cb.isPreset) return
    try {
      await cb.actionHandler.call(cb, args, opts, cb)
    } catch (error) {
      handleError(error, opts)
    }
  }
}

async function getPresetArgsAndOpts(
  cb: CommandBuilder
): Promise<{ presetArgs: string[][]; presetOpts: OptionValues[] }> {
  if (cb.isPreset) return { presetArgs: [], presetOpts: [{}] }
  const presets = (await cb.db.presets.getAll()) as IPresets
  const order = new Set<string>()
  for (const name of ['defaults', ...cb.selectedPresets]) {
    for (const n of presets[name].presets.concat(name)) {
      if (order.has(n)) order.delete(n)
      order.add(n)
    }
  }
  const arrOrder = [...order]
  const presetArgs: string[][] = arrOrder.map((name) => presets[name].args)
  const presetOpts: OptionValues[] = arrOrder.map((name) => presets[name].options)
  console.debug({ presetOrder: arrOrder, presetArgs, presetOpts })
  return { presetArgs, presetOpts }
}

async function mergeArgsAndPresetArgs(cb: CommandBuilder, presetArgs: string[][]) {
  if (cb.isPreset) return cb.$.args
  const args: string[] = []
  for (const preArgs of presetArgs.concat([cb.$.args])) {
    preArgs.forEach((preArg, i) => {
      if (preArg) args[i] = preArg
    })
  }
  return parseArgs(cb, args)
}

async function mergeOptsAndPresetOpts(cb: CommandBuilder, presetOpts: OptionValues[]) {
  const opts = Object.assign({}, ...presetOpts, cb.optsWithGlobalsParsed)
  await deleteOptionsWithDefaultOrNoValue(cb, opts)
  return opts
}

async function deleteOptionsWithDefaultOrNoValue(cb: CommandBuilder, opts: OptionValues) {
  const optObjs: Option[] = cb.getAllOptions()
  for (const [key, value] of Object.entries(opts)) {
    const optObj = optObjs.find((opt) => opt.attributeName() === key)
    if (!optObj) throw new Error('Unknown option: ' + key)
    if (value === false || value == null || value === optObj.defaultValue) {
      delete opts[key]
    }
  }
}

async function handleQuietSilentTrace(cb: CommandBuilder, args: JsonValue[], opts: OptionValues) {
  if (opts['silent']) {
    stdoutMd.disable()
    stderrMd.disable()
  } else if (opts['quiet']) {
    stderrMd.disable()
    infoMd.disable()
    debugMd.disable()
  } else if (opts['trace']) {
    debugMd.enable()
  }
  console.debug({ name: cb.name, presets: cb.selectedPresets, args, opts, argv: process.argv.slice(2) })
}

function handleError(error: unknown, opts: OptionValues) {
  if (opts['trace']) console.error(new XtError(error))
  else {
    const name = error instanceof Error ? error.name : 'Error'
    const msg = error instanceof Error ? error.message : String(error)
    console.error(name + ': ' + msg)
  }
}
