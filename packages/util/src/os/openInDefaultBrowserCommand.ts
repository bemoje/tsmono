import { getDefaultBrowserWindows } from './getDefaultBrowserWindows'
import { getOS } from './getOS'

export function openInDefaultBrowserCommand(url?: string): string {
  const OS = getOS()
  let run
  if (OS === 'windows') {
    run = getDefaultBrowserWindows().run
  } else if (OS === 'osx') {
    run = 'open safari'
  } else if (OS === 'linux') {
    run = 'xdg-open'
  } else {
    throw new Error(`Unknown OS: ${OS}`)
  }
  return url ? `${run} "${url}"` : run
}
