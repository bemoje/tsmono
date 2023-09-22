export type TSerializableConstructor<T> = {
  instances: Record<string, T>
  countInstances(): number
  getInstance(id: string): T | undefined
  deserializeInstances(...jsons: string[]): void
  revive(deserialized: Record<string, unknown> | string): T
  serializeInstances(indent?: number): string
  clearInstances(): void
  destroyInstances(): void
  hasInstance(id: string): boolean
  deleteInstance(id: string): void
} & (new (...args: unknown[]) => T)
