export function splitCombinedArgvShorts(argv: string[]) {
  return argv
    .map((arg) => {
      if (arg.length < 3 || !arg.startsWith('-') || arg.startsWith('--') || arg.includes('=')) {
        return arg
      }
      return Array.from(arg.replace('-', '')).map((s) => '-' + s)
    })
    .flat()
}
