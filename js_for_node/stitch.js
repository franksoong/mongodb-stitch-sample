const stitch = require("mongodb-stitch")
const client = new stitch.StitchClient('app2-trxre');
const db = client.service('mongodb', 'mongodb-atlas').db('app2');
client.login().then(() =>
  db.collection('posts').updateOne({owner_id: client.authedId()}, {$set:{number:42}}, {upsert:true})
).then(() =>
  db.collection('posts').find({owner_id: client.authedId()})
).then(docs => {
  console.log("Found docs", docs)
  console.log("[MongoDB Stitch] Connected to Stitch")
}).catch(err => {
  console.error(err)
});