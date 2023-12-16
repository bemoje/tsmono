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
