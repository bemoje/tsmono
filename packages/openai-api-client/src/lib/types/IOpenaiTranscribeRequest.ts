export interface IOpenaiTranscribeRequest {
  filepath: string
  language: string
  format: 'srt' | 'vtt'
}
