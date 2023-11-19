import { CommandBuilder } from './CommandBuilder'

export function actionWrapper(this: CommandBuilder) {
  return async () => {
    const args = this.argsParsed
    const opts = this.optsWithGlobalsParsed
    if (opts['trace']) {
      this.$.args
      console.warn({ name: this.name, args, opts, argv: process.argv.slice(2) })
    } else {
      try {
        await this.actionHandler.call(this, args, opts, this)
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        console.error('ERROR: ' + msg)
      }
    }
  }
}
