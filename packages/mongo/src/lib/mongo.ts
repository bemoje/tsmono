import fs from 'fs'
import { connect, model, Schema } from 'mongoose'

const datapath = 'C:/Users/bemoj/Desktop/FBDATA/dest/output/human-readable/threads/Lauritz Andersen.json'
const data = JSON.parse(fs.readFileSync(datapath, 'utf8'))

// 1. Create an interface representing a document in MongoDB.
interface IFBMessage {
  time: string
  sender: string
  content: string
}

// 2. Create a Schema corresponding to the document interface.
const messageSchema = new Schema<IFBMessage>({
  time: { type: String, required: false },
  sender: { type: String, required: false },
  content: { type: String, required: false },
})

// 3. Create a Model.
const FBMessage = model<IFBMessage>('FBMessage', messageSchema)

run().catch((err) => console.log(err))

async function run() {
  // 4. Connect to MongoDB
  const client = await connect('mongodb://127.0.0.1:27017/FBMessages')

  // const session = await client.startSession()
  // try {
  //   session.startTransaction();
  //   const savingsColl = client.db("bank").collection("savings_accounts");
  //   await savingsColl.findOneAndUpdate(
  //     {account_id: "9876"},
  //     {$inc: {amount: -100 }},
  //     { session });
  //   const checkingColl = client.db("bank").collection("checking_accounts");
  //   await checkingColl.findOneAndUpdate(
  //     {account_id: "9876"},
  //     {$inc: {amount: 100 }},
  //     { session });
  //   // ... perform other operations
  //   await session.commitTransaction();
  //   console.log("Transaction committed.");
  // } catch (error) {
  //   console.log("An error occurred during the transaction:" + error);
  //   await session.abortTransaction();
  // } finally {
  //   await session.endSession();
  // }

  for (const msg of data) {
    const instance = new FBMessage(msg)
    await instance.save()
  }

  const result = await FBMessage.find({ time: '2022.04.20 19.14' })
  console.log(result)
  await client.disconnect()
}
