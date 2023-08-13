import fs from 'fs'
import path from 'path'
import { getPackages } from './util/getPackages'

export function readme(pkg: Record<string, any>, docs: string): string {
  const shortname = pkg.name.replace('@bemoje/', '')
  return `# ${pkg.name}
${pkg.description}

![GitHub Top Language](https://img.shields.io/github/languages/top/${'bemoje'}/${'https://github.com/bemoje/tsmono'})

##### Github
![GitHub Last Commit](https://img.shields.io/github/last-commit/${'bemoje'}/${'https://github.com/bemoje/tsmono'}?color=red)
![GitHub Stars](https://img.shields.io/github/stars/${'bemoje'}/${'https://github.com/bemoje/tsmono'})
![GitHub Forks](https://img.shields.io/github/forks/${'bemoje'}/${'https://github.com/bemoje/tsmono'})
![GitHub Watchers](https://img.shields.io/github/watchers/${'bemoje'}/${'https://github.com/bemoje/tsmono'})
![GitHub Repo Size](https://img.shields.io/github/repo-size/${'bemoje'}/${'https://github.com/bemoje/tsmono'})

##### NPM
<span><a href="https://npmjs.org/${pkg.name}" title="View this project on NPM"><img src="https://img.shields.io/npm/v/${
    pkg.name
  }" alt="NPM Version" /></a></span>
<span><a href="https://npmjs.org/${pkg.name}" title="NPM Downloads"><img src="https://img.shields.io/npm/dt/${
    pkg.name
  }" alt="NPM Downloads" /></a></span>


##### Donate
<span><a href="${`https://www.patreon.com/user?u=${'40752770'}`}" title="Donate using Patreon"><img src="https://img.shields.io/badge/patreon-donate-yellow.svg" alt="Patreon Donation" /></a></span>

## Installation
This library is published in the NPM registry and can be installed using any compatible package manager.

#### NPM
\`\`\`sh
npm install${pkg.preferGlobal ? ' -g ' : ' '}${pkg.name}
\`\`\`


## Issues
Please let me know of any bugs or [issues](${`https://github.com/${'bemoje'}/${'https://github.com/bemoje/tsmono'}/issues`}).

## Contribute
Contributors are welcome to open a [pull request](${`https://github.com/${'bemoje'}/${'https://github.com/bemoje/tsmono'}/pulls`}).

## License
Released under the [${pkg.license} License](./LICENSE).

## Documentation
- [HTML](https://github.com/bemoje/tsmono/blob/main/pkg/${shortname}/docs/html/index.html)
- [Markdown](https://github.com/bemoje/tsmono/blob/main/pkg/${shortname}/docs/md/index.md)

${docs}
`
}

getPackages().forEach(({ rootdir, pkg }) => {
  const mdpath = path.join(rootdir, 'docs', 'md', 'index.md')
  const docs = fs.readFileSync(mdpath, 'utf8').split('## Table of contents')[1].trim()
  const content = readme(pkg, docs)
  fs.writeFileSync(path.join(rootdir, 'README.md'), content)
})
