import { OpenaiApiClient } from '../../packages/openai-api-client/src/lib/OpenaiApiClient'

const text = `
Since the Norman Conquest of 1066, English monarchs had held titles and lands within France, the possession of which made them vassals of the kings of France. Over the centuries, English holdings in France had varied in size, but by 1337 only Gascony in south-western France and Ponthieu in northern France were left.[1] Following a series of disagreements between Philip VI of France and Edward III of England, on 24 May Philip's Great Council in Paris agreed that the Duchy of Aquitaine, effectively Gascony, should be taken back into Philip's hands on the grounds that Edward was in breach of his obligations as a vassal. This marked the start of the Hundred Years' War, which was to last one hundred and sixteen years.[2]

Throughout the early part of the war English coastal areas were harassed by French raids. The port towns of Portsmouth, Southampton, Hastings and Plymouth were captured and razed, as were many smaller places. Numerous English merchant ships, and several warships, were captured.[3] In June 1340 Edward III smashed the French fleet at the Battle of Sluys. In 1346 the English landed in northern Normandy and undertook a devastating chevauchée through northern France. The English navy paralleled the march of the army, capturing or burning large numbers of French warships and merchant vessels as it went.[4] Thereafter the threat from the French navy was much reduced.[5] The English then soundly beat the French at the Battle of Crécy and captured the major French port city of Calais. The Truce of Calais was agreed in September 1347[6] but the war continued via raids and guerrilla warfare;[7] the ongoing fighting was "almost constant".[8]

When war did not restrict trade, over 1,000 ships a year departed Gascony for England. Among their cargo were over 100,000,000 litres of wine. The duty levied by the crown on wine from Bordeaux was more than all other customs duties combined and by far the largest source of state income. Bordeaux, the capital of Gascony, was larger than London, and possibly richer. However, by this time English Gascony had become so truncated by French encroachments that it relied on imports of food, largely from England. Any interruptions to regular shipping were liable to starve Gascony and financially cripple England; the French were well aware of this.[9]
`

const apiKey = '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'

const openai = new OpenaiApiClient({
  apiKey,
  cache: { enable: false },
})

const main = async () => {
  let c = 0
  setInterval(async () => {
    const result = await openai.gpt3_16k({
      prompt: text,
      instruction: 'Correct this to standard english.',
    })
    console.log(c++)
  }, 5000)
}
main()
