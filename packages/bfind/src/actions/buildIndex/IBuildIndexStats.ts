export interface IBuildIndexStats {
  filesIndexed: number
  keywordsIndexed: number
  fileRefsIndexed: number
  fileTypes: Record<string, number>
}
