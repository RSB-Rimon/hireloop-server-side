import express from "express";
import cors from "cors";
import "dotenv/config";
import { MongoClient } from "mongodb";
const app = express();
const port = 5000;

// middleware

app.use(express.json());
app.use(cors());
//  mongodb connect

const client = new MongoClient(process.env.MONGODB_URI);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

const mongoClient = await connectToMongoDB();
const db = mongoClient.db("hireloopdb");
const users = db.collection("user");
const jobs = db.collection("jobs"); 

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  const cursor = users.find({});
  const result = await cursor.toArray();

  res.send(result);
});
// job reletd api ai khane hobe
app.post('/jobs', async  (req,res)=>{
  const job = req.body;
  const result = await jobs.insertOne(job);

})

// ai jai gai ses hobe point 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
