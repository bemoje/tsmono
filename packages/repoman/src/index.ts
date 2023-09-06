import { lint } from './lib/lint'

const args = process.argv.slice(2)
const cmd = args.shift()

if (cmd === 'lint') lint(args)
else console.log('unknown command:', cmd)
