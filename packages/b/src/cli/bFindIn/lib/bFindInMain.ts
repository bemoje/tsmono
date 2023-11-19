import { bFindInCommand } from './bFindInCommand'

export async function bFindInMain(args?: string[]) {
  const cli = bFindInCommand()
  await cli.parseAsync(args || process.argv.slice(2), { from: 'user' })
}
