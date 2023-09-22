import { colors } from '@bemoje/util'
import { gracefulProcessExit } from './gracefulProcessExit'

export function failValidation(settingName: string, reason: string, value?: unknown) {
  console.error(colors.red('Error: Invalid setting'))
  console.error('Name: ' + settingName)
  console.error('Reason: ' + reason)
  if (value) console.error('Value: ' + value)
  gracefulProcessExit()
}
