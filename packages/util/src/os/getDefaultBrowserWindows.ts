import { execSync } from 'child_process'
import { objToMap } from '../object/objToMap'

export function getDefaultBrowserWindows() {
  const result = execSync(
    'reg ' +
      [
        'QUERY',
        ' HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\Shell\\Associations\\UrlAssociations\\http\\UserChoice',
        '/v',
        'ProgId',
      ].join(' ')
  )
  const match = /ProgId\s*REG_SZ\s*(?<id>\S+)/.exec(result.toString())
  if (!match || !match.groups) {
    throw new Error(`Cannot find Windows browser in stdout: ${result.toString()}`)
  }
  const { id } = match.groups
  const browser = windowsBrowserProgIds.get(id)
  if (!browser) {
    throw new Error(`Unknown browser ID: ${id}`)
  }
  return browser
}
const windowsBrowserProgIds: Map<string, { name: string; run: string; id: string }> = objToMap({
  AppXq0fevzme2pys62n3e0fbqa7peapykr8v: { name: 'Edge', run: 'start msedge', id: 'com.microsoft.edge.old' },
  MSEdgeDHTML: { name: 'Edge', run: 'start msedge', id: 'com.microsoft.edge' },
  MSEdgeHTM: { name: 'Edge', run: 'start msedge', id: 'com.microsoft.edge' },
  'IE.HTTP': { name: 'Internet Explorer', run: 'start iexplore', id: 'com.microsoft.ie' },
  FirefoxURL: { name: 'Firefox', run: 'start firefox', id: 'org.mozilla.firefox' },
  ChromeHTML: { name: 'Chrome', run: 'start chrome', id: 'com.google.chrome' },
  BraveHTML: { name: 'Brave', run: 'start brave', id: 'com.brave.Browser' },
  BraveBHTML: { name: 'Brave Beta', run: 'start brave', id: 'com.brave.Browser.beta' },
  BraveSSHTM: { name: 'Brave Nightly', run: 'start brave', id: 'com.brave.Browser.nightly' },
})
