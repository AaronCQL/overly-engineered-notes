import MongoClient from "mongodb";

const uri = "mongodb://localhost:27017/";
const dbName = "testDB";
let db: MongoClient.Db;

async function initDb(): Promise<void> {
  const client: MongoClient.MongoClient = await MongoClient.connect(uri, {
    useUnifiedTopology: true,
  });
  db = client.db(dbName);
  console.log("MongoDB initialised");
}

function getDb(): MongoClient.Db {
  if (db == null) {
    throw Error("MongoDB is not yet initialised");
  }
  return db;
}

export { initDb, getDb };
