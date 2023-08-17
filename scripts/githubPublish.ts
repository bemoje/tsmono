// publish github
import { execBatch } from './util/execBatch'

execBatch(
  [
    'npm run prepub',
    'git add .',
    'git commit -m "publish"',
    'git push -u origin main',
    //
  ],
  () => process.exit(),
)
