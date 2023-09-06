import { updateJsonFileSync } from '../../packages/util/src/fs/updateJsonFileSync'
import colors from '../../packages/util/src/node/colors'
import { getPackages } from './getPackages'

export function fixPackageJson() {
  console.log(colors.green('Fixing package jsons...'))

  getPackages().forEach(({ pkgpath }) => {
    updateJsonFileSync(pkgpath, (pkg) => {
      pkg.author = {
        name: 'Benjamin Møller Jensen',
        email: 'bemoje@bemoje.net',
        url: 'https://github.com/bemoje/',
      }
      pkg.license = 'MIT'
      pkg.keywords = []
      pkg.repository = {
        type: 'git',
        url: 'git+https://github.com/bemoje/tsmono.git',
      }
      pkg.funding = {
        type: 'patreon',
        url: 'https://www.patreon.com/user?u=40752770',
      }
      pkg.bugs = {
        url: 'https://github.com/bemoje/tsmono/issues',
      }
      pkg.homepage = 'https://github.com/bemoje/tsmono'
      return pkg
    })
  })
}
