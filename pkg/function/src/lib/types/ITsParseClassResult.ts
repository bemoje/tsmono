export interface ITsParseClassResult {
  name: string
  properties: string[]
  methods: Array<{
    kind: string
    name: string
    params: string[]
  }>
}
