import { execute, IExecuteCommandOptions } from '@bemoje/util'
import { getPackages } from '../util/getPackages'

export function forEach(args: string[], options: IForEachOptions = {}) {
  console.log({ args, options })
  const command = args.join(' ')
  console.log()
  getPackages(options.packages).forEach(({ name, rootdir }) => {
    // if (packages && !packages.includes(name)) return
    if (options.ignore && options.ignore.includes(name)) return
    execute(command, { cwd: rootdir })
  })
}

export interface IForEachOptions extends Omit<IExecuteCommandOptions, 'cwd'> {
  packages?: string[]
  ignore?: string[]
}
