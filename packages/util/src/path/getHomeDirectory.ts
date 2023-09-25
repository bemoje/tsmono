import path from 'path'

export function getHomeDirectory(): string {
  const home = process.env['HOME'] || process.env['USERPROFILE']
  if (!home) throw new Error('Home directory not found')
  return path.resolve(home)
}
