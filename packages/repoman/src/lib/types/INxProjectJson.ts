export interface INxProjectJson {
  projectType?: 'library' | 'application'
  root?: string
  sourceRoot?: string
  prefix?: string
  schematics?: Record<string, unknown>
  architect?: Record<
    string,
    {
      builder?: string
      options?: Record<string, unknown>
      configurations?: Record<
        string,
        {
          options?: Record<string, unknown>
          devServerTarget?: string
        }
      >
      defaultConfiguration?: string
    }
  >
  tags?: string[]
  implicitDependencies?: string[]
}
