import fs from 'fs'
import path from 'path'
import { getPackages } from './getPackages'

export function fixReadmes() {
  function readme(pkg: Record<string, any>): string {
    const shortname = pkg.name.replace('@bemoje/', '')
    return `# ${pkg.name}

${pkg.description || ''}

![npm (scoped)](https://img.shields.io/npm/v/%40bemoje/trie-map)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/%40bemoje/${shortname})
![npm](https://img.shields.io/npm/dt/%40bemoje/${shortname})
![NPM](https://img.shields.io/npm/l/%40bemoje%2F${shortname})

![GitHub last commit (by committer)](https://img.shields.io/github/last-commit/bemoje/tsmono)
![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/bemoje/tsmono)
![GitHub top language](https://img.shields.io/github/languages/top/bemoje/tsmono)


## Documentation
[Documentation Website](https://bemoje.github.io/tsmono/modules/${shortname}.html)

## Installation
This library is published in the NPM registry and can be installed using any compatible package manager.

#### NPM
\`\`\`sh
npm install${pkg.preferGlobal ? ' -g ' : ' '}${pkg.name}
\`\`\`


## Issues
Please let me know of any bugs or [issues](${`https://github.com/bemoje/tsmono/issues`}).

## Contribute
Contributors are welcome to open a [pull request](${`https://github.com/bemoje/tsmono/pulls`}).

## License
Released under the [${pkg.license} License](./LICENSE).
`
  }

  getPackages().forEach(({ rootdir, pkg, name }) => {
    const content = readme(pkg)
    fs.writeFileSync(path.join(rootdir, 'README.md'), content)
  })
}