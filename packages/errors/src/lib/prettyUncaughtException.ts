import { prettyError } from './prettyError'

/**
 * Enable pretty print of any uncaught exceptions.
 * @param shouldIgnore - A callback function that is invoked with the error object as argument and can decide whether to throw the error by returning false, or true to ignore.
 */
export function prettyUncaughtException(shouldIgnore?: (error: unknown) => boolean) {
  if (!enabled) {
    enabled = true
    process.on('uncaughtException', (error: unknown) => {
      console.error(prettyError(error))
      if (!shouldIgnore || !shouldIgnore(error)) {
        throw error
      }
    })
  }
}

let enabled = false
