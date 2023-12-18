export interface IRepomanConfig {
  name: string
  type: 'application' | 'library'
  npm: {
    publish: boolean
    name: string
    usesNodeInternals: boolean
    bin: string
    license: string
    keywords: string[]
  }
}
