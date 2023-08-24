export interface IQueue<Element, Options> {
  size: number
  filter: (options: Partial<Options>) => Element[]
  dequeue: () => Element | undefined
  enqueue: (run: Element, options?: Partial<Options>) => void
}
