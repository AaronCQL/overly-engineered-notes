import MongoClient from "mongodb";

const { ATLAS_USER, ATLAS_PASSWORD } = process.env;
const DB_NAME = "cs3219-otot-b-DB";
const URI =
  process.env.NODE_ENV === "dev"
    ? "mongodb://localhost:27017/"
    : `mongodb+srv://${ATLAS_USER}:${ATLAS_PASSWORD}@aaroncql.aif7w.gcp.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

let db: MongoClient.Db;

async function initDb(): Promise<void> {
  const client: MongoClient.MongoClient = await MongoClient.connect(URI, {
    useUnifiedTopology: true,
  });
  db = client.db(DB_NAME);
  console.log("MongoDB initialised; using " + URI);
}

function getDb(): MongoClient.Db {
  if (db == null) {
    throw Error("MongoDB is not yet initialised");
  }
  return db;
}

export { initDb, getDb };
