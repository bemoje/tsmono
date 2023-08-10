import { cwdpath } from '@bemoje/fs'
import { VTTSubtitles } from '@bemoje/subtitles'
import { OpenaiApiClientExtended } from './OpenaiApiClientExtended'

//
;(async () => {
  const openai = new OpenaiApiClientExtended({
    cache: { enable: true },
  })

  const subtitles = await openai.transcribe({
    request: {
      filepath: cwdpath('notes', 'test-openai-transcribe2.mp3'),
      language: 'en',
      format: 'vtt',
    },
    // cache: { overwrite: true },
  })

  const vtt = new VTTSubtitles(subtitles)
  vtt.subtitles = await Promise.all(
    vtt.subtitles.map(async (sub) => {
      sub.text = await openai.proofreadEnglish(sub.text)
      return sub
    }),
  )

  console.log('-----------------------')
  console.log(vtt)
  console.log('-----------------------')
  console.log(vtt.toString())
  console.log('-----------------------')
})().catch(console.error)
