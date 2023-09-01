import { prettyError } from './prettyError'

/**
 * Pretty print uncaught exceptions.
 * @param noExitProcess - A function that is passed the error object and can return true if the process should not terminate.
 */
export function prettyUncaughtException(noExitProcess?: (error: unknown) => boolean) {
  if (!done) {
    done = true
    process.on('uncaughtException', (error: unknown) => {
      console.error(prettyError(error))
      if (!noExitProcess || !noExitProcess(error)) {
        process.exit(1)
      }
    })
  }
}

let done = false
