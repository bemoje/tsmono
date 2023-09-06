import path from 'path'

export function getHomeDirectory(): string {
  const home = path.resolve(process.env['HOME'] || process.env['USERPROFILE'] || '')
  if (!home) throw new Error('Home directory not found')
  return home
}
