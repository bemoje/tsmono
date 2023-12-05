import { splitCombinedArgvShorts } from './splitCombinedArgvShorts'

export function getARGV(argv?: string[]) {
  if (argv) ARGV = splitCombinedArgvShorts(argv)
  return ARGV.slice()
}

let ARGV = splitCombinedArgvShorts(process.argv.slice(2))
