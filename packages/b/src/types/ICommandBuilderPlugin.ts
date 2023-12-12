export interface ICommandBuilderPlugin {
  name: string
  dependencies: ICommandBuilderPlugin[]
  conflicts: string[]
  install(): void
}
