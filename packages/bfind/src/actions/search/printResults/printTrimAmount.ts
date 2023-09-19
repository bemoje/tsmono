import { colors } from '@bemoje/util'
import { config } from '../../../core/config'

export function printTrimAmount(filepaths: string[], printAllResults: boolean) {
  if (!printAllResults) {
    const trimAmount = filepaths.length - config.userconfig.get('max-results')
    console.log(colors.yellow(`${trimAmount.toString()} results not shown.`))
  }
}
