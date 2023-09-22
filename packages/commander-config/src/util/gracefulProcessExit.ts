/**
 * Instead of throwing normally, this function will print a given error message and exit the process with a non-zero exit code.
 * @param error - An error message to print or an Error object from which to print the its message property.
 * @param exitCode - The exit code to exit the process with.
 */
export function gracefulProcessExit(error?: string | Error, exitCode = 1): never {
  if (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error(error)
    }
  }
  process.exit(exitCode)
}
