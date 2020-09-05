import MongoClient from "mongodb";

const { ATLAS_USER, ATLAS_PASSWORD, NODE_ENV } = process.env;
const DB_NAME = `cs3219-otot-a-${NODE_ENV?.toUpperCase()}`;
const URI =
  NODE_ENV === "prod"
    ? `mongodb+srv://${ATLAS_USER}:${ATLAS_PASSWORD}@aaroncql.aif7w.gcp.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    : "mongodb://localhost:27017/";

let mongoClient: MongoClient.MongoClient;

async function initDb(): Promise<void> {
  console.log(`MongoDB: connecting to ${DB_NAME} at ${URI}`);
  mongoClient = await MongoClient.connect(URI, {
    useUnifiedTopology: true,
  });
  console.log(`MongoDB: successfully connected`);
}

function getDb(): MongoClient.Db {
  if (mongoClient == null) {
    throw Error("MongoDB: not yet initialised");
  }
  return mongoClient.db(DB_NAME);
}

function closeDb(): Promise<void> {
  return mongoClient.close();
}

export { initDb, getDb, closeDb };
