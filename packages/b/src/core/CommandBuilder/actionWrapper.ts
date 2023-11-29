import { Any, arrLast } from '@bemoje/util'
import { assertValidArguments } from '../util/assertValidArguments'
import { assertValidOptions } from '../util/assertValidOptions'
import { CommandBuilder, getAllOptions } from './CommandBuilder'
import { getRootCommand } from '../util/getRootCommand'
import { hasVariadicArguments } from '../util/hasVariadicArguments'
import { IPresets } from '../../types/IPresets'
import { MethodDisabler } from './MethodDisabler'
import { Option, OptionValues } from 'commander'

const stdoutMd = new MethodDisabler(process.stdout, 'write')
const stderrMd = new MethodDisabler(process.stderr, 'write')
const infoMd = new MethodDisabler(console, 'info')
const debugMd = new MethodDisabler(console, 'debug')
debugMd.disable()

/**
 *
 */
export function actionWrapper(cb: CommandBuilder) {
  cb.$.action(async () => {
    try {
      if (!cb.actionHandler) return cb.$.help()
      if (cb.isPreset) return await cb.actionHandler([], {}, cb)
      const [args, opts] = getFinalArgsAndOpts(cb)
      if (opts['trace']) return
      await cb.actionHandler(...args, opts, cb)
    } catch (error) {
      handleError(error)
    }
  })
}

function getFinalArgsAndOpts(cb: CommandBuilder) {
  const [presetArgs, presetOpts, presetOrder] = getPresetArgsAndOpts(cb)
  const args = mergeArgsAndPresetArgs(cb, presetArgs)
  const opts = mergeOptsAndPresetOpts(cb, presetOpts)
  const command = [getRootCommand(cb).name, ...process.argv.slice(2)].join(' ')
  handleQuietSilentTrace(opts)
  console.debug({ command, presetOrder, presetArgs, presetOpts, args, opts })
  console.debug('---------------')
  return [args, opts]
}

function getPresetArgsAndOpts(
  cb: CommandBuilder
): [presetArgs: string[][], presetOpts: OptionValues[], presetOrder: string[]] {
  if (!cb.isPresetsEnabled) return [[], [], []]
  const presets = cb.db.presets.getAll() as IPresets
  const order = new Set<string>()
  for (const name of ['defaults', ...cb.selectedPresets]) {
    for (const n of presets[name].presets.concat(name)) {
      if (order.has(n)) order.delete(n)
      order.add(n)
    }
  }
  const presetOrder = [...order]
  const presetArgs: string[][] = presetOrder.map((name) => presets[name].args)
  const presetOpts: OptionValues[] = presetOrder.map((name) => presets[name].options)
  return [presetArgs, presetOpts, presetOrder]
}

function mergeArgsAndPresetArgs(cb: CommandBuilder, presetArgs: Any[][]) {
  const merged: Any[] = []
  for (const args of presetArgs.concat([cb.argsParsed])) {
    args.forEach((arg, i) => {
      if (arg != null) merged[i] = arg
    })
  }
  if (hasVariadicArguments(cb) && merged.length && !Array.isArray(arrLast(merged))) {
    const rest = merged.splice(cb.$.registeredArguments.length - 1)
    merged.push(rest.filter((arg) => arg != null))
  }
  assertValidArguments(cb, merged)
  while (merged.length < cb.$.registeredArguments.length) {
    merged.push(undefined)
  }
  return merged.map((arg) => (arg === null ? undefined : arg))
}

function mergeOptsAndPresetOpts(cb: CommandBuilder, presetOpts: OptionValues[]) {
  const opts = Object.assign({}, ...presetOpts, cb.optsWithGlobalsParsed)
  deleteOptionsWithDefaultOrNoValue(cb, opts)
  assertValidOptions(cb, opts)
  return opts
}

export function optionArrayToObject(array: Option[]) {
  const result: Record<string, Option> = {}
  for (const opt of array) {
    result[opt.attributeName()] = opt
  }
  return result
}

function deleteOptionsWithDefaultOrNoValue(cb: CommandBuilder, opts: OptionValues) {
  const optMap = optionArrayToObject(getAllOptions(cb))
  for (const [key, value] of Object.entries(opts)) {
    const opt = optMap[key]
    if (!opt) throw new Error('Unknown option: ' + key)
    if (value === false || value == null || value === opt.defaultValue) {
      delete opts[key]
    }
  }
}

function handleQuietSilentTrace(opts: OptionValues) {
  if (opts['silent']) {
    stdoutMd.disable()
    stderrMd.disable()
  } else if (opts['quiet']) {
    stderrMd.disable()
    infoMd.disable()
    debugMd.disable()
  } else if (opts['debug']) {
    debugMd.enable()
  }
}

function handleError(error: unknown) {
  if (/ (-D|--debug)/.test(process.argv.slice(2).join(' '))) {
    console.error(error)
  } else {
    const name = error instanceof Error ? error.name : 'Error'
    const msg = error instanceof Error ? error.message : String(error)
    console.error(name + ': ' + msg)
  }
}
