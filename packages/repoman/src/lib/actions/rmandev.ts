import { execSync } from 'child_process'

export function rmandev(args: string[] = []) {
  execSync('ts-node packages/repoman/src/cli.ts ' + args.join(' '), { stdio: 'inherit' })
}
