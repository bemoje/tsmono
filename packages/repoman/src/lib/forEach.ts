import { execute, IExecuteCommandOptions } from '@bemoje/util'
import { getPackages } from './getPackages'

export function forEach(args: string[], options: IForEachOptions = {}) {
  console.log({ args, options })
  const command = args.join(' ')
  const packages = options.packages?.split(',').map((s) => s.trim())
  const ignore = options.ignore?.split(',').map((s) => s.trim())
  console.log()
  getPackages().forEach(({ name, rootdir }) => {
    if (packages && !packages.includes(name)) return
    if (ignore && ignore.includes(name)) return
    execute(command, { ...options, cwd: rootdir })
  })
}

export interface IForEachOptions extends Omit<IExecuteCommandOptions, 'cwd'> {
  packages?: string
  ignore?: string
}
