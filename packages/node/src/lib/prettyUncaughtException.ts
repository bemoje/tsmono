import { prettyError } from './prettyError'

export function prettyUncaughtException(noExitProcess?: (error: unknown) => boolean) {
  process.on('uncaughtException', (error: unknown) => {
    console.error(prettyError(error))
    if (!noExitProcess || !noExitProcess(error)) {
      process.exit(1)
    }
  })
}
